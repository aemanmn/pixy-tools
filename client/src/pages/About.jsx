import React from "react";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      <Helmet>
        <title>About Us | Pixy Tools - Free Online Tools</title>
        <meta
          name="description"
          content="Learn about Pixy Tools, the free online platform offering 8 practical digital tools including image compressor, currency converter, BMI calculator, and more."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          About Pixy Tools 🛠️
        </h1>

        <p className="text-gray-700 mb-4">
          Pixy Tools was created with one goal in mind: to simplify everyday digital tasks
          and provide users with free, fast, and secure online tools. Whether you're looking
          to compress images, calculate your BMI, convert currencies, or improve your social
          media content, Pixy Tools has you covered.
        </p>

        <p className="text-gray-700 mb-4">
          Our platform currently offers 8 essential tools designed for efficiency and ease-of-use:
        </p>

        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>🖼️ Image Compressor</li>
          <li>⚖️ BMI Calculator</li>
          <li>💱 Currency Converter</li>
          <li>📄 ATS Resume Checker</li>
          <li>📸 Instagram Caption Generator</li>
          <li>✍️ Blog Title Improver</li>
          <li>#️⃣ Hashtag Generator</li>
          <li>📄➡️📕 Word to PDF Converter</li>
        </ul>

        <p className="text-gray-700 mb-4">
          All tools are completely free to use, require no sign-up, and operate entirely
          in your browser for maximum security and privacy. At Pixy Tools, we value simplicity,
          speed, and user satisfaction.
        </p>

        <p className="text-gray-700 mb-4">
          Our mission is to empower everyone—from students and professionals to content creators—
          with easy-to-use online solutions that save time and boost productivity. We continuously
          improve our tools based on user feedback to ensure you get the best digital experience possible.
        </p>

        <p className="text-gray-700 text-center mt-6 font-semibold">
          Start exploring Pixy Tools today and make your digital tasks effortless!
        </p>
      </div>
    </div>
  );
};

export default About;
