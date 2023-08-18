import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Carousel from 'react-bootstrap/Carousel';

import axios from '@/utils/axios';

const ListBook = () => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState([]);

  const router = useRouter()

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/books/');
      console.log(response)  
      const booksWithAuthors = await Promise.all(
        response.data.map(async (book) => {
          console.log("Books:", book)
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
      return response.data.username;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

  const handleNew = async () => {
    router.push('/books/new_book')
  }

  return (
    <div>
      <Link className='btn btn-primary mb-5' href="/books/new_book">Add New Book</Link>
      {books.length > 0 ? (
        <div className='row'>
          {books.map((book) => (
            <div className="card d-inline-block align-top col-3" key={book._id}>
              <Link href={`/books/${book._id}`}>
                <img src={`http://localhost:4000${book.cover}`} className="card-img-top" alt="..." />
              </Link>
              <div className="card-body">
                <Link href={`/books/${book._id}`}>
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">{book.description}</p>
                </Link>
                {/* <div class="d-grid gap-2">
                  <button className="btn btn-primary">Ready</button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );

};

export default ListBook;
