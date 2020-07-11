const express = require("express");
const jwt = require('jsonwebtoken');
const { TeachersService, StudentsService } = require("../../../services/");
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
            check('user_type').isString().notEmpty(),
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
                    const token = jwt.sign({ user_id: studentToRegister.user_id, user_type: studentToRegister.user_type }, config.jwt_key, { expiresIn: 60 * 60 * 24 });
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
        check('user_password').isString().notEmpty(),
        check('user_type').isString().notEmpty()
    ],
        async (req, res, next) => {
            const studentToValidate = req.body;
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) return res.status(422).json({ message: "validation not pass", success: "not ok", errors: errors.array() });

                const resultOfValidate = await studentsService.login({ studentToValidate });
                if (resultOfValidate) {
                    const token = jwt.sign({ user_id: resultOfValidate.user_id, user_type: studentToValidate.user_type }, config.jwt_key, { expiresIn: 60 * 60 * 24 });
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

    router.post('/teacher/register',
        [
            check('user_name').isString().notEmpty(),
            check('user_id').isString().notEmpty(),
            check('user_type').isString().notEmpty(),
            check('user_password').isString().isLength({ min: 8 }).notEmpty(),
        ],
        async (req, res, next) => {
            const teacherToRegister = req.body;
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ message: "validation not pass", success: "not ok", errors: errors.array() })
                }
                const resultOfRegister = await teachersService.register({ teacherToRegister })
                if (!resultOfRegister) {
                    res.status(406).json({
                        message: "user exist",
                        success: false
                    })
                } else {
                    const token = jwt.sign({ user_id: teacherToRegister.user_id, user_type: teacherToRegister.user_type }, config.jwt_key, { expiresIn: 60 * 60 * 24 });
                    res.status(201).json({
                        message: "teacher created",
                        token: token,
                        success: true
                    })
                }
            } catch (err) {
                next(err)
            }

        });


    router.post('/teacher/login', [
        check('user_id').isString().notEmpty(),
        check('user_password').isString().notEmpty(),
        check('user_type').isString().notEmpty()
    ], async (req, res, next) => {
        const teacherToValidate = req.body;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({ message: "validation not pass", success: "not ok", errors: errors.array() });

            const resultOfValidate = await teachersService.login({ teacherToValidate });
            if (resultOfValidate) {
                const token = jwt.sign({ user_id: resultOfValidate.user_id, user_type: teacherToValidate.user_type }, config.jwt_key, { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    message: "teacher found",
                    success: true,
                    token,
                })
            } else {
                res.status(404).json({
                    message: "teacher not found",
                    success: false
                })
            }
        } catch (err) {
            next(err);
        }
    });

    router.get('/verify', async (req, res, next) => {
        const token = req.headers['x-access-token'];
        try {
            const decodeToken = jwt.verify(token, config.jwt_key);
            res.status(202).json({
                success: true,
                user_id: decodeToken.user_id,
                user_type: decodeToken.user_type
            })
        } catch (err) {
            next(err);
        }
    });
}

module.exports = { registrationAndLoginAPI }