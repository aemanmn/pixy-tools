import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!weight || !height) return;

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue >= 18.5 && bmiValue < 24.9) setCategory("Normal weight");
    else if (bmiValue >= 25 && bmiValue < 29.9) setCategory("Overweight");
    else setCategory("Obese");
  };

  const resetFields = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setCategory("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      {/* Helmet for SEO */}
      <Helmet>
        <title>Pixy Tools | BMI Calculator</title>
        <meta
          name="description"
          content="Calculate your Body Mass Index (BMI) easily with our free online BMI Calculator. Supports metric units."
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        ⚖️ BMI Calculator
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter weight in kg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter height in cm"
          />
        </div>

        <div className="flex space-x-4 mb-4">
          <button
            onClick={calculateBMI}
            className="flex-1 bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600 transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={resetFields}
            className="flex-1 bg-gray-300 text-gray-700 rounded-lg py-2 font-semibold hover:bg-gray-400 transition-colors"
          >
            Reset
          </button>
        </div>

        {bmi && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-lg font-semibold">
              Your BMI: <span className="text-blue-600">{bmi}</span>
            </p>
            <p className="text-gray-700 mt-1">Category: {category}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
