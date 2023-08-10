import React, { useState } from 'react';
import axios from 'axios';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import ImageUpload from './ImageUpload'

import genres_json from '@/json/genres.json'

const NewBook = ({ handleBackToList }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [genreSelected, setGenreSelected] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ title, author, genre, description, coverImage })
    try {
      await axios.post('http://localhost:4000/api/books', { title, author, genre, description, coverImage });
    } catch (error) {
      console.log("Ih, rolou não, sô")
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='p-d-flex p-flex-row p-flex-wrap'>
        <div className='p-mr-2'>
          <ImageUpload onImageChange={setCoverImage} />
        </div>
        <div className='p-d-flex p-flex-column'>
          <InputText className='my-2 w-full' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <InputText className='my-2 w-full' placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <Dropdown
            className='my-2 w-full mt-7'
            value={genre}
            label="label"
            options={genres_json}
            onChange={handleChangeGenre}
            placeholder="Select a genre"
          />
          <InputTextarea className='my-2 w-full' placeholder="Insert the book description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />
        </div>
        <Button className="my-2 w-full" onSubmit={handleSubmit}>Add Book</Button>
        <Button className="my-2 w-full" severity="info" onClick={handleBackToList}>Back to List</Button>
      </div>
    </form>
  );
};

export default NewBook;
