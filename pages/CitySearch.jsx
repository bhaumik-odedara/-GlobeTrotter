import React, { useState } from "react";
import CityCard from "../components/CityCard";
import "../styles/CitySearch.css";

const citiesData = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    region: "Europe",
    costIndex: "High",
    popularity: "98%",
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    costIndex: "High",
    popularity: "95%",
  },
  {
    id: 3,
    name: "Dubai",
    country: "UAE",
    region: "Middle East",
    costIndex: "High",
    popularity: "92%",
  },
  {
    id: 4,
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    costIndex: "Medium",
    popularity: "90%",
  },
  {
    id: 5,
    name: "London",
    country: "UK",
    region: "Europe",
    costIndex: "High",
    popularity: "96%",
  },
  {
    id: 6,
    name: "New York",
    country: "USA",
    region: "North America",
    costIndex: "High",
    popularity: "94%",
  },
];

function CitySearch() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");

  const filteredCities = citiesData.filter((city) => {
    const matchesSearch =
      city.name.toLowerCase().includes(search.toLowerCase()) ||
      city.country.toLowerCase().includes(search.toLowerCase());

    const matchesCountry =
      country === "All" || city.country === country;

    return matchesSearch && matchesCountry;
  });

  return (
    <div className="city-search-page">

      <div className="city-header">
        <div>
          <h1>Discover Cities</h1>
          <p>Find and add cities to your trip itinerary.</p>
        </div>
      </div>

      <div className="search-section">

        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search city or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="All">All Countries</option>
          <option value="France">France</option>
          <option value="Japan">Japan</option>
          <option value="UAE">UAE</option>
          <option value="Indonesia">Indonesia</option>
          <option value="UK">UK</option>
          <option value="USA">USA</option>
        </select>

      </div>

      <div className="city-list">

        {filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <CityCard
              key={city.id}
              city={city}
            />
          ))
        ) : (
          <div className="no-city">
            <h3>No cities found</h3>
            <p>Try searching for another city or country.</p>
          </div>
        )}

      </div>

    </div>
  );
}

export default CitySearch;