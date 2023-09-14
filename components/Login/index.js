import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import Register from '../Register';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);

    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log({ username, password });

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                router.push('/books')
            } else {
                console.log('algo deu muito ruim', response)
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const goToRegister = async (e) => {
        setShowLogin(false)
        setShowRegister(true)
    }

    return (
        <>
        { showLogin && (
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col xs={6}>
                        <h2>Login</h2>
                        <Form>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" onClick={handleLogin}>
                                Login
                            </Button>
                            <Button variant="link" onClick={goToRegister}>
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )}
        { showRegister && (
            <Register />
        )}
        </>
    );
};

export default Login;
