import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import '../assets/styles/components/Message.scss';

const Message = ({ key, message, name }) => {
    let isSentByCurrentUser = false;
    if (message.user === name) {
        isSentByCurrentUser = true;
    }
    return (
        isSentByCurrentUser
            ? (
                <div className="message-container toRight">
                    <p className="message-container-name">{message.time + " "}{name}{" "}{ message.user_type === 'teacher' ? <span>Profesor</span> : null }</p>
                    <div className="message-container-message">
                        <p >{message.text}</p>
                    </div>
                </div>
            )
            : (
                <div className="message-container toLeft">
                    <p className="message-container-name">{message.time + " "}{message.user}{" "}{ message.user_type === 'teacher' ? <span>Profesor</span> : null }</p>
                    <div className="message-container-message">
                        <p >{message.text}</p>
                    </div>
                </div>
            )
    );
}

export default Message;