import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socket = io('/api/');

    useEffect(() => {
        socket.on('connnection', () => {
            console.log('connected to server');
        })

        socket.on('chat message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socket.emit('chat message', message);
        setMessage('');
    };

    return (
        <div className='row'>
            <h1>Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <Card key={index}>
                        <Card.Text>
                            {msg.content}
                        </Card.Text>
                    </Card>
                ))}
            </div>
            <Form>
                <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Digite sua mensagem...</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={sendMessage}>Enviar</Button> {/* Altere o texto do botão */}
        </div>
    );
}
