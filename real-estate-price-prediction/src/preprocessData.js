import data from "../data/data.json";

// Normalize function (Min-Max Scaling)
const normalize = (value, min, max) => (value - min) / (max - min);

// Encode locations as numbers
const locationMapping = {
  "New York": 0,
  "San Francisco": 1,
  "Chicago": 2
};

// Preprocess Data
export const preprocessData = () => {
  const areas = data.map(d => d.area);
  const ages = data.map(d => d.age);
  
  const minArea = Math.min(...areas);
  const maxArea = Math.max(...areas);
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);

  return data.map(d => ({
    input: {
      area: normalize(d.area, minArea, maxArea),
      bedrooms: d.bedrooms / 5,  // Assuming max 5 bedrooms
      bathrooms: d.bathrooms / 5, // Assuming max 5 bathrooms
      location: locationMapping[d.location] / 2, // Normalize locations
      age: normalize(d.age, minAge, maxAge)
    },
    output: { price: d.price / 1000000 } // Normalize price to 0-1 range
  }));
};
