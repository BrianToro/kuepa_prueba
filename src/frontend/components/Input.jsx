import React from 'react';

import '../assets/styles/components/Input.scss';

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <form>
            <input
                type="text"
                value={message}
                onChange={event => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button onClick={event => sendMessage(event)}>Enviar</button>
        </form>

    )
}

export default Input;