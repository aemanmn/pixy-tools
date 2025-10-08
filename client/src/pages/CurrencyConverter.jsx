import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("https://api.exchangerate.host/latest");
        const data = await response.json();

        if (data && data.rates) {
          const currencyList = Object.keys(data.rates).sort();
          setRates(data.rates);
          setCurrencies(currencyList);
          setLoading(false);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        // fallback if API fails
        setCurrencies(["USD", "EUR", "GBP", "INR", "PKR", "AUD", "CAD", "JPY", "SAR"]);
        setRates({
          USD: 1,
          EUR: 0.93,
          GBP: 0.81,
          INR: 84.2,
          PKR: 278.5,
          AUD: 1.49,
          CAD: 1.36,
          JPY: 156.9,
          SAR: 3.75,
        });
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const convertCurrency = () => {
    if (!amount || !fromCurrency || !toCurrency) return;
    const rateFrom = rates[fromCurrency];
    const rateTo = rates[toCurrency];
    const result = (amount / rateFrom) * rateTo;
    setConvertedAmount(result.toFixed(2));
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setConvertedAmount(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      <Helmet>
        <title>Pixy Tools | Currency Converter</title>
        <meta
          name="description"
          content="Convert currencies easily with our free online Currency Converter. Supports all major world currencies with real-time rates."
        />
      </Helmet>
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
        💱 Currency Converter
      </h1>

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        {loading ? (
          <p className="text-center text-gray-500">Fetching currency data...</p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter amount"
              />
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">From</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {currencies.map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">To</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {currencies.map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={swapCurrencies}
                className="text-blue-500 font-semibold hover:underline"
              >
                🔁 Swap
              </button>
              <button
                onClick={convertCurrency}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Convert
              </button>
            </div>

            {convertedAmount && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-lg font-semibold">
                  {amount} {fromCurrency} ={" "}
                  <span className="text-blue-600">{convertedAmount}</span>{" "}
                  {toCurrency}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
