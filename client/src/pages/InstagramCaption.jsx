import React, { useState } from "react";
import { Helmet } from "react-helmet-async";


const InstagramCaption = () => {
  const [topic, setTopic] = useState("");
  const [captions, setCaptions] = useState([]);

  const generateCaptions = () => {
    if (!topic.trim()) {
      setCaptions(["⚠️ Please enter a topic or keyword first!"]);
      return;
    }

    const base = topic.toLowerCase();

    const captionIdeas = [
      `✨ ${topic} vibes only.`,
      `💫 Just another day living my best ${base} life.`,
      `🌸 ${topic} mood: ON.`,
      `🔥 Because every picture tells a ${base} story.`,
      `🌈 Turning my ${base} dreams into reality.`,
      `💖 ${topic} + good energy = perfection.`,
      `🌍 ${base} moments worth remembering.`,
      `📸 ${topic} isn't just a vibe, it's a lifestyle.`,
      `🌿 Keep it simple, keep it ${base}.`,
      `🌞 ${topic} glow hits different ✨`,
    ];

    setCaptions(captionIdeas);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-purple-100 px-6 py-12">
      <Helmet>
        <title>Pixy Tools | Instagram Caption Generator</title>
        <meta
          name="description"
          content="Generate creative Instagram captions for any topic or keyword. Boost your engagement with trendy and catchy caption ideas!"
        />
      </Helmet>
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        📸 Instagram Caption Generator
      </h1>

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <label className="block text-gray-700 mb-2 text-lg font-medium">
          Enter a topic or keyword:
        </label>

        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Travel, Food, Motivation"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          onClick={generateCaptions}
          className="w-full bg-pink-500 text-white mt-4 py-2 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
        >
          Generate Captions
        </button>

        {captions.length > 0 && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              ✨ Caption Ideas:
            </h2>
            <ul className="space-y-3">
              {captions.map((cap, i) => (
                <li
                  key={i}
                  className="bg-white shadow-sm p-3 rounded-md text-gray-800 border border-gray-100 hover:bg-pink-50 transition"
                >
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramCaption;
