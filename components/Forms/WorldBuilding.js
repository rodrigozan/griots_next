import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function WorldBuildingForm() {
  const [details, setDetails] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/worldbuildings', { details });
      setMessage('Worldbuilding criado com sucesso!');
      setDetails('');
    } catch (error) {
      setMessage('Ocorreu um erro ao criar o worldbuilding.');
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="details">
          <Form.Label>Detalhes do Worldbuilding</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Digite os detalhes do worldbuilding"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Criar Worldbuilding
        </Button>
      </Form>

      {message && <p>{message}</p>}
    </div>
  );
}
