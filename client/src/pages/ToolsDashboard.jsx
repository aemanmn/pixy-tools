import React from "react";
import { Helmet } from "react-helmet-async";

import { useNavigate } from "react-router-dom";

const tools = [
  { name: "Word to PDF", path: "/word-to-pdf" },
  { name: "Image Compressor", path: "/image-compressor" },
  { name: "Hashtag Generator", path: "/hashtag-generator" },
  { name: "Blog Title Improver", path: "/blog-title-improver" },
  { name: "Currency Converter", path: "/currency-converter" },
  { name: "ATS Checker", path: "/ats-checker" },
  { name: "Instagram Caption", path: "/instagram-caption" },
];

const ToolsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        All-in-One Tools Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {tools.map((tool, index) => (
          <div
            key={index}
            onClick={() => navigate(tool.path)}
            className="bg-white hover:bg-blue-50 cursor-pointer shadow-md rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {tool.name}
            </h2>
            <p className="text-sm text-gray-500">
              Click to open {tool.name} tool
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsDashboard;
