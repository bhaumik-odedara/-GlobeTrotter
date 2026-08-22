import React, { useState } from "react";
import "./CreateTrip.css";

const CreateTrip = () => {
  const [trip, setTrip] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    coverPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setTrip({
      ...trip,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Trip Created:", trip);

    alert("Trip created successfully!");
  };

  return (
    <div className="create-trip-page">
      <div className="create-trip-container">

        <div className="page-header">
          <h1>Create New Trip</h1>
          <p>Start planning your next amazing journey.</p>
        </div>

        <form className="trip-form" onSubmit={handleSubmit}>

          {/* Trip Name */}
          <div className="form-group">
            <label>Trip Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Europe Summer Trip"
              value={trip.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Dates */}
          <div className="date-row">

            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={trip.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={trip.endDate}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Description */}
          <div className="form-group">
            <label>Trip Description</label>

            <textarea
              name="description"
              placeholder="Tell us something about your trip..."
              rows="5"
              value={trip.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Cover Photo */}
          <div className="form-group">
            <label>Cover Photo <span>(Optional)</span></label>

            <div className="upload-box">
              <input
                type="file"
                name="coverPhoto"
                accept="image/*"
                onChange={handleChange}
              />

              <div className="upload-content">
                <div className="upload-icon">📷</div>
                <p>Upload a cover photo</p>
                <small>PNG, JPG or JPEG</small>
              </div>
            </div>
          </div>

          {/* Button */}
          <button type="submit" className="save-trip-btn">
            Save Trip
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateTrip;