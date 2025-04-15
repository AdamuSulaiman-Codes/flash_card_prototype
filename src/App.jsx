import React from 'react'
import FileUpload from './FileUpload'
import Flashcard from './FlashCard'
const App = () => {
  return (
    <>
      <FileUpload />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', gap: '20px', flexWrap: 'wrap' }}>
        <Flashcard heading="What is React?" body="A JavaScript library for building user interfaces." />
        <Flashcard heading="What is JSX?" body="A syntax extension for JavaScript that looks similar to HTML." />
      </div>
    </>
  )
}

export default App