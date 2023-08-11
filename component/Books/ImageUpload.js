import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';

const img = {
  width: '256px',
  height: '400px',
  backgroundColor: 'red'
}

const center = {
  textAilgn: 'center'
}

const ImageUpload = ({ onImageChange }) => {
  const [cover, setCover] = useState(null);
  const fileInputRef = useRef(null)

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('URL_DA_SUA_API/assets/image', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        // Você pode fazer algo com a resposta da API, se necessário
      } else {
        // Tratar erros de upload aqui
      }
    } catch (error) {
      // Lidar com erros de conexão ou outros erros
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      onImageChange(selectedFile);
      uploadImage(selectedFile)
    }
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    onImageChange(file);
  };

  return (
    <div style={center}>
      <input name={cover} type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
      <figure style={img}>
        {cover && <img style={img} src={URL.createObjectURL(cover)} alt="Selected" />}
        <Button onClick={handleUploadButtonClick} className="my-2 w-full">
          {cover ? 'Troque a imagem' : 'Clique aqui para fazer upload de uma imagem'}
        </Button>
      </figure>
    </div>
  );
};

export default ImageUpload;


