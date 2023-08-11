import React, { useState } from 'react';
import axios from 'axios';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Card } from 'primereact/card';
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
  const [cover, setCover] = useState(null);

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
    
    try {
      if(title != "" && author != "" && genre != "" && description != ""){
      await axios.post('http://localhost:4000/api/books', { title, author, genre, description })
      .then(success => {
        console.log(success.data)
        const book = success.data

        console.log("id",book.data._id)
        const id = book.data._id

        if (cover) {
          const formData = new FormData();
          formData.append('image', cover);
  
          axios.post(`http://localhost:4000/api/books/${id}/upload-image`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        }

      })
    }else {
      console.log("Os campos precisam estar preenchidos")
    }

    } catch (error) {
      console.log("Ih, rolou não, sô")
      console.error(error);
    }
  };

  return (
    <Card>
    <form onSubmit={handleSubmit}>
      <div className='grid grid-nogutter surface-0 ' style={{ marginBottom  : '50px' }}>
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
        <div className='col-6'>
          <ImageUpload onImageChange={setCover} />
        </div>
        <div className='col-6'>
          <InputText className='my-2 w-full' placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <Dropdown
            className='my-2 w-full mt-7'
            value={genreSelected}
            label="label"
            options={genres_json}
            onChange={handleChangeGenre}
            placeholder="Select a genre"
          />
          <InputTextarea className='my-2 w-full' placeholder="Insert the book description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />
        </div>
      </div>
      <Button className="my-2 w-full" onSubmit={handleSubmit}>Add Book</Button>
      <Button className="my-2 w-full" severity="info" onClick={handleBackToList}>Back to List</Button>
    </form>
    </Card>
  );
};

export default NewBook;
