const express = require("express");
const StudentsService = require("../../../services/studentsService");
const TeachersService = require("../../../services/teachersService");
const { check, validationResult } = require("express-validator");

function registrationAndLoginAPI(app) {

    //Iniciaslizaciones del router

    const router = express.Router();
    app.use("/api", router);
    const teachersService = new TeachersService();
    const studentsService = new StudentsService();

    //Control de rutas

    router.post('/student/register',
        [
            check('user_name').isString().notEmpty(),
            check('user_id').isString().notEmpty(),
            check('user_password').isString().isLength({ min: 8 }).notEmpty(),
        ],
        async (req, res, next) => {
            const studentToRegister = req.body;
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ message: "validation not pass", success: "not ok", errors: errors.array() })
                }
                const resultOfRegister = await studentsService.register({ studentToRegister })
                console.log(resultOfRegister);
                if (!resultOfRegister) {
                    res.status(406).json({
                        message: "user exist",
                        success: false
                    })
                } else {
                    res.status(201).json({
                        message: "student created",
                        id: resultOfRegister,
                        success: true
                    })
                }
            } catch (err) {
                next(err)
            }

        });

    router.post('/student/login', [
        check('user_id').isString().notEmpty(),
        check('user_password').isString().notEmpty()
    ],
        async (req, res, next) => {
            const studentToValidate = req.body;
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) return res.status(422).json({ message: "validation not pass", success: "not ok", errors: errors.array() });

                const resultOfValidate = await studentsService.login({ studentToValidate });
                if (resultOfValidate) {
                    res.status(200).json({
                        message: "student found",
                        success: true
                    })
                } else {
                    res.status(404).json({
                        message: "student not found",
                        success: false
                    })
                }
            } catch (err) {
                next(err);
            }

        });

}

module.exports = { registrationAndLoginAPI }