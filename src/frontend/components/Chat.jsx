import React, { Fragment, useEffect, useState } from "react";
import io from 'socket.io-client';
import { connect } from "react-redux";
import Input from '../components/Input';
import Messages from '../components/Messages';

import '../assets/styles/components/Chat.scss';


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

    return (
        <div className="container-chat">
            <h1>Chat de {props.user}</h1>
            <Messages messages={messages} name={props.user}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.currentUser
    };
};

export default connect(mapStateToProps, null)(Chat);
