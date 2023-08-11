import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';

const List = ({ onAddBook, onShowSingleBook, onDeleteBook, onUpdateBook }) => {
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

  const itemTemplate = (book) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={book.cover} alt={book.title} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">              
              <div>
                <div className="text-2xl font-bold text-900">{book.title}</div> 
                <div className="text-2xl text-lg">Auhtor: {book.author}</div>
              </div>
              <div className="flex align-items-center gap-3">
                <Card title='Descrição'>{book.description}</Card>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <Button onClick={() => onUpdateBook(book)} severity="warning" className='w-full'>Update Details</Button>
              <Button onClick={() => handleDelete(book._id)} severity="danger" className='w-full'>Delete</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {books.length > 0 ? (
        <div className="card">
          <DataView value={books} itemTemplate={itemTemplate} />
        </div>
        // <ul>
        //   {books.map((book) => (
        //     <li key={book._id}>
        //       {book.title} by {book.author}
        //       <button onClick={() => onShowSingleBook(book)}>View</button>
        //       <button onClick={() => onUpdateBook(book)}>Update</button>
        //       <button onClick={() => handleDelete(book._id)}>Delete</button>
        //     </li>
        //   ))}
        // </ul>
      ) : (
        <p>No books available.</p>
      )}
      <Button label='Add New Book' onClick={onAddBook} className='w-full' />
    </div>
  );

};

export default List;
