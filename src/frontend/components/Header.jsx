import React from "react";
import { connect } from "react-redux";
import { deleteToketFromLocalStorage } from '../helpers/token';
import '../assets/styles/components/Header.scss';

const Header = (props) => {
    const handleDisconnect = (event) => {
        event.preventDefault();
        deleteToketFromLocalStorage();
        props.history.push('/login');

    }
    return (
        <div>
            <nav className="navbar">
                <h1>Prueba tecnica</h1>
                <span onClick={handleDisconnect}>Desconectarse</span>
            </nav>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchtoProps = {};

export default connect(mapStateToProps, mapDispatchtoProps)(Header);
