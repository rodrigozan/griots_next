import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter()


  const handleRegister = async (e) => {
    e.preventDefault();

    //setUsername(email.split('@')[0])

    try {
      const response = await axios.post('http://localhost:4000/api/users', {
        email,
        username: email.split('@')[0],
        password,
        role: 'writer'
      });

      if (response.status === 200) {
        console.log(response.data);
        setEmail('')
        setPassword('')
      } else {
        console.log('Something went wrong:', response);
      }
    } catch (error) {
      console.error('Error registering:', error);
    } finally {
      window.location.reload(false)
    }
  };


  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={6}>
          <h2>Register</h2>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={handleRegister}>
              Register
            </Button>
            <Button variant="link" onClick={() => Router.push('/login')}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
