import React from "react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <Helmet>
        <title>Privacy Policy | Pixy Tools</title>
        <meta
          name="description"
          content="Read the Privacy Policy of Pixy Tools. Learn how we collect, use, and protect your data when you use our free online tools."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="mb-4 text-gray-700">
          Your privacy is important to us. This Privacy Policy explains how Pixy Tools ("we", "our", or "us") collects, uses, and protects your information when you use our website and online tools, including image compressors, currency converters, calculators, and other free tools.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          1. Information We Collect
        </h2>
        <p className="mb-4 text-gray-700">
          We do not require you to create an account or provide personal information to use our tools. However, the following types of information may be collected:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li><strong>Automatically Collected Data:</strong> Information such as your IP address, browser type, device type, and operating system may be automatically collected to improve user experience.</li>
          <li><strong>Tool Usage Data:</strong> Non-identifiable data about how you interact with our tools (e.g., number of conversions, tool features used) may be collected to analyze usage patterns and improve our services.</li>
          <li><strong>Cookies & Analytics:</strong> We may use cookies or similar technologies to remember preferences, track user behavior, and for analytics purposes. No personally identifiable information is stored through these cookies.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          2. How We Use Your Information
        </h2>
        <p className="mb-4 text-gray-700">
          The information we collect is used for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>To provide and maintain our website and online tools.</li>
          <li>To analyze usage patterns and improve the performance and functionality of our tools.</li>
          <li>To customize user experience and ensure smooth operation of our services.</li>
          <li>To monitor and prevent abuse, fraud, or security threats.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          3. Sharing Your Information
        </h2>
        <p className="mb-4 text-gray-700">
          We respect your privacy and do not sell, rent, or trade your personal information. We may share anonymized, aggregated data with third-party analytics providers to help us understand how our tools are being used.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          4. Security
        </h2>
        <p className="mb-4 text-gray-700">
          We take reasonable measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          5. Third-Party Links
        </h2>
        <p className="mb-4 text-gray-700">
          Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party websites you visit.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          6. Children’s Privacy
        </h2>
        <p className="mb-4 text-gray-700">
          Pixy Tools is not intended for use by children under the age of 13. We do not knowingly collect personal information from children. If we learn that we have inadvertently collected such information, we will delete it promptly.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          7. Changes to This Privacy Policy
        </h2>
        <p className="mb-4 text-gray-700">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Modified" date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
        </p>

        
        <p className="text-gray-500 text-sm mt-6 text-center">
          Last Updated: October 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
