import React from "react";
import { Helmet } from "react-helmet-async";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      <Helmet>
        <title>Terms of Use | Pixy Tools - Free Online Tools</title>
        <meta
          name="description"
          content="Read the Terms of Use for Pixy Tools, outlining the rules and guidelines for using our free online tools safely and responsibly."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Terms of Use 📄
        </h1>

        <p className="text-gray-700 mb-4">
          Welcome to Pixy Tools! By accessing or using our website and services, you agree to comply with the following Terms of Use. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-6">1. Acceptance of Terms</h2>
        <p className="text-gray-700 mb-4">
          By using Pixy Tools, you agree to these terms, our Privacy Policy, and any other guidelines posted on the website. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-6">2. Use of Tools</h2>
        <p className="text-gray-700 mb-4">
          All tools provided by Pixy Tools are free to use for personal or professional purposes. You agree to use them responsibly and not for illegal or harmful activities.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-6">3. Intellectual Property</h2>
        <p className="text-gray-700 mb-4">
          All content, designs, and tools on Pixy Tools are the property of Pixy Tools or its licensors. You may not copy, modify, distribute, or sell our content without explicit permission.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-6">4. No Warranty</h2>
        <p className="text-gray-700 mb-4">
          Pixy Tools is provided "as is" without warranties of any kind, either express or implied. We do not guarantee the accuracy, reliability, or suitability of our tools for any specific purpose.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-6">5. Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          Pixy Tools shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our tools. Use at your own risk.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-6">6. Privacy</h2>
        <p className="text-gray-700 mb-4">
          We respect your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your information.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-6">7. Modifications</h2>
        <p className="text-gray-700 mb-4">
          Pixy Tools reserves the right to update, modify, or remove any part of these Terms of Use at any time. Continued use of the website constitutes acceptance of the updated terms.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-6">8. Governing Law</h2>
        <p className="text-gray-700 mb-4">
          These Terms of Use are governed by and construed in accordance with the laws of the country where Pixy Tools operates.
        </p>

        <p className="text-gray-700 mt-6">
          By using Pixy Tools, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;
