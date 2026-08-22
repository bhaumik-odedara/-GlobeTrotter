import React from "react";
import "./SharedItinerary.css";

const SharedItinerary = () => {
  const itinerary = {
    title: "7 Days in Paris",
    location: "Paris, France",
    dates: "12 June - 18 June 2026",
    travelers: 2,
    budget: "$1,850",
  };

  const days = [
    {
      day: "Day 1",
      date: "12 June",
      activities: [
        {
          time: "09:00 AM",
          title: "Arrival in Paris",
          description: "Check-in at hotel and freshen up.",
          type: "Travel",
        },
        {
          time: "02:00 PM",
          title: "Visit Eiffel Tower",
          description: "Explore the Eiffel Tower and enjoy the city view.",
          type: "Sightseeing",
        },
        {
          time: "07:30 PM",
          title: "French Dinner",
          description: "Enjoy a traditional French dinner.",
          type: "Food",
        },
      ],
    },
    {
      day: "Day 2",
      date: "13 June",
      activities: [
        {
          time: "09:30 AM",
          title: "Louvre Museum",
          description: "Explore famous artworks and historical collections.",
          type: "Culture",
        },
        {
          time: "03:00 PM",
          title: "Paris City Walk",
          description: "Walk through the beautiful streets of central Paris.",
          type: "Activity",
        },
        {
          time: "08:00 PM",
          title: "Seine River Cruise",
          description: "Relax and enjoy the sunset along the Seine.",
          type: "Experience",
        },
      ],
    },
    {
      day: "Day 3",
      date: "14 June",
      activities: [
        {
          time: "10:00 AM",
          title: "Visit Montmartre",
          description: "Explore Sacré-Cœur and the artistic streets.",
          type: "Sightseeing",
        },
        {
          time: "04:00 PM",
          title: "Shopping",
          description: "Explore local shops and French fashion stores.",
          type: "Shopping",
        },
      ],
    },
  ];

  const handleCopyTrip = () => {
    alert("Trip copied successfully!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: itinerary.title,
        text: "Check out this amazing Paris itinerary!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Public itinerary link copied!");
    }
  };

  return (
    <div className="shared-page">

      {/* Navbar */}
      <nav className="shared-navbar">
        <div className="logo">
          Trip<span>Planner</span>
        </div>

        <div className="navbar-actions">
          <button className="share-btn" onClick={handleShare}>
            ↗ Share
          </button>

          <button className="copy-btn" onClick={handleCopyTrip}>
            + Copy Trip
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="shared-hero">
        <div className="hero-content">

          <span className="public-badge">
            🌐 Public Itinerary
          </span>

          <h1>{itinerary.title}</h1>

          <p className="location">
            📍 {itinerary.location}
          </p>

          <p className="hero-description">
            A carefully planned trip itinerary shared by a fellow traveler.
            Get inspired and create your own version of this journey.
          </p>

          <div className="trip-info">
            <div>
              <strong>📅</strong>
              <span>{itinerary.dates}</span>
            </div>

            <div>
              <strong>👥</strong>
              <span>{itinerary.travelers} Travelers</span>
            </div>

            <div>
              <strong>💰</strong>
              <span>{itinerary.budget}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content */}
      <main className="shared-container">

        {/* Overview */}
        <section className="overview-card">

          <div>
            <h2>Trip Overview</h2>
            <p>
              Explore the best of Paris with a mix of iconic landmarks,
              culture, food, shopping and relaxing experiences.
            </p>
          </div>

          <button className="copy-main-btn" onClick={handleCopyTrip}>
            📋 Copy This Trip
          </button>

        </section>

        {/* Itinerary */}
        <section className="itinerary-section">

          <div className="section-heading">
            <div>
              <h2>Itinerary</h2>
              <p>Read-only view of the complete trip plan</p>
            </div>
          </div>

          {days.map((day, index) => (
            <div className="day-card" key={index}>

              <div className="day-header">
                <div>
                  <span className="day-number">{day.day}</span>
                  <h3>{day.date}</h3>
                </div>

                <span className="activity-count">
                  {day.activities.length} Activities
                </span>
              </div>

              <div className="timeline">

                {day.activities.map((activity, activityIndex) => (
                  <div className="timeline-item" key={activityIndex}>

                    <div className="timeline-time">
                      {activity.time}
                    </div>

                    <div className="timeline-dot"></div>

                    <div className="activity-card">

                      <div className="activity-top">
                        <h4>{activity.title}</h4>

                        <span className="activity-type">
                          {activity.type}
                        </span>
                      </div>

                      <p>{activity.description}</p>

                    </div>

                  </div>
                ))}

              </div>

            </div>
          ))}

        </section>

        {/* Share Section */}
        <section className="share-section">

          <div className="share-icon">🔗</div>

          <div>
            <h2>Love this trip?</h2>
            <p>
              Copy this itinerary and customize it for your own journey.
            </p>
          </div>

          <button onClick={handleCopyTrip}>
            Copy Trip
          </button>

        </section>

      </main>

      {/* Footer */}
      <footer className="shared-footer">
        <p>
          Created with ❤️ using TripPlanner
        </p>

        <div>
          <span>Public Trip</span>
          <span>•</span>
          <span>Read Only</span>
        </div>
      </footer>

    </div>
  );
};

export default SharedItinerary;