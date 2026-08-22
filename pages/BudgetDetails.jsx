import React from "react";
import "./BudgetDetails.css";

const BudgetDetails = () => {
  return (
    <div className="details-page">
      <div className="details-header">
        <div>
          <p className="small-text">EXPENSE DETAILS</p>
          <h1>Where Your Money Goes</h1>
          <p>
            A detailed view of your trip expenses by category.
          </p>
        </div>

        <button className="download-btn">
          Download Report
        </button>
      </div>

      {/* Chart Section */}
      <div className="details-content">

        {/* Pie Chart */}
        <div className="chart-card">
          <h2>Expense Distribution</h2>

          <div className="pie-chart">
            <div className="pie-center">
              <strong>₹48,500</strong>
              <span>Total</span>
            </div>
          </div>

          <div className="legend">
            <div>
              <span className="legend-dot transport"></span>
              Transport
              <strong>₹12,000</strong>
            </div>

            <div>
              <span className="legend-dot stay"></span>
              Stay
              <strong>₹18,000</strong>
            </div>

            <div>
              <span className="legend-dot activities"></span>
              Activities
              <strong>₹8,500</strong>
            </div>

            <div>
              <span className="legend-dot meals"></span>
              Meals
              <strong>₹10,000</strong>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="summary-card">
          <h2>Budget Summary</h2>

          <div className="summary-item">
            <span>Total Budget</span>
            <strong>₹60,000</strong>
          </div>

          <div className="summary-item">
            <span>Estimated Cost</span>
            <strong>₹48,500</strong>
          </div>

          <div className="summary-item">
            <span>Remaining</span>
            <strong className="green">₹11,500</strong>
          </div>

          <div className="summary-item">
            <span>Average / Day</span>
            <strong>₹6,929</strong>
          </div>

          <div className="budget-status">
            <span>✓</span>
            <div>
              <strong>You're on track</strong>
              <p>Your trip is currently within budget.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Table */}
      <div className="expense-section">
        <h2>Expense Details</h2>

        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Estimated</th>
              <th>Percentage</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>🚆 Transport</td>
              <td>₹12,000</td>
              <td>25%</td>
              <td><span className="status-safe">On Track</span></td>
            </tr>

            <tr>
              <td>🏨 Stay</td>
              <td>₹18,000</td>
              <td>37%</td>
              <td><span className="status-safe">On Track</span></td>
            </tr>

            <tr>
              <td>🎯 Activities</td>
              <td>₹8,500</td>
              <td>18%</td>
              <td><span className="status-warning">Watch</span></td>
            </tr>

            <tr>
              <td>🍴 Meals</td>
              <td>₹10,000</td>
              <td>20%</td>
              <td><span className="status-safe">On Track</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetDetails;