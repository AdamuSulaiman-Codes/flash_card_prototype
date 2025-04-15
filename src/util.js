export const extractPptxText = async (file) => {
  const pptx2json = await import("pptx2json");

  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const result = pptx2json.default(arrayBuffer);

      let allText = "";
      result.slides.forEach((slide) => {
        slide.texts.forEach((textObj) => {
          allText += textObj.text + "\n";
        });
        allText += "\n\n";
      });

      resolve(allText); // Return the extracted text
    };

    reader.readAsArrayBuffer(file);
  });
};

export const extractPdfText = async (file) => {
    const pdfjsLib = await import("pdfjs-dist/build/pdf");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = async function () {
        const typedarray = new Uint8Array(reader.result);

        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let extractedText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str).join(" ");
          extractedText += strings + "\n\n";
        }

        resolve(extractedText); // Return the extracted text
      };
      reader.readAsArrayBuffer(file);
    });
};

export const extractDocxText = async (file) => {
  const mammoth = await import("mammoth");

  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = async function (event) {
      const arrayBuffer = event.target.result;
      const result = await mammoth.extractRawText({ arrayBuffer });
      resolve(result.value);
    };

    reader.readAsArrayBuffer(file);
  });
};

export function cleanJsonString(input) {
  // Remove the leading "```json" and trailing "```"
  const cleanedString = input.replace(/```json|```/g, '').trim();

  // Check if the cleanedString is already an object
  if (cleanedString.startsWith("{") || cleanedString.startsWith("[")) {
    return cleanedString; // If it's already in valid JSON format, return it as is
  }
  
  // Otherwise, parse it into a JSON array
  return JSON.parse(cleanedString);
}