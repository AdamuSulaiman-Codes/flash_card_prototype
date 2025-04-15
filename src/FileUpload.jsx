import React, { useContext, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { FileContext } from './FileContext';

const FileUpload = () => {
  const {selectedFile, setSelectedFile, handleFileChange, handleGenerateFlashCard} = useContext(FileContext);



  return (
    <section className="upload-container">
      <h2 className="upload-title">
        <AiOutlineFileAdd className="upload-icon" />
        Upload your files
      </h2>
      <form className="upload-form">
        <label htmlFor="file" className="file-label">
          Click to select a file
          <input
            type="file"
            name="file"
            id="file"
            accept=".pdf,.docx,.pptx"
            className="file-input"
            onChange={handleFileChange}
          />
        </label>

        {selectedFile && (
          <p className="file-name">Uploaded: {selectedFile.name}</p>
        )}

        <button type="submit" className="upload-button" onClick={(event)=>{
            event.preventDefault(); // Prevent the default form submission behavior
            handleGenerateFlashCard();
            setSelectedFile(null); // Clear the selected file after generating flashcards
            document.getElementById("file").value = ""; // Reset the file input field
        }}>
          <FaUpload className="button-icon" />
          Generate FlashCard
        </button>
      </form>
    </section>
  );
};

export default FileUpload;
