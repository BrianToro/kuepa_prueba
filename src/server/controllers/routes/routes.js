const express = require("express");
const StudentsService = require("../../services/studentsService");
const TeachersService = require("../../services/teachersService");
const { check, validationResult } = require("express-validator");

function registrationAndLoginAPI(app) {
    //Iniciaslizaciones del router
    const router = express.Router();
    app.use("/api/", router);
    const teachersService = new TeachersService();
    const studentsService = new StudentsService();

    //Control de rutas 

}

module.exports = { registrationAndLoginAPI }