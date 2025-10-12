import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const ATSChecker = () => {
  const [resumeText, setResumeText] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const extractTextFromFile = async (file) => {
    setLoading(true);
    const fileType = file.name.split(".").pop().toLowerCase();

    try {
      if (fileType === "pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = "";
        for (let i = 0; i < pdf.numPages; i++) {
          const page = await pdf.getPage(i + 1);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ");
        }
        setResumeText(text);
      } else if (fileType === "docx") {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setResumeText(result.value);
      } else if (fileType === "txt") {
        const text = await file.text();
        setResumeText(text);
      } else {
        alert("Please upload a PDF, DOCX, or TXT file.");
      }
    } catch (error) {
      console.error("Error reading file:", error);
      alert("Failed to read file content. Try another file or format.");
    } finally {
      setLoading(false);
    }
  };

  const analyzeResume = () => {
    if (!resumeText.trim()) return alert("Please paste or upload your resume text.");

    const words = resumeText.trim().split(/\s+/).length;
    const keywordCount = (resumeText.match(/experience|skills|projects|education|achievements|certifications|summary/gi) || []).length;

    let atsScore = Math.min(100, keywordCount * 15 + Math.min(words / 12, 50));
    setScore(atsScore);

    if (atsScore >= 80) setFeedback("✅ Great! Your resume is quite ATS friendly.");
    else if (atsScore >= 50) setFeedback("⚙️ Average. Add more relevant keywords and structure.");
    else setFeedback("⚠️ Weak. Add clear sections and include strong job-relevant terms.");

    const missingKeywords = [];
    const keywords = ["experience", "skills", "projects", "education", "summary", "certifications"];
    keywords.forEach((kw) => {
      if (!resumeText.toLowerCase().includes(kw)) missingKeywords.push(kw);
    });
    setSuggestions(missingKeywords);
  };

  const resetAll = () => {
    setResumeText("");
    setScore(null);
    setFeedback("");
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      <Helmet>
        <title>Resume ATS Checker | Pixy Tools</title>
        <meta
          name="description"
          content="Upload or paste your resume to check its ATS compatibility and get improvement suggestions with Pixy Tools."
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">📄 Resume ATS Checker</h1>
      <p className="text-gray-500 text-center mb-8 max-w-xl">
        Upload or paste your resume below to get an ATS score, feedback, and keyword suggestions.
      </p>

      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-md">
        {/* Upload File */}
        <div className="mb-4">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => e.target.files[0] && extractTextFromFile(e.target.files[0])}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                       file:rounded-md file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Resume Text */}
        <textarea
          className="w-full h-48 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Paste your resume text here or upload a file..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        ></textarea>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={analyzeResume}
            disabled={loading}
            className={`flex-1 ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} 
                        text-white py-2 rounded-lg font-semibold transition-colors`}
          >
            {loading ? "Reading File..." : "Analyze Resume"}
          </button>
          <button
            onClick={resetAll}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
          >
            Reset
          </button>
        </div>

        {score !== null && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-lg font-semibold">
              ATS Score: <span className="text-blue-600">{score}/100</span>
            </p>
            <p className="text-gray-700 mt-1">{feedback}</p>

            {suggestions.length > 0 && (
              <div className="mt-4 text-left">
                <p className="font-semibold text-gray-800">🔍 Suggested Additions:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {suggestions.map((s, i) => (
                    <li key={i}>{s.charAt(0).toUpperCase() + s.slice(1)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSChecker;
