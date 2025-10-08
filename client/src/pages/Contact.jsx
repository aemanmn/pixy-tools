import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success or error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("Please fill all the fields.");
      return;
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    // Reset form (you can integrate backend here)
    setName("");
    setEmail("");
    setMessage("");
    setStatus("Thank you! Your message has been sent.");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 flex justify-center">
      <Helmet>
        <title>Contact Us | Pixy Tools</title>
        <meta
          name="description"
          content="Get in touch with Pixy Tools team for feedback, support, or inquiries about our free online tools."
        />
      </Helmet>

      <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">📩 Contact Us</h1>
        <p className="text-gray-600 text-center mb-6">
          Have questions, suggestions, or feedback? We’d love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@example.com"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={5}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>

          {status && (
            <p
              className={`mt-2 text-center ${
                status.includes("Thank") ? "text-green-600" : "text-red-500"
              }`}
            >
              {status}
            </p>
          )}
        </form>

        <div className="mt-6 text-gray-600 text-center text-sm">
          <p>Or email us directly at: <a href="mailto:support@pixytools.com" className="text-blue-600 hover:underline">support@pixytools.com</a></p>
          <p>Follow us on social media for updates!</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
