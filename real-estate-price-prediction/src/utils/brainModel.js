import * as brain from "brain.js";
import trainingData from "../data/dataset";

// Initialize neural network
const net = new brain.NeuralNetwork();

// Normalize data
const normalizeData = (data) =>
  data.map((item) => ({
    input: {
      area: item.input.area / 2000,
      bedrooms: item.input.bedrooms / 5,
      bathrooms: item.input.bathrooms / 3,
      location: item.input.location / 2,
      age: item.input.age / 50,
    },
    output: { price: item.output.price / 1000000 },
  }));

// Train the model and save to localStorage
export const trainModel = () => {
  console.log("Training model...");
  net.train(normalizeData(trainingData), {
    iterations: 2000,
    errorThresh: 0.005,
    log: true,
    logPeriod: 100,
    learningRate: 0.1,
  });

  console.log("Model trained successfully!");

  // Save the trained model in LocalStorage
  localStorage.setItem("trainedModel", JSON.stringify(net.toJSON()));
  return net.toJSON();
};

// Load the model from LocalStorage
export const loadModel = () => {
  const savedModel = localStorage.getItem("trainedModel");
  if (savedModel) {
    net.fromJSON(JSON.parse(savedModel));
    console.log("Loaded trained model from storage.");
  } else {
    console.log("No saved model found. Train the model first.");
  }
};

// Predict function
export const predictPrice = (input) => {
  loadModel(); // Ensure the trained model is loaded before predicting

  const normalizedInput = {
    area: input.area / 2000,
    bedrooms: input.bedrooms / 5,
    bathrooms: input.bathrooms / 3,
    location: input.location / 2,
    age: input.age / 50,
  };

  const output = net.run(normalizedInput);
  return output.price * 1000000; // Convert back to price
};
