import React, { useState } from "react";
import { Helmet } from "react-helmet-async";


const ATSChecker = () => {
  const [resumeText, setResumeText] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");

  const checkResume = () => {
    if (!resumeText) return;

    // Basic scoring logic
    const words = resumeText.trim().split(/\s+/).length;
    const keywordCount = (resumeText.match(/experience|skills|projects|education/gi) || []).length;

    let atsScore = Math.min(100, keywordCount * 20 + Math.min(words / 10, 50));
    setScore(atsScore);

    if (atsScore >= 80) setFeedback("Great! Your resume is ATS friendly ✅");
    else if (atsScore >= 50) setFeedback("Average. Consider adding more keywords and formatting ✏️");
    else setFeedback("Weak. Add relevant keywords, skills, and proper formatting ⚠️");
  };

  const resetFields = () => {
    setResumeText("");
    setScore(null);
    setFeedback("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      {/* ✅ SEO Helmet Tag */}
      <Helmet>
        <title>Resume ATS Checker | Pixy Tools</title>
        <meta
          name="description"
          content="Check how ATS-friendly your resume is with Pixy Tools. Get an instant score and feedback to improve your resume visibility."
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">📄 Resume ATS Checker</h1>
      <p className="text-gray-500 text-center mb-8 max-w-xl">
        Paste your resume below to get a quick ATS compatibility score and feedback.
      </p>

      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-md">
        <textarea
          className="w-full h-48 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Paste your resume text here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        ></textarea>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={checkResume}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Check Resume
          </button>
          <button
            onClick={resetFields}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSChecker;
