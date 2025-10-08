import React from "react";
import { Helmet } from "react-helmet-async";

import { useNavigate } from "react-router-dom";

const tools = [
  {
    title: "BMI Calculator",
    desc: "Calculate your Body Mass Index with imperial and metric units",
    icon: "⚖️",
    link: "/bmi-calculator", // match App.jsx route
  },
  {
    title: "Currency Converter",
    desc: "Convert between major world currencies with real-time rates",
    icon: "💱",
    link: "/currency-converter",
  },
  {
    title: "Resume ATS Checker",
    desc: "Analyze your resume for ATS compatibility and get suggestions",
    icon: "📄",
    link: "/ats-checker",
  },
  {
    title: "AI Instagram Caption",
    desc: "Generate engaging Instagram captions with AI",
    icon: "📸",
    link: "/instagram-caption",
  },
  {
    title: "AI Blog Title Improver",
    desc: "Improve your blog titles with AI-powered suggestions",
    icon: "✍️",
    link: "/blog-title-improver",
  },
  {
    title: "Hashtag Generator",
    desc: "Generate relevant hashtags based on country and topic",
    icon: "#️⃣",
    link: "/hashtag-generator",
  },
  {
    title: "Word to PDF Converter",
    desc: "Easily convert Word documents to PDF format",
    icon: "📝",
    link: "/word-to-pdf",
  },
  {
    title: "Image Compressor",
    desc: "Reduce image size without losing quality",
    icon: "🖼️",
    link: "/image-compressor",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-6">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2 text-center">
        All-in-One Utility Hub
      </h1>
      <p className="text-gray-500 text-center mb-10">
        Free online tools to boost your productivity
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-purple-50 border border-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md 
                       hover:-translate-y-1 transition-all cursor-pointer"
            onClick={() => navigate(tool.link)}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{tool.icon}</div>
              <div>
                <h2 className="font-semibold text-gray-800 mb-1">{tool.title}</h2>
                <p className="text-gray-500 text-sm leading-snug">{tool.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
