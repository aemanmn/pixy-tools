import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import * as mammoth from "mammoth";

const WordToPDF = () => {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccess("");
  };

  const convertToPDF = async () => {
    if (!file) {
      setError("Please upload a Word (.docx) file first!");
      return;
    }

    setIsConverting(true);
    setError("");
    setSuccess("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value.trim();

      const doc = new jsPDF();
      const lines = doc.splitTextToSize(text || "No content found in the file", 180);
      doc.text(lines, 10, 10);

      const pdfBlob = doc.output("blob");
      saveAs(pdfBlob, file.name.replace(".docx", "") + ".pdf");

      setSuccess("File successfully converted to PDF!");
    } catch (err) {
      console.error(err);
      setError("Error while converting file. Please upload a valid .docx file.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Helmet for SEO */}
      <Helmet>
        <title>Pixy Tools | Word to PDF Converter</title>
        <meta
          name="description"
          content="Convert your Word (.docx) files to PDF instantly online. Fast, safe, and easy Word to PDF conversion tool."
        />
      </Helmet>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Word to PDF Converter
        </h1>

        <input
          type="file"
          accept=".docx"
          onChange={handleFileChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg cursor-pointer"
        />

        <button
          onClick={convertToPDF}
          disabled={isConverting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg w-full transition duration-200"
        >
          {isConverting ? "Converting..." : "Convert to PDF"}
        </button>

        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
        {success && <p className="text-green-600 mt-3 text-sm">{success}</p>}
      </div>
    </div>
  );
};

export default WordToPDF;
