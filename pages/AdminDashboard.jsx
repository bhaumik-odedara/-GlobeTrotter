import "./AdminDashboard.css";

import React from "react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      icon: "👥",
      change: "+12.5%",
    },
    {
      title: "Total Trips",
      value: "3,562",
      icon: "✈️",
      change: "+8.4%",
    },
    {
      title: "Popular Cities",
      value: "86",
      icon: "📍",
      change: "+5.2%",
    },
    {
      title: "Activities",
      value: "2,415",
      icon: "🎯",
      change: "+10.8%",
    },
  ];

  const topCities = [
    { city: "Paris", trips: 845 },
    { city: "Dubai", trips: 692 },
    { city: "London", trips: 574 },
    { city: "New York", trips: 489 },
    { city: "Tokyo", trips: 421 },
  ];

  const recentUsers = [
    {
      name: "Dhruvi Rana",
      email: "dhruvi@example.com",
      trips: 8,
      status: "Active",
    },
    {
      name: "Rahul Patel",
      email: "rahul@example.com",
      trips: 5,
      status: "Active",
    },
    {
      name: "Priya Shah",
      email: "priya@example.com",
      trips: 3,
      status: "Active",
    },
    {
      name: "Aarav Mehta",
      email: "aarav@example.com",
      trips: 2,
      status: "Inactive",
    },
  ];

  return (
    <div className="admin-page">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">TripPlanner</h2>

        <nav>
          <a href="/dashboard">🏠 Dashboard</a>
          <a href="/my-trips">✈️ My Trips</a>
          <a href="/admin" className="active">📊 Analytics</a>
          <a href="/profile">👤 Profile</a>
        </nav>

        <button className="logout-btn">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">

        {/* Header */}
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Monitor users, trips and platform activity.</p>
          </div>

          <div className="admin-user">
            <span>🔔</span>
            <span>Admin</span>
            <div className="admin-avatar">A</div>
          </div>
        </div>

        {/* Statistics */}
        <section className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-top">
                <span className="stat-icon">{stat.icon}</span>
                <span className="stat-change">{stat.change}</span>
              </div>

              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          ))}
        </section>

        {/* Analytics */}
        <section className="analytics-grid">

          {/* Trip Analytics */}
          <div className="analytics-card">
            <div className="card-header">
              <div>
                <h2>Trips Created</h2>
                <p>Monthly trip creation overview</p>
              </div>

              <select>
                <option>2026</option>
                <option>2025</option>
              </select>
            </div>

            <div className="chart">
              <div className="chart-bar" style={{ height: "45%" }}>
                <span>Jan</span>
              </div>

              <div className="chart-bar" style={{ height: "60%" }}>
                <span>Feb</span>
              </div>

              <div className="chart-bar" style={{ height: "52%" }}>
                <span>Mar</span>
              </div>

              <div className="chart-bar" style={{ height: "75%" }}>
                <span>Apr</span>
              </div>

              <div className="chart-bar" style={{ height: "68%" }}>
                <span>May</span>
              </div>

              <div className="chart-bar" style={{ height: "88%" }}>
                <span>Jun</span>
              </div>

              <div className="chart-bar" style={{ height: "78%" }}>
                <span>Jul</span>
              </div>

              <div className="chart-bar" style={{ height: "95%" }}>
                <span>Aug</span>
              </div>
            </div>
          </div>

          {/* Top Cities */}
          <div className="analytics-card">
            <div className="card-header">
              <div>
                <h2>Top Cities</h2>
                <p>Most visited destinations</p>
              </div>
            </div>

            <div className="cities-list">
              {topCities.map((item, index) => (
                <div className="city-item" key={index}>
                  <div className="city-info">
                    <span className="city-rank">
                      {index + 1}
                    </span>

                    <span>{item.city}</span>
                  </div>

                  <strong>{item.trips}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Management */}
        <section className="users-section">

          <div className="section-heading">
            <div>
              <h2>User Management</h2>
              <p>Recently registered users</p>
            </div>

            <button className="view-btn">
              View All Users
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Trips</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {recentUsers.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <div className="user-name">
                        <div className="user-avatar">
                          {user.name.charAt(0)}
                        </div>
                        {user.name}
                      </div>
                    </td>

                    <td>{user.email}</td>

                    <td>{user.trips}</td>

                    <td>
                      <span
                        className={
                          user.status === "Active"
                            ? "status active-status"
                            : "status inactive-status"
                        }
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>
                      <button className="action-btn">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;