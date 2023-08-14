import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function PlotForm() {
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/plots', { description });
      setMessage('Plot criado com sucesso!');
      setDescription('');
    } catch (error) {
      setMessage('Ocorreu um erro ao criar o plot.');
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="description">
          <Form.Label>Descrição do Plot</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Digite a descrição do plot"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Criar Plot
        </Button>
      </Form>

      {message && <p>{message}</p>}
    </div>
  );
}
