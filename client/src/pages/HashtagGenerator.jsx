import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const HashtagGenerator = () => {
  const [topic, setTopic] = useState("");
  const [country, setCountry] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [copied, setCopied] = useState(false);

  const generateHashtags = () => {
    if (!topic.trim()) {
      setHashtags(["⚠️ Please enter a topic first!"]);
      return;
    }

    const base = topic.toLowerCase().replace(/\s+/g, "");
    const location = country ? country.toLowerCase().replace(/\s+/g, "") : "";

    const trendy = [
      `#${base}`,
      `#${base}love`,
      `#${base}life`,
      `#${base}vibes`,
      `#insta${base}`,
      `#${base}daily`,
      `#${base}community`,
      `#${base}inspo`,
      `#${base}world`,
      `#${base}addict`,
    ];

    const niche = [
      `#${base}blogger`,
      `#${base}influencer`,
      `#${base}tips`,
      `#${base}journey`,
      `#${base}gram`,
      `#${base}diaries`,
      `#${base}content`,
      `#${base}creator`,
      `#${base}goals`,
      `#${base}magic`,
    ];

    const explore = [
      `#trending${base}`,
      `#explore${base}`,
      `#viral${base}`,
      `#${base}reels`,
      `#${base}trend`,
      `#${base}moments`,
      `#${base}photography`,
      `#${base}shots`,
      `#${base}feed`,
      `#${base}art`,
    ];

    const local = location
      ? [
          `#${base}${location}`,
          `#${location}${base}`,
          `#${base}from${location}`,
          `#${base}in${location}`,
          `#${base}community${location}`,
        ]
      : [];

    const allTags = [...trendy, ...niche, ...explore, ...local];
    const shuffled = allTags.sort(() => Math.random() - 0.5);

    setHashtags(shuffled.slice(0, 25));
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (hashtags.length > 0) {
      navigator.clipboard.writeText(hashtags.join(" "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Helmet for SEO */}
      <Helmet>
        <title>Pixy Tools | Hashtag Generator</title>
        <meta
          name="description"
          content="Generate trending, niche, and viral hashtags for Instagram, TikTok, or any social media. Boost your reach with Pixy Tools Hashtag Generator."
        />
      </Helmet>

      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        #️⃣ Hashtag Generator
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Boost your reach with smart, viral & niche hashtags 🚀
      </p>

      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
        <label className="block text-gray-700 font-semibold mb-2">
          Topic / Keyword:
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Travel, Food, Fitness, Fashion"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <label className="block text-gray-700 font-semibold mb-2">
          Country (optional):
        </label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="e.g. Pakistan, USA, India"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          onClick={generateHashtags}
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition-all"
        >
          Generate Hashtags
        </button>

        {hashtags.length > 0 && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-700">
                ✨ Hashtags for you:
              </h2>
              <button
                onClick={copyToClipboard}
                className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-md hover:bg-purple-200"
              >
                {copied ? "✅ Copied!" : "📋 Copy All"}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {hashtags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HashtagGenerator;
