import React, { useState, useEffect, Fragment } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
//redux
import { connect } from "react-redux";
import { setUserToState } from '../actions'
//Css
import "../assets/styles/Login.scss";

const Login = (props) => {
    const [user_id, setUserId] = useState('');
    const [user_password, setUserPassword] = useState('');
    const [typeUser, setTypeUser] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        axios.post(`/api/${typeUser}/login`, {
            user_id,
            user_password,
        }).then(response => {
            if (response.status === 200) {
                props.setUserToState(user_id);
                props.history.push('/');
            }
        }).catch(response => {
            handlerUserIncorrect();
        })
    }

    const handlerUserIncorrect = () => {
        alert('Usuario y contraseña incorrecta');
    }

    return (
        <Fragment>
            <div className="container-form-login">
                <form>
                    <h1>Bienvenido al aula virtual</h1>
                    <h4>Accede iniciando sesion</h4>
                    <label htmlFor="user_id">Usuario</label>
                    <input type="text" name="user_id" onChange={(event) => setUserId(event.target.value)} required />
                    <label htmlFor="user_id">Contraseña</label>
                    <input type="password" name="user_password" onChange={(event) => setUserPassword(event.target.value)} required />
                    <div className="radio-checks" onChange={ event => setTypeUser(event.target.value) }>
                        <label htmlFor="type">Soy Estudiante</label>
                        <input type="radio" name="type" value="student"/>
                        <label htmlFor="type">Soy Profesor</label>
                        <input type="radio" name="type" value="teacher"/>
                    </div>
                    <button className="button" type="submit" onClick={handleLogin}>¡Entrar!</button>
                    <div className="container-form-login-toRegister">
                        <span>¿Aun no tienes cuenta?</span> <Link to="/register">Registrate</Link>
                    </div>
                </form>

            </div>
        </Fragment>
    );
};

const mapDispatchToProps = {
    setUserToState
}


export default connect(null, mapDispatchToProps)(Login);