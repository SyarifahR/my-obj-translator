import React from 'react';

export default function FileUploader({ onFilesUploaded }) {
  const handleFileChange = (event) => {
    const files = event.target.files;
    const objFile = Array.from(files).find(file => file.name.endsWith('.obj'));
    const mtlFile = Array.from(files).find(file => file.name.endsWith('.mtl'));
    onFilesUploaded(objFile, mtlFile);
  };

  return (
    <input type="file" multiple onChange={handleFileChange} />
  );
}
