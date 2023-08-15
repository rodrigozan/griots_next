import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Books = ({ onAddBook, onShowSingleBook, onDeleteBook, onUpdateBook }) => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/books');
      const booksWithAuthors = await Promise.all(
        response.data.map(async (book) => {
          console.log(book)
          const author = await fetchUser(book.author);
          return { ...book, author };
        })
      );
      setBooks(booksWithAuthors);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchUser = async (authorId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users/${authorId}`);
      console.log(response.data)
      return response.data.username;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:4000/api/books/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              {book.title} by {book.author}
              <button onClick={() => onShowSingleBook(book)}>View</button>
              <button onClick={() => onUpdateBook(book)}>Update</button>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available.</p>
      )}
      <button label='Add New Book' onClick={onAddBook}></button>
    </div>
  );

};

export default Books;
