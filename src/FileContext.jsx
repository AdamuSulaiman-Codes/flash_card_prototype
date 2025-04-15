import React, { createContext, useState } from 'react'
import { extractDocxText, extractPptxText, extractPdfText } from './util';
import { generateFlashcards } from './generateFlashCards';

export const FileContext = createContext({
    selectedFile: null,
    setSelectedFile: () => {},
    handleFileChange: () => {},
    extractedText: "",
    handleGenerateFlashCard: () => {},
})

const FileContextProvider = ({children}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [flashcards, setFlashcards] = useState([]);



    const handleGenerateFlashCard = async () => {
        console.log("Generating flashcards...");
        
        if (!extractedText) {
            alert("No text extracted. Please upload a file first.");
            return;
        }
        
        try {
            const flashcards = await generateFlashcards(extractedText);
            console.log("Generated Flashcards:", flashcards);
            setFlashcards(flashcards);
        } catch (error) {
            console.error("Error generating flashcards:", error);
            // Display user-friendly error message
            alert("Failed to generate flashcards. Please check the console for more details.");
        }
    }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const fileType = file.name.split(".").pop().toLowerCase();
        if (fileType === "pdf") {
            const text = extractPdfText(file).then((text) => {
                console.log(text);
                
                setExtractedText(text);
            });
            setExtractedText(text);
        } else if (fileType === "docx") {
            const text = extractDocxText(file).then((text) => { 
                console.log(text);
                
                setExtractedText(text);
            });
        
            setExtractedText(text);
        } else if (fileType === "pptx") {
            const text = extractPptxText(file).then((text) => {
                console.log(text);
                
                setExtractedText(text);
            })
        } else {
            alert("Only PDF, DOCX, or PPTX files are supported");
        }
 };


  const ctxValues = {
    selectedFile,
    setSelectedFile,
    handleFileChange,
    extractedText,
    handleGenerateFlashCard,
  }  
  return (
    <FileContext.Provider value={ctxValues}>{children}</FileContext.Provider>
  )
}

export default FileContextProvider