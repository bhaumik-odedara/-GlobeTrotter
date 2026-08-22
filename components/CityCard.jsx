import React from "react";

function CityCard({ city }) {
  const handleAddToTrip = () => {
    alert(`${city.name} added to your trip!`);
  };

  return (
    <div className="city-card">

      <div className="city-image">
        <span>🌍</span>
      </div>

      <div className="city-info">

        <div className="city-title">
          <div>
            <h2>{city.name}</h2>
            <p>{city.country}</p>
          </div>

          <span className="region">
            {city.region}
          </span>
        </div>

        <div className="city-meta">

          <div>
            <span>💰</span>
            <small>Cost Index</small>
            <strong>{city.costIndex}</strong>
          </div>

          <div>
            <span>🔥</span>
            <small>Popularity</small>
            <strong>{city.popularity}</strong>
          </div>

        </div>

        <button
          className="add-city-btn"
          onClick={handleAddToTrip}
        >
          + Add to Trip
        </button>

      </div>

    </div>
  );
}

export default CityCard;