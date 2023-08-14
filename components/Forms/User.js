// components/UserForm.js
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function UserForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users', { email, password });
      setMessage('Usuário criado com sucesso!');
      // Limpar os campos após o envio bem-sucedido
      setEmail('');
      setPassword('');
    } catch (error) {
      setMessage('Ocorreu um erro ao criar o usuário.');
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite o email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Criar Usuário
        </Button>
      </Form>

      {message && <p>{message}</p>}

      <style jsx>{`
        p {
          margin-top: 10px;
          color: #dc3545;
        }
      `}</style>
    </div>
  );
}
