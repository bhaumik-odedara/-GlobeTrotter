require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const mongoose = require("mongoose");
const City = require("../models/City");

const cities = [
  {
    name: "Paris",
    country: "France",
    region: "Europe",
    costIndex: "High",
    popularity: "98%",
    description: "The City of Light, known for the Eiffel Tower, Louvre Museum, and exquisite cuisine.",
  },
  {
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    costIndex: "High",
    popularity: "95%",
    description: "A vibrant metropolis blending ultra-modern technology with traditional temples and gardens.",
  },
  {
    name: "Dubai",
    country: "UAE",
    region: "Middle East",
    costIndex: "High",
    popularity: "92%",
    description: "A luxurious city known for its futuristic architecture, shopping, and desert adventures.",
  },
  {
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    costIndex: "Medium",
    popularity: "90%",
    description: "A tropical paradise with stunning beaches, rice terraces, and rich culture.",
  },
  {
    name: "London",
    country: "UK",
    region: "Europe",
    costIndex: "High",
    popularity: "96%",
    description: "A historic city with iconic landmarks, world-class museums, and diverse culture.",
  },
  {
    name: "New York",
    country: "USA",
    region: "North America",
    costIndex: "High",
    popularity: "94%",
    description: "The city that never sleeps, famous for Times Square, Central Park, and Broadway.",
  },
  {
    name: "Rome",
    country: "Italy",
    region: "Europe",
    costIndex: "High",
    popularity: "91%",
    description: "The Eternal City, home to the Colosseum, Vatican City, and incredible Italian food.",
  },
  {
    name: "Barcelona",
    country: "Spain",
    region: "Europe",
    costIndex: "Medium",
    popularity: "89%",
    description: "A vibrant coastal city known for Gaudi architecture, beaches, and tapas.",
  },
  {
    name: "Bangkok",
    country: "Thailand",
    region: "Asia",
    costIndex: "Low",
    popularity: "88%",
    description: "A bustling capital with ornate temples, street food markets, and nightlife.",
  },
  {
    name: "Sydney",
    country: "Australia",
    region: "Oceania",
    costIndex: "High",
    popularity: "87%",
    description: "A harbour city with the iconic Opera House, beautiful beaches, and vibrant culture.",
  },
  {
    name: "Istanbul",
    country: "Turkey",
    region: "Middle East",
    costIndex: "Medium",
    popularity: "86%",
    description: "A city bridging Europe and Asia, rich in history with stunning mosques and bazaars.",
  },
  {
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    costIndex: "Medium",
    popularity: "84%",
    description: "A stunning coastal city with Table Mountain, vineyards, and diverse wildlife.",
  },
  {
    name: "Rio de Janeiro",
    country: "Brazil",
    region: "South America",
    costIndex: "Medium",
    popularity: "85%",
    description: "Famous for Carnival, Christ the Redeemer, Sugarloaf Mountain, and Copacabana Beach.",
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    region: "Europe",
    costIndex: "High",
    popularity: "88%",
    description: "A charming canal city known for its cycling culture, museums, and tulip gardens.",
  },
  {
    name: "Singapore",
    country: "Singapore",
    region: "Asia",
    costIndex: "High",
    popularity: "89%",
    description: "A modern city-state with stunning gardens, hawker centers, and Marina Bay Sands.",
  },
  {
    name: "Manali",
    country: "India",
    region: "Asia",
    costIndex: "Low",
    popularity: "82%",
    description: "A scenic hill station in the Himalayas, perfect for adventure sports and nature lovers.",
  },
  {
    name: "Goa",
    country: "India",
    region: "Asia",
    costIndex: "Low",
    popularity: "85%",
    description: "India's beach paradise with golden shores, Portuguese heritage, and vibrant nightlife.",
  },
  {
    name: "Jaipur",
    country: "India",
    region: "Asia",
    costIndex: "Low",
    popularity: "80%",
    description: "The Pink City, famous for its palaces, forts, and rich Rajasthani culture.",
  },
  {
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    costIndex: "High",
    popularity: "90%",
    description: "A breathtaking island with white-washed buildings, blue domes, and stunning sunsets.",
  },
  {
    name: "Maldives",
    country: "Maldives",
    region: "Asia",
    costIndex: "High",
    popularity: "91%",
    description: "A tropical paradise of overwater villas, crystal-clear waters, and coral reefs.",
  },
  {
    name: "Cairo",
    country: "Egypt",
    region: "Africa",
    costIndex: "Low",
    popularity: "78%",
    description: "Home to the Great Pyramids, the Sphinx, and thousands of years of ancient history.",
  },
  {
    name: "Seoul",
    country: "South Korea",
    region: "Asia",
    costIndex: "Medium",
    popularity: "86%",
    description: "A dynamic city blending K-pop culture, ancient palaces, and cutting-edge technology.",
  },
  {
    name: "Prague",
    country: "Czech Republic",
    region: "Europe",
    costIndex: "Medium",
    popularity: "83%",
    description: "A fairy-tale city with Gothic architecture, cobblestone streets, and historic castles.",
  },
  {
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    costIndex: "Low",
    popularity: "79%",
    description: "A vibrant city with colorful souks, palaces, and the famous Jemaa el-Fnaa square.",
  },
];

const seedCities = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing cities
    await City.deleteMany({});
    console.log("Cleared existing cities");

    // Insert seed data
    const inserted = await City.insertMany(cities);
    console.log(`Successfully seeded ${inserted.length} cities`);

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedCities();
