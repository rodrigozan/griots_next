import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function CharacterForm() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/characters', { name, role });
      setMessage('Personagem criado com sucesso!');
      setName('');
      setRole('');
    } catch (error) {
      setMessage('Ocorreu um erro ao criar o personagem.');
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nome do Personagem</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do personagem"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="role">
          <Form.Label>Papel do Personagem</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o papel do personagem"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Criar Personagem
        </Button>
      </Form>

      {message && <p>{message}</p>}
    </div>
  );
}
