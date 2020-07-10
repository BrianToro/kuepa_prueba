import React, { useState, useEffect, Fragment } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

//redux
import { connect } from "react-redux";
import { setUserToState } from '../actions'

//Css
import "../assets/styles/Register.scss";

const Register = (props) => {
    const [user_id, setUserId] = useState('');
    const [user_name, setUserName] = useState('');
    const [user_password, setUserPassword] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        axios.post('/api/student/register', {
            user_id,
            user_name,
            user_password
        }).then(response => {
            if (response.status === 201) {
                props.setUserToState(user_id);
                props.history.push('/');
            }
        }).catch(response => handlerUserExist());
    }

    const handlerUserExist = () => {
        alert('El usuario ya existe, elige otro');
    }

    return (
        <Fragment>
            <div>
                <div className="container-form-register">
                    <form>
                        <h1>Bienvenido al aula virtual</h1>
                        <h4>Registrate con el siguiente formulario</h4>
                        <label htmlFor="user_id">Usuario</label>
                        <input type="text" name="user_id" required placeholder="Tiene que ser unico" onChange={(event) => setUserId(event.target.value)} />
                        <label htmlFor="user_name">Nombre</label>
                        <input type="text" name="user_name" required onChange={(event) => setUserName(event.target.value)} />
                        <label htmlFor="user_id">Contraseña</label>
                        <input type="password" name="user_password" required placeholder="Minimo 8 caracteres" onChange={(event) => setUserPassword(event.target.value)} />
                        <button className="button" type="submit" onClick={handleRegister}>¡Registrarse!</button>
                        <div className="container-form-register-toLogin">
                            <span>¿Ya tienes cuenta?</span> <Link to="/login">Inicia sesion</Link>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = {
    setUserToState
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);