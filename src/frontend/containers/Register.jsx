import React, { useState, useEffect, Fragment } from "react";

//Componentes
import Main from "../components/Chat";


//redux
import { connect } from "react-redux";

//Css
import "../assets/styles/App.scss";

const Register = ({ }) => {
    return (
        <Fragment>
            <div>
                <Main />
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps, null)(Register);