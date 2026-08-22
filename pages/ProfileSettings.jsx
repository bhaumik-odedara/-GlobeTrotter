import React, { useState } from "react";
import "../styles/ProfileSettings.css";

const ProfileSettings = () => {
  const [user, setUser] = useState({
    name: "Dhruvi Rana",
    email: "dhruvi@example.com",
    language: "English",
    photo: null,
  });

  const [savedDestinations] = useState([
    "Paris, France",
    "Dubai, UAE",
    "Tokyo, Japan",
    "Manali, India",
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUser({
        ...user,
        photo: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    alert("Profile updated successfully!");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (confirmDelete) {
      alert("Account deletion request submitted.");
    }
  };

  return (
    <div className="settings-page">

      {/* Page Header */}
      <div className="settings-header">
        <div>
          <h1>Profile & Settings</h1>
          <p>Manage your profile, preferences and privacy.</p>
        </div>
      </div>

      <div className="settings-container">

        {/* Profile Section */}
        <section className="settings-card">
          <div className="card-title">
            <h2>Profile Information</h2>
            <p>Update your personal information.</p>
          </div>

          <div className="profile-photo-section">

            <div className="profile-photo">
              {user.photo ? (
                <img src={user.photo} alt="Profile" />
              ) : (
                <span>DR</span>
              )}
            </div>

            <div className="photo-info">
              <h3>Profile Photo</h3>
              <p>JPG, PNG or JPEG. Maximum size 2MB.</p>

              <label className="upload-btn">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  hidden
                />
              </label>
            </div>

          </div>

          <form onSubmit={handleSave}>

            <div className="form-grid">

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

            </div>

            <button type="submit" className="save-btn">
              Save Changes
            </button>

          </form>
        </section>

        {/* Preferences Section */}
        <section className="settings-card">

          <div className="card-title">
            <h2>Preferences</h2>
            <p>Customize your travel planning experience.</p>
          </div>

          <div className="form-group language-group">

            <label>Language Preference</label>

            <select
              name="language"
              value={user.language}
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Gujarati">Gujarati</option>
            </select>

          </div>

        </section>

        {/* Saved Destinations */}
        <section className="settings-card">

          <div className="card-title">
            <h2>Saved Destinations</h2>
            <p>Your favorite travel destinations.</p>
          </div>

          <div className="destination-list">

            {savedDestinations.map((destination, index) => (
              <div className="destination-item" key={index}>

                <div className="destination-icon">
                  📍
                </div>

                <div className="destination-info">
                  <h3>{destination}</h3>
                  <p>Saved destination</p>
                </div>

                <button className="remove-btn">
                  Remove
                </button>

              </div>
            ))}

          </div>

        </section>

        {/* Privacy / Delete Account */}
        <section className="settings-card danger-card">

          <div className="card-title">
            <h2>Privacy & Account</h2>
            <p>Manage your account and personal data.</p>
          </div>

          <div className="delete-account">

            <div>
              <h3>Delete Account</h3>

              <p>
                Permanently delete your account and all your saved
                trips, destinations and personal information.
              </p>
            </div>

            <button
              className="delete-btn"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>

          </div>

        </section>

      </div>
    </div>
  );
};

export default ProfileSettings;