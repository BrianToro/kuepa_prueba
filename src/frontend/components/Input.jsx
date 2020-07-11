import React from 'react';

import '../assets/styles/components/Input.scss';

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <div className="container-input">
            <form>
                <input
                    type="text"
                    placeholder="Envia un mensaje..."
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button onClick={event => sendMessage(event)}>Enviar</button>
            </form>
        </div>
    )
}

export default Input;