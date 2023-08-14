import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/books', { title, author });
      setMessage('Livro criado com sucesso!');
      setTitle('');
      setAuthor('');
    } catch (error) {
      setMessage('Ocorreu um erro ao criar o livro.');
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o título do livro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o autor do livro"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Criar Livro
        </Button>
      </Form>

      {message && <p>{message}</p>}
    </div>
  );
}
