import React from "react";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  const tools = [
    {
      title: "Image Compressor 🖼️",
      description:
        "Large images can slow down websites and take forever to share. Our Image Compressor lets you reduce image file size without losing quality. Simply upload your images, adjust quality and max width, and download them instantly.",
      features: [
        "Supports JPEG, PNG, WebP",
        "Single or bulk image compression",
        "Preview images before download",
      ],
    },
    {
      title: "BMI Calculator ⚖️",
      description:
        "Track your health with our BMI Calculator. Enter your height and weight, and get your Body Mass Index along with your health category—underweight, normal, overweight, or obese.",
      features: [
        "Metric and imperial units",
        "Quick and accurate BMI calculation",
        "Simple interface for everyone",
      ],
    },
    {
      title: "Currency Converter 💱",
      description:
        "Traveling or doing business internationally? The Currency Converter provides real-time exchange rates for over 150 currencies. Convert USD, EUR, GBP, PKR, and more instantly.",
      features: [
        "150+ currencies supported",
        "Real-time updates",
        "Easy swap between currencies",
      ],
    },
    {
      title: "ATS Resume Checker 📄",
      description:
        "Ensure your resume passes the Applicant Tracking System (ATS) used by most companies. Upload your resume and get a detailed analysis of keywords, structure, and formatting.",
      features: [
        "ATS compatibility check",
        "Keyword suggestions",
        "Tips to improve resume visibility",
      ],
    },
    {
      title: "Instagram Caption Generator 📸",
      description:
        "Struggling to write catchy captions? Our Instagram Caption Generator gives you multiple creative captions for any topic, complete with emojis and trends.",
      features: [
        "Generate captions for any keyword",
        "Ready-to-use for Instagram, TikTok, and social media",
        "Saves time while increasing engagement",
      ],
    },
    {
      title: "Blog Title Improver ✍️",
      description:
        "Make your blog posts irresistible with our Blog Title Improver. Enter your idea, and get multiple SEO-friendly, attention-grabbing title suggestions.",
      features: [
        "Generates creative and engaging titles",
        "SEO-focused",
        "Perfect for bloggers and content creators",
      ],
    },
    {
      title: "Hashtag Generator #️⃣",
      description:
        "Maximize your social media visibility with our Hashtag Generator. Enter a keyword, and receive 25+ trending, niche, and location-based hashtags instantly.",
      features: [
        "Trending, niche, and location hashtags",
        "Copy all hashtags in one click",
        "Helps grow post engagement",
      ],
    },
    {
      title: "Word to PDF Converter 📄➡️📕",
      description:
        "Convert your Word documents (.docx) to PDF in seconds. No software required—just upload, convert, and download.",
      features: [
        "Preserves text formatting",
        "Easy, online conversion",
        "Works on any device",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <Helmet>
        <title>Pixy Tools Blog | Free Online Tools</title>
        <meta
          name="description"
          content="Learn tips and insights on Pixy Tools' free online tools including image compressor, BMI calculator, currency converter, and more."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-8">
          🛠️ Welcome to Pixy Tools Blog
        </h1>

        <p className="text-center text-gray-600 mb-12">
          Discover tips, tutorials, and insights for using all 8 free online tools
          by Pixy Tools to simplify your digital life.
        </p>

        <div className="space-y-10">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {tool.title}
              </h2>
              <p className="text-gray-700 mb-3">{tool.description}</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {tool.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 text-lg">
            All 8 tools are free, fast, and secure—designed to make your digital
            tasks easier. Start using Pixy Tools today and simplify your digital life!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
