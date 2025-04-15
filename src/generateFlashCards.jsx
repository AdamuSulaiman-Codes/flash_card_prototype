import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanJsonString } from "./util";

// Initialize the generative AI with your API key
const genAI = new GoogleGenerativeAI("AIzaSyCp5RuYt-2mdjJYBveLHh0Nr3yYUa98bDU");

export async function generateFlashcards(text) {
  console.log("Generating flashcards from text:", text); // Log the text passed to the function

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Note: I only want the plain JSON and nothing else and remove this \`\`\`json content\`\` and provide me usable JSON, just the JSON only, please. Create flashcards from the following content. Each flashcard should have a question and an answer, with attributes 'question', 'answer', and 'id'. Here's the content:\n\n${text}`;

  console.log("Prompt:", prompt); // Log the prompt sent to the model

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const flashcardsText = await response.text(); // Ensure you're awaiting the response text properly

    // Clean the JSON string if necessary
    const newJson = cleanJsonString(flashcardsText);
    console.log("Flashcards Text:", flashcardsText); // Log the raw response

    // Check if newJson is a string (if not, it must be an already parsed JSON object)
    if (typeof newJson === "string") {
      if (newJson.trim().startsWith("{") || newJson.trim().startsWith("[")) {
        const flashcards = JSON.parse(newJson); // Parse the response
        console.log("Parsed Flashcards:", flashcards); // Log parsed flashcards

        const flashcardsWithId = flashcards.map((flashcard, index) => ({
          ...flashcard,
          id: index + 1,
        }));

        console.log("Flashcards with IDs:", flashcardsWithId); // Log flashcards with IDs
        return JSON.stringify(flashcardsWithId, null, 2); // Pretty print JSON with 2-space indentation
      } else {
        console.error("Response is not valid JSON:", newJson); // Log error if not JSON
      }
    } else {
      // If newJson is already an object, process it directly
      const flashcardsWithId = newJson.map((flashcard, index) => ({
        ...flashcard,
        id: index + 1,
      }));

      console.log("Flashcards with IDs:", flashcardsWithId); // Log flashcards with IDs
      return JSON.stringify(flashcardsWithId, null, 2); // Pretty print JSON with 2-space indentation
    }
  } catch (error) {
    console.error("Error generating flashcards:", error); // Log any errors that occur
    throw error; // Rethrow the error so the caller knows something went wrong
  }
}