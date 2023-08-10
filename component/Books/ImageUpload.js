import React, { useState } from 'react';

const ImageUpload = ({ onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    onImageChange(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" />}
    </div>
  );
};

export default ImageUpload;
