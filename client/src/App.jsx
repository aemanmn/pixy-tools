import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";

import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";

// Home & tools
import Home from "./pages/Home";
import BMICalculator from "./pages/BMICalculator";
import CurrencyConverter from "./pages/CurrencyConverter";
import ATSChecker from "./pages/ATSChecker";
import InstagramCaption from "./pages/InstagramCaption";
import BlogTitleImprover from "./pages/BlogTitleImprover";
import HashtagGenerator from "./pages/HashtagGenerator";
import WordToPDF from "./pages/WordToPDF";
import ImageCompressor from "./pages/ImageCompressor";

// Other pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Blog from "./pages/Blog";

// Page transition wrapper
import { motion } from "framer-motion";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <HelmetProvider>
      <>
        <Navbar />

        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            {/* Home */}
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />

            {/* Tools */}
            <Route
              path="/bmi-calculator"
              element={
                <PageWrapper>
                  <BMICalculator />
                </PageWrapper>
              }
            />
            <Route
              path="/currency-converter"
              element={
                <PageWrapper>
                  <CurrencyConverter />
                </PageWrapper>
              }
            />
            <Route
              path="/ats-checker"
              element={
                <PageWrapper>
                  <ATSChecker />
                </PageWrapper>
              }
            />
            <Route
              path="/instagram-caption"
              element={
                <PageWrapper>
                  <InstagramCaption />
                </PageWrapper>
              }
            />
            <Route
              path="/blog-title-improver"
              element={
                <PageWrapper>
                  <BlogTitleImprover />
                </PageWrapper>
              }
            />
            <Route
              path="/hashtag-generator"
              element={
                <PageWrapper>
                  <HashtagGenerator />
                </PageWrapper>
              }
            />
            <Route
              path="/word-to-pdf"
              element={
                <PageWrapper>
                  <WordToPDF />
                </PageWrapper>
              }
            />
            <Route
              path="/image-compressor"
              element={
                <PageWrapper>
                  <ImageCompressor />
                </PageWrapper>
              }
            />

            {/* Other pages */}
            <Route
              path="/about"
              element={
                <PageWrapper>
                  <About />
                </PageWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <Contact />
                </PageWrapper>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <PageWrapper>
                  <PrivacyPolicy />
                </PageWrapper>
              }
            />
            <Route
              path="/terms-of-use"
              element={
                <PageWrapper>
                  <TermsOfUse />
                </PageWrapper>
              }
            />
            <Route
              path="/blog"
              element={
                <PageWrapper>
                  <Blog />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>

        <Footer />
      </>
    </HelmetProvider>
  );
}

export default App;
