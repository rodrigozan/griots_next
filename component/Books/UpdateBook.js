import React, { useState } from 'react';
import axios from 'axios';

const UpdateBook = ({ book, onBack }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [chapters, setChapters] = useState(book.chapters);
  const [comments, setComments] = useState(book.comments);

  const handleUpdateBook = async () => {
    try {
      const updatedBook = {
        title,
        author,
        chapters,
        comments
      };

      await axios.put(`/api/books/${book._id}`, updatedBook);
      alert('Book updated successfully!');
      onBack();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <h2>Update Book</h2>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Author:</label>
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <label>Chapters:</label>
      <textarea value={chapters} onChange={(e) => setChapters(e.target.value)} />
      <label>Comments:</label>
      <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
      <button onClick={handleUpdateBook}>Update Book</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default UpdateBook;
