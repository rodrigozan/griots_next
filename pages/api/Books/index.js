import axios from 'axios';

export default async (req, res) => {
  const apiUrl = 'http://localhost:4000/api'; // Replace with your API URL

  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${apiUrl}/books`);
      console.log(response)
      const books = response.data;
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Caraks, deu ruim!!! Error fetching books' });
    }
  } else if (req.method === 'POST') {
    try {
      const response = await axios.post(apiUrl, req.body);
      const newBook = response.data;
      res.status(201).json(newBook);
    } catch (error) {
      console.log('Deu ruim', error);
      res.status(500).json({ message: 'Caraks, deu ruim!!! creating book', error: error });
    }
  } else if (req.method === 'PUT') {
    const { id } = req.query;

    try {
      const response = await axios.put(`${apiUrl}/${id}`, req.body);
      const updatedBook = response.data;
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: 'Error updating book' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await axios.delete(`${apiUrl}/${id}`);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting book' });
    }
  }
};
