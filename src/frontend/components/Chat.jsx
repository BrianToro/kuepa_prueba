import React, { Fragment } from "react";
import { connect } from "react-redux";


const Chat = (props) => {
    return (
        <div>
            <h1>Inicio del proyecto { props.user }</h1>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.currentUser
    };
};

export default connect(mapStateToProps, null)(Chat);
