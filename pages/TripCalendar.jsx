import React, { useState } from "react";
import "./TripCalendar.css";

const tripDays = [
  {
    date: "12",
    day: "Monday",
    month: "August",
    activities: [
      {
        time: "09:00 AM",
        title: "Arrival & Hotel Check-in",
        location: "Grand Palace Hotel",
        type: "Hotel",
      },
      {
        time: "11:00 AM",
        title: "City Sightseeing",
        location: "Downtown City",
        type: "Sightseeing",
      },
      {
        time: "02:00 PM",
        title: "Lunch",
        location: "The Garden Restaurant",
        type: "Food",
      },
      {
        time: "05:00 PM",
        title: "Visit City Museum",
        location: "Central Museum",
        type: "Activity",
      },
    ],
  },
  {
    date: "13",
    day: "Tuesday",
    month: "August",
    activities: [
      {
        time: "08:00 AM",
        title: "Breakfast",
        location: "Hotel Restaurant",
        type: "Food",
      },
      {
        time: "10:00 AM",
        title: "Mountain Trip",
        location: "Green Valley",
        type: "Adventure",
      },
      {
        time: "04:00 PM",
        title: "Photography Session",
        location: "Green Valley",
        type: "Activity",
      },
    ],
  },
  {
    date: "14",
    day: "Wednesday",
    month: "August",
    activities: [
      {
        time: "09:00 AM",
        title: "Beach Visit",
        location: "Sunset Beach",
        type: "Activity",
      },
      {
        time: "01:00 PM",
        title: "Lunch by the Beach",
        location: "Ocean View Cafe",
        type: "Food",
      },
      {
        time: "06:00 PM",
        title: "Sunset Walk",
        location: "Sunset Beach",
        type: "Activity",
      },
    ],
  },
];

function TripCalendar() {
  const [activeDay, setActiveDay] = useState(0);
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="trip-calendar-page">

      {/* Header */}
      <div className="calendar-header">
        <div>
          <p className="page-label">YOUR JOURNEY</p>
          <h1>Trip Calendar</h1>
          <p className="header-subtitle">
            View and manage your complete travel itinerary.
          </p>
        </div>

        <button className="edit-trip-btn">
          + Add Activity
        </button>
      </div>

      {/* Calendar */}
      <div className="calendar-card">

        <div className="calendar-top">
          <button className="month-arrow">‹</button>

          <h2>August 2026</h2>

          <button className="month-arrow">›</button>
        </div>

        <div className="calendar-days">
          {tripDays.map((item, index) => (
            <button
              key={index}
              className={`calendar-day ${
                activeDay === index ? "active" : ""
              }`}
              onClick={() => setActiveDay(index)}
            >
              <span>{item.day.slice(0, 3)}</span>
              <strong>{item.date}</strong>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day */}
      <div className="selected-day">

        <div className="day-heading">
          <div>
            <p className="small-text">
              {tripDays[activeDay].month} {tripDays[activeDay].date}
            </p>

            <h2>{tripDays[activeDay].day}</h2>
          </div>

          <button
            className="collapse-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>

        {/* Timeline */}
        {expanded && (
          <div className="timeline">

            {tripDays[activeDay].activities.map((activity, index) => (
              <div className="timeline-item" key={index}>

                <div className="timeline-time">
                  {activity.time}
                </div>

                <div className="timeline-line">

                  <div className="timeline-dot"></div>

                  {index !==
                    tripDays[activeDay].activities.length - 1 && (
                    <div className="timeline-connector"></div>
                  )}

                </div>

                <div className="activity-card">

                  <div className="activity-content">
                    <span className="activity-type">
                      {activity.type}
                    </span>

                    <h3>{activity.title}</h3>

                    <p>📍 {activity.location}</p>
                  </div>

                  <div className="activity-actions">
                    <button title="Move activity">☷</button>
                    <button title="Edit activity">✎</button>
                    <button title="More options">⋮</button>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default TripCalendar;