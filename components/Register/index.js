import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Register = () => {
  const handleRegister = () => {
    // Implemente a lógica de registro aqui
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={6}>
          <h2>Register</h2>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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
