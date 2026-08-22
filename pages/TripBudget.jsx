import React from "react";
import "./TripBudget.css";

const TripBudget = () => {
  return (
    <div className="budget-page">
      <div className="budget-header">
        <div>
          <p className="small-text">TRIP BUDGET</p>
          <h1>Trip Budget & Cost Breakdown</h1>
          <p className="subtitle">
            Keep track of your estimated expenses and stay within your budget.
          </p>
        </div>

        <button className="edit-budget-btn">Edit Budget</button>
      </div>

      {/* Total Budget Card */}
      <div className="budget-overview">
        <div className="total-card">
          <p>Total Estimated Cost</p>
          <h2>₹48,500</h2>
          <span>of ₹60,000 budget</span>

          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>

          <p className="remaining">₹11,500 remaining</p>
        </div>

        <div className="daily-card">
          <p>Average Cost / Day</p>
          <h2>₹6,929</h2>
          <span>7 days trip</span>
        </div>

        <div className="alert-card">
          <p>Budget Status</p>
          <h2>On Track</h2>
          <span>You're within your planned budget</span>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="section">
        <div className="section-header">
          <h2>Cost Breakdown</h2>
          <span>Estimated expenses</span>
        </div>

        <div className="cost-grid">
          <div className="cost-card">
            <div className="icon">🚆</div>
            <div>
              <p>Transport</p>
              <h3>₹12,000</h3>
              <span>25% of total</span>
            </div>
          </div>

          <div className="cost-card">
            <div className="icon">🏨</div>
            <div>
              <p>Stay</p>
              <h3>₹18,000</h3>
              <span>37% of total</span>
            </div>
          </div>

          <div className="cost-card">
            <div className="icon">🎯</div>
            <div>
              <p>Activities</p>
              <h3>₹8,500</h3>
              <span>18% of total</span>
            </div>
          </div>

          <div className="cost-card">
            <div className="icon">🍴</div>
            <div>
              <p>Meals</p>
              <h3>₹10,000</h3>
              <span>20% of total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Budget */}
      <div className="section">
        <div className="section-header">
          <h2>Daily Budget</h2>
          <span>Track your spending</span>
        </div>

        <div className="daily-list">
          <div className="day-row">
            <div>
              <strong>Day 1</strong>
              <span>Arrival & City Tour</span>
            </div>
            <div>
              <strong>₹5,800</strong>
              <small>Under budget</small>
            </div>
          </div>

          <div className="day-row">
            <div>
              <strong>Day 2</strong>
              <span>City Exploration</span>
            </div>
            <div>
              <strong>₹7,200</strong>
              <small>Under budget</small>
            </div>
          </div>

          <div className="day-row over-budget">
            <div>
              <strong>Day 3</strong>
              <span>Adventure Activities</span>
            </div>
            <div>
              <strong>₹9,800</strong>
              <small>⚠ Over budget</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripBudget;