import React, { Fragment } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../components/Message';

import '../assets/styles/components/Messages.scss';

const Messages = ({ messages, name }) => {
    return (
        <ScrollToBottom>
            {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
        </ScrollToBottom>

    )
}

export default Messages;