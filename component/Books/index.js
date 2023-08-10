import React, { useState } from 'react'

import ListBooks from './ListBooks';
import NewBook from './NewBook';
import UpdateBook from './UpdateBook';

const BooksComponent = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSingleBook, setShowSingleBook] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleAddBook = () => {
    setShowAddForm(true);
    setShowSingleBook(false);
    setShowUpdateForm(false);
    setSelectedBook(null);
  };

  const handleShowSingleBook = (book) => {
    setShowSingleBook(true);
    setShowAddForm(false);
    setShowUpdateForm(false);
    setSelectedBook(book);
  };

  const handleUpdateBook = (book) => {
    setShowUpdateForm(true);
    setShowSingleBook(false);
    setShowAddForm(false);
    setSelectedBook(book);
  };

  const handleBackToList = () => {
    setShowAddForm(false);
    setShowSingleBook(false);
    setShowUpdateForm(false);
    setSelectedBook(null);
  };

  return (
    <div>
      {!showAddForm && !showSingleBook && !showUpdateForm && (
        <ListBooks
          onAddBook={handleAddBook}
          onShowSingleBook={handleShowSingleBook}
          onUpdateBook={handleUpdateBook}
        />
      )}
      {showAddForm && (
        <NewBook onBack={handleBackToList} />
      )}
      {showSingleBook && (
        <p>Vai para a página do livro</p>
      )}
      {showUpdateForm && (
        <UpdateBook book={selectedBook} onBack={handleBackToList} />
      )}
    </div>
  );
};

export default BooksComponent;
