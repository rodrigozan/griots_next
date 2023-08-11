import React, { useState } from 'react';
import axios from 'axios';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import ImageUpload from './ImageUpload'

import genres_json from '@/json/genres.json'

const UpdateBook = ({ book, onBack }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.cover);
  const [genreSelected, setGenreSelected] = useState('');
  const [description, setDescription] = useState(book.description);
  const [cover, setCover] = useState(book.cover);
  const [chapters, setChapters] = useState(book.chapters);
  const [comments, setComments] = useState(book.comments);

  const handleChangeGenre = (e) => {
    let selected = e.target.value
    setGenreSelected(selected)
    console.log(selected)

    if (selected.genre) {
      setGenre(selected.label);
    } else {
      setGenre('');
    }
  };

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
    <Card>
      <h2>Update Book</h2>
      <InputText
        className='mb-5 w-full'
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          border: 'none',
          borderBottom: '1px solid #ccc',
          fontSize: '1rem',
          padding: '0.5rem',
          margin: '0',
          outline: 'none',
        }}
      />
      <div className='grid grid-nogutter surface-0 ' style={{ marginBottom: '10px' }}>
        <div className='col-6'>
          {!cover && <ImageUpload onImageChange={setCover} />}
          {cover && <img style={img} src={cover} alt={title} />}
        </div>
        <div className='col-6'>
          <InputText className='my-2 w-full' placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <label>Chapters:</label>
          <textarea value={chapters} onChange={(e) => setChapters(e.target.value)} />
          <label>Comments:</label>
          <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
          <InputTextarea className='my-2 w-full' placeholder="Insert the book description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />
        </div>
      </div>
      <Button className="my-2 w-full" onSubmit={handleUpdateBook}>Update Book</Button>
      <Button className="my-2 w-full" severity="info" onClick={onBack}>Back to List</Button>
    </Card>
  );
};

export default UpdateBook;
