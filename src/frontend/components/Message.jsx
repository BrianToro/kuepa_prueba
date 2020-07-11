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
                <div className="message-container">
                    <p className="message-container-name">{name}</p>
                    <div className="message-container-message">
                        <p >{message.text}</p>
                    </div>
                </div>
            )
            : (
                <div className="message-container">
                    <p className="message-container-name">{message.user}</p>
                    <div className="message-container-message">
                        <p >{message.text}</p>
                    </div>
                </div>
            )
    );
}

export default Message;