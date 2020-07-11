import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers/token';

import Chat from "../components/Chat";
import Header from '../components/Header';
import Video from '../components/Video'

//redux
import { connect } from "react-redux";
import { setUserToState, setTypeOfUserToState } from '../actions'

//Css
import "../assets/styles/App.scss";

const Main = (props) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const entry = await verifyLogin();
            if (entry.access) {
                props.setUserToState(entry.user_id);
                props.setTypeOfUserToState(entry.user_type);
                setLoading(false);
            } else {
                props.history.push('/login');
            }
        })();
    }, []);

    const verifyLogin = async () => {
        const token = getTokenFromLocalStorage();
        if (!token) {
            return {
                access: false
            }
        }
        try {
            const res = await axios.get('/api/verify', {
                headers: {
                    'x-access-token': token
                }
            });

            if (res.status === 202) {
                return {
                    access: true,
                    user_id: res.data.user_id,
                    user_type: res.data.user_type
                }
            } else {
                return {
                    access: false
                }
            }
        } catch (err) {

        }
    }

    return (
        <div>
            <Header history={props.history} />
            <main>
                <Video />
                <Chat user={props.user} />
            </main>
        </div>
    );
};

const mapDispatchToProps = {
    setUserToState,
    setTypeOfUserToState
}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
