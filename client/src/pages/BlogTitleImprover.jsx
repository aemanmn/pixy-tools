import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const BlogTitleImprover = () => {
  const [title, setTitle] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const improveTitle = () => {
    if (!title.trim()) {
      setSuggestions(["⚠️ Please enter a blog title first!"]);
      return;
    }

    const words = title.split(" ");
    const capitalized = words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const improvedTitles = [
      `💡 ${capitalized}: What You Need to Know`,
      `🔥 ${capitalized} — Complete Guide for 2025`,
      `✨ Top Secrets About ${capitalized} You Shouldn’t Miss`,
      `📘 How to Master ${capitalized} Like a Pro`,
      `🚀 The Ultimate ${capitalized} Blueprint`,
    ];

    setSuggestions(improvedTitles);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      {/* ✅ Helmet for SEO */}
      <Helmet>
        <title>Blog Title Improver | Pixy Tools</title>
        <meta
          name="description"
          content="Improve your blog titles instantly with AI-powered suggestions. Make your titles catchy and SEO-friendly using Pixy Tools."
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
        📝 Blog Title Improver
      </h1>

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <label className="block text-gray-700 mb-2 text-lg font-medium">
          Enter Your Blog Title:
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. How to stay productive while working from home"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={improveTitle}
          className="w-full bg-blue-500 text-white mt-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Improve Title
        </button>

        {suggestions.length > 0 && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              ✨ Improved Titles:
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              {suggestions.map((s, i) => (
                <li key={i} className="text-gray-800">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitleImprover;
