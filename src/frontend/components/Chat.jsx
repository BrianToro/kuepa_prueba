import React, { Fragment, useEffect, useState } from "react";
import io from 'socket.io-client';
import { connect } from "react-redux";


const Chat = (props) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const END_POINT = 'http://localhost:4000/';
    let socket = io(END_POINT);;

    useEffect(() => {
        socket.emit('join', { user: props.user, room: 'chat' }, () => {

        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [END_POINT, props.user]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        });
    });

    const sendMessage = (event) => {
        event.preventDefault()
        if(message){
            socket.emit('sendMessage', { message, user: props.user }, () => setMessage(''))
        }
    }

    console.log(messages);

    return (
        <div>
            <h1>Chat de {props.user}</h1>
            <input
                type="text"
                value={ message }
                onChange={ event => setMessage(event.target.value) }
                onKeyPress={ event => event.key === 'Enter' ? sendMessage(event) : null }
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.currentUser
    };
};

export default connect(mapStateToProps, null)(Chat);
