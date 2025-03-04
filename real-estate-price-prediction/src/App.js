

// import './App.css';
// import React, { useState, useEffect } from "react";
// import PropertyForm from "./components/PropertyForm";
// import { trainModel, predictPrice } from "./utils/brainModel"; // Keep this import
// import PriceComparisonChart from "./components/PriceComparisonChart";

// function App() {
//   const [predictedPrice, setPredictedPrice] = useState(null);
//   const [actualPrices] = useState([100000, 150000, 200000, 250000]);
//   const [predictedPrices, setPredictedPrices] = useState([110000, 145000, 210000, 240000]);

//   useEffect(() => {
//     trainModel(); // Train model on startup (or load from localStorage)
//   }, []);

//   const handleFormSubmit = (data) => {
//     const locationMap = { "New York": 0, "San Francisco": 1, "Chicago": 2 };
    
//     const input = {
//       area: Number(data.area),
//       bedrooms: Number(data.bedrooms),
//       bathrooms: Number(data.bathrooms),
//       location: locationMap[data.location] ?? 0, // Default to 0 if location is not found
//       age: Number(data.age),
//     };

//     const price = predictPrice(input);
//     setPredictedPrice(price.toFixed(2));

//     // Update the predictedPrices array for visualization
//     setPredictedPrices((prevPrices) => [...prevPrices.slice(1), price]);  
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">
//         🏠 Real Estate Price Prediction
//       </h1>

//       <PropertyForm onSubmit={handleFormSubmit} />

//       {predictedPrice && (
//         <div className="mt-6 p-4 bg-white border rounded-lg shadow-md">
//           <h2 className="text-lg font-bold text-gray-700">
//             Predicted Price: <span className="text-blue-600">${predictedPrice}</span>
//           </h2>
//         </div>
//       )}
      
//       <PriceComparisonChart actualPrices={actualPrices} predictedPrices={predictedPrices} />
//     </div>
//   );
// }

// export default App;
import './App.css';
import React, { useState, useEffect } from "react";
import PropertyForm from "./components/PropertyForm";
import { trainModel, predictPrice } from "./utils/brainModel"; // Keep this import
import PriceComparisonChart from "./components/PriceComparisonChart";

function App() {
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);
  const [actualPrices] = useState([100000, 150000, 200000, 250000]);
  const [predictedPrices, setPredictedPrices] = useState([110000, 145000, 210000, 240000]);

  useEffect(() => {
    try {
      trainModel(); // Train model on startup (or load from localStorage)
    } catch (err) {
      console.error("Model training failed:", err);
      setError("Failed to initialize the model. Please refresh the page.");
    }
  }, []);

  const handleFormSubmit = (data) => {
    setError(null); // Clear previous errors

    try {
      // Validate input
      if (!data.area || !data.bedrooms || !data.bathrooms || !data.location || !data.age) {
        throw new Error("All fields are required.");
      }
      if (isNaN(data.area) || isNaN(data.bedrooms) || isNaN(data.bathrooms) || isNaN(data.age)) {
        throw new Error("Invalid input: Numbers are required for Area, Bedrooms, Bathrooms, and Age.");
      }

      const locationMap = { "New York": 0, "San Francisco": 1, "Chicago": 2 };
      if (!locationMap.hasOwnProperty(data.location)) {
        throw new Error("Invalid location selected.");
      }

      const input = {
        area: Number(data.area),
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        location: locationMap[data.location],
        age: Number(data.age),
      };

      const price = predictPrice(input);
      if (isNaN(price) || price <= 0) {
        throw new Error("Prediction failed. Please try again with different values.");
      }

      setPredictedPrice(price.toFixed(2));

      // Update the predictedPrices array for visualization
      setPredictedPrices((prevPrices) => [...prevPrices.slice(1), price]);

    } catch (err) {
      console.error("Prediction error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🏠 Real Estate Price Prediction
      </h1>

      <PropertyForm onSubmit={handleFormSubmit} />

      {error && (
        <div className="mt-4 p-3 bg-red-200 text-red-800 border border-red-500 rounded-lg">
          ❌ {error}
        </div>
      )}

      {predictedPrice && !error && (
        <div className="mt-6 p-4 bg-white border rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-700">
            Predicted Price: <span className="text-blue-600">${predictedPrice}</span>
          </h2>
        </div>
      )}
      
      <PriceComparisonChart actualPrices={actualPrices} predictedPrices={predictedPrices} />
    </div>
  );
}

export default App;
