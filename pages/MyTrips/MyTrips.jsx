import React from "react";
import "./MyTrips.css";

const MyTrips = () => {

  const trips = [
    {
      id: 1,
      name: "Europe Summer Trip",
      startDate: "15 June 2026",
      endDate: "28 June 2026",
      destinations: 4,
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Goa Beach Vacation",
      startDate: "10 July 2026",
      endDate: "15 July 2026",
      destinations: 2,
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Japan Adventure",
      startDate: "5 August 2026",
      endDate: "18 August 2026",
      destinations: 5,
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleView = (trip) => {
    console.log("View Trip:", trip);
  };

  const handleEdit = (trip) => {
    console.log("Edit Trip:", trip);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (confirmDelete) {
      console.log("Delete Trip:", id);
    }
  };

  return (
    <div className="my-trips-page">

      <div className="my-trips-container">

        {/* Header */}
        <div className="trips-header">

          <div>
            <h1>My Trips</h1>
            <p>View and manage all your travel plans.</p>
          </div>

          <button className="create-trip-btn">
            + Create New Trip
          </button>

        </div>

        {/* Trips */}
        <div className="trips-grid">

          {trips.map((trip) => (

            <div className="trip-card" key={trip.id}>

              {/* Image */}
              <div className="trip-image">
                <img src={trip.image} alt={trip.name} />
              </div>

              {/* Content */}
              <div className="trip-card-content">

                <h2>{trip.name}</h2>

                <div className="trip-date">
                  📅 {trip.startDate} - {trip.endDate}
                </div>

                <div className="destination-count">
                  📍 {trip.destinations} Destinations
                </div>

                {/* Actions */}
                <div className="trip-actions">

                  <button
                    className="view-btn"
                    onClick={() => handleView(trip)}
                  >
                    View
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(trip)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(trip.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default MyTrips;