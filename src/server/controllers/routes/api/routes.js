const express = require("express");
const jwt = require('jsonwebtoken');
const { TeachersService, StudentsService }= require("../../../services/");
const { config } = require('../../../config')
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
                if (!resultOfRegister) {
                    res.status(406).json({
                        message: "user exist",
                        success: false
                    })
                } else {
                    const token = jwt.sign({ user_id: studentToRegister.user_id }, config.jwt_key, { expiresIn: 60 * 60 * 24 });
                    res.status(201).json({
                        message: "student created",
                        token: token,
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
                    const token = jwt.sign({ user_id: resultOfValidate.user_id }, config.jwt_key, { expiresIn: 60 * 60 * 24 });
                    res.status(200).json({
                        message: "student found",
                        success: true,
                        token,
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

    router.get('/student/verify', async (req, res, next) => {
        const token = req.headers['x-access-token'];
        try {
            const decodeToken = jwt.verify(token, config.jwt_key);
            res.status(202).json({
                success: true,
                user_id: decodeToken.user_id
            })
        } catch (err) {
            next(err);
        }

    });

}

module.exports = { registrationAndLoginAPI }