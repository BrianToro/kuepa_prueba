import React, { Fragment, useEffect, useState } from "react";
import io from 'socket.io-client';
import { connect } from "react-redux";
import Input from '../components/Input';
import Messages from '../components/Messages';

import '../assets/styles/components/Chat.scss';


const Chat = (props) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const END_POINT = `${props.url}`;
    let socket = io(END_POINT);;

    useEffect(() => {
        socket.emit('join', { user: props.user, room: 'chat', user_type: props.user_type }, () => {

        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [END_POINT, props.user, props.user_type]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        });
    });

    const sendMessage = (event) => {
        event.preventDefault()
        if(message){
            let time = new Date();
            const HoursAndSecond = `${time.getHours()} : ${time.getMinutes()}`;
            socket.emit('sendMessage', { message, user: props.user, timeM: HoursAndSecond }, () => setMessage(''))
        }
    }

    return (
        <div className="container-chat">
            <h1>Chat de la sala</h1>
            <Messages messages={messages} name={props.user}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.currentUser,
        user_type: state.typeOfUser,
        url: state.url
    };
};

export default connect(mapStateToProps, null)(Chat);
