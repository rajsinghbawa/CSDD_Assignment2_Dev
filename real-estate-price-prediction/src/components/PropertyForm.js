import React, { useState } from "react";

const PropertyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    location: "New York",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-lg rounded-lg max-w-md w-full border"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Enter Property Details 🏡
      </h2>

      {/** Input Fields */}
      {["area", "bedrooms", "bathrooms", "age"].map((field, index) => (
        <div key={index} className="mb-3">
          <label className="block mb-1 capitalize text-gray-600">
            {field}:
          </label>
          <input
            type="number"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
          />
        </div>
      ))}

      {/** Location Dropdown */}
      <div className="mb-3">
        <label className="block mb-1 text-gray-600">Location:</label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
        >
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Chicago">Chicago</option>
        </select>
      </div>

      {/** Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Predict Price 📊
      </button>
    </form>
  );
};

export default PropertyForm;

// import React, { useState } from "react";
// import { readExcelFile } from "../utils/readExcel"; // Import the readExcelFile utility
// //import { predictPrice } from "../utils/brainModel";

// const PropertyForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     area: "",
//     bedrooms: "",
//     bathrooms: "",
//     location: "New York",
//     age: "",
//   });
//   const [file, setFile] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       try {
//         const data = await readExcelFile(file);
//         // Assuming the data contains property details in a format similar to formData
//         const predictions = data.map((item) => {
//           const locationMap = { "New York": 0, "San Francisco": 1, "Chicago": 2 };
//           const input = {
//             area: item.area,
//             bedrooms: item.bedrooms,
//             bathrooms: item.bathrooms,
//             location: locationMap[item.location] || 0, // Default to New York if location not found
//             age: item.age,
//           };
//           return { input, price: predictPrice(input) }; // Assuming predictPrice is accessible
//         });
//         console.log(predictions); // Log predictions for testing
//         onSubmit(predictions); // Call onSubmit with the predictions
//       } catch (error) {
//         console.error("Error reading Excel file:", error);
//       }
//     } else {
//       onSubmit([formData]); // Handle the form submission without file
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="p-6 bg-white shadow-lg rounded-lg max-w-md w-full border"
//     >
//       <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//         Enter Property Details 🏡
//       </h2>

//       {/** Input Fields */}
//       {["area", "bedrooms", "bathrooms", "age"].map((field, index) => (
//         <div key={index} className="mb-3">
//           <label className="block mb-1 capitalize text-gray-600">
//             {field}:
//           </label>
//           <input
//             type="number"
//             name={field}
//             value={formData[field]}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//       ))}

//       {/** Location Dropdown */}
//       <div className="mb-3">
//         <label className="block mb-1 text-gray-600">Location:</label>
//         <select
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
//         >
//           <option value="New York">New York</option>
//           <option value="San Francisco">San Francisco</option>
//           <option value="Chicago">Chicago</option>
//         </select>
//       </div>

//       {/** File Input */}
//       <div className="mb-3">
//         <label className="block mb-1 text-gray-600">Upload Excel File:</label>
//         <input
//           type="file"
//           accept=".xlsx"
//           onChange={handleFileChange}
//           className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
//         />
//       </div>

//       {/** Submit Button */}
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
//       >
//         Predict Price 📊
//       </button>
//     </form>
//   );
// };

// export default PropertyForm;

// import React, { useState } from "react";
// import { readExcelFile } from "../utils/readExcel"; // Import the readExcelFile utility
// //import { predictPrice } from "../utils/brainModel"; // Import the predictPrice function

// const PropertyForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     area: "",
//     bedrooms: "",
//     bathrooms: "",
//     location: "New York",
//     age: "",
//   });
//   const [file, setFile] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       try {
//         const data = await readExcelFile(file);
//         // Assuming the data contains property details in a format similar to formData
//         const predictions = data.map((item) => {
//           const locationMap = { "New York": 0, "San Francisco": 1, "Chicago": 2 };
//           const input = {
//             area: item.area,
//             bedrooms: item.bedrooms,
//             bathrooms: item.bathrooms,
//             location: locationMap[item.location] || 0, // Default to New York if location not found
//             age: item.age,
//           };
//           return { input, price: predictPrice(input) }; // Call predictPrice
//         });
//         console.log(predictions); // Log predictions for testing
//         onSubmit(predictions); // Call onSubmit with the predictions
//       } catch (error) {
//         console.error("Error reading Excel file:", error);
//       }
//     } else {
//       onSubmit([formData]); // Handle the form submission without file
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="p-6 bg-white shadow-lg rounded-lg max-w-md w-full border"
//     >
//       <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//         Enter Property Details 🏡
//       </h2>

//       {/** Input Fields */}
//       {["area", "bedrooms", "bathrooms", "age"].map((field, index) => (
//         <div key={index} className="mb-3">
//           <label className="block mb-1 capitalize text-gray-600">
//             {field}:
//           </label>
//           <input
//             type="number"
//             name={field}
//             value={formData[field]}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//       ))}

//       {/** Location Dropdown */}
//       <div className="mb-3">
//         <label className="block mb-1 text-gray-600">Location:</label>
//         <select
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
//         >
//           <option value="New York">New York</option>
//           <option value="San Francisco">San Francisco</option>
//           <option value="Chicago">Chicago</option>
//         </select>
//       </div>

//       {/** File Input */}
//       <div className="mb-3">
//         <label className="block mb-1 text-gray-600">Upload Excel File:</label>
//         <input
//           type="file"
//           accept=".xlsx"
//           onChange={handleFileChange}
//           className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
//         />
//       </div>

//       {/** Submit Button */}
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
//       >
//         Predict Price 📊
//       </button>
//     </form>
//   );
// };

// export default PropertyForm;

// import React, { useState } from "react";
// import { readExcelFile } from "../utils/readExcel"; // Import the readExcelFile utility
// import { predictPrice } from "../utils/brainModel";
// // Import predictPrice if you are going to use it here or ensure it's correctly imported from App.js

// const PropertyForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     area: "",
//     bedrooms: "",
//     bathrooms: "",
//     location: "New York",
//     age: "",
//   });
//   const [file, setFile] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       try {
//         const data = await readExcelFile(file);
//         const predictions = data.map((item) => {
//           const locationMap = {"Downtown": "Suburban", "Rural": "Rural", "Suburban": "Suburban" };
//           const input = {
//             area: item.area,
//             bedrooms: item.bedrooms,
//             bathrooms: item.bathrooms,
//             location: locationMap[item.location] || 0,
//             age: item.age,
//           };
//           return { input, price: predictPrice(input) }; // Make sure predictPrice is imported
//         });
//         console.log(predictions);
//         onSubmit(predictions);
//       } catch (error) {
//         console.error("Error reading Excel file:", error);
//       }
//     } else {
//       onSubmit([formData]);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="p-6 bg-white shadow-lg rounded-lg max-w-md w-full border"
//     >
//       <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//         Enter Property Details 🏡
//       </h2>

//       {["area", "bedrooms", "bathrooms", "age"].map((field, index) => (
//         <div key={index} className="mb-3">
//           <label className="block mb-1 capitalize text-gray-600">
//             {field}:
//           </label>
//           <input
//             type="number"
//             name={field}
//             value={formData[field]}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//       ))}

//       <div className="mb-3">
//         <label className="block mb-1 text-gray-600">Location:</label>
//         <select
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
//         >
//           <option value="Downtown">Downtown</option>
//           <option value="Rural">Rural </option>
//           <option value="Suburban">Suburban</option>
//         </select>
//       </div>

//       <div className="mb-3">
//         <label className="block mb-1 text-gray-600">Upload Excel File:</label>
//         <input
//           type="file"
//           accept=".xlsx"
//           onChange={handleFileChange}
//           className="w-full border p-2 rounded focus:ring focus:ring-blue-300"
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
//       >
//         Predict Price 📊
//       </button>
//     </form>
//   );
// };

// export default PropertyForm;
