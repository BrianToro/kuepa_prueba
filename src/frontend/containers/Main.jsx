import React, { useState, useEffect, Fragment } from "react";

import Chat from "../components/Chat";


//redux
import { connect } from "react-redux";

//Css
import "../assets/styles/App.scss";

const Main = (props) => {
    return (
        <Fragment>
            <div>
                <Chat />
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps, null)(Main);
