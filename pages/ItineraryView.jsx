<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Itinerary View</title>
    <link rel="stylesheet" href="css/itinerary.css">
</head>
<body>

    <header class="navbar">
        <div class="logo">Trip<span>Planner</span></div>

        <nav>
            <a href="#">Dashboard</a>
            <a href="#">My Trips</a>
            <a href="itinerary-builder.html">Edit Trip</a>
        </nav>

        <div class="profile">DR</div>
    </header>

    <main class="container">

        <div class="page-header">
            <div>
                <p class="small-title">YOUR TRIP</p>
                <h1>My Itinerary</h1>
                <p class="subtitle">
                    Review your complete day-wise travel plan.
                </p>
            </div>

            <a href="itinerary-builder.html" class="primary-btn">
                + Edit Itinerary
            </a>
        </div>

        <div class="trip-summary">
            <div>
                <span class="summary-label">Trip Duration</span>
                <strong id="tripDuration">0 Days</strong>
            </div>

            <div>
                <span class="summary-label">Cities</span>
                <strong id="cityCount">0</strong>
            </div>

            <div>
                <span class="summary-label">Activities</span>
                <strong id="activityCount">0</strong>
            </div>

            <div>
                <span class="summary-label">Total Cost</span>
                <strong id="totalCost">₹0</strong>
            </div>
        </div>

        <div class="view-controls">
            <button id="listBtn" class="toggle-btn active"
                onclick="showListView()">
                ☰ List
            </button>

            <button id="calendarBtn" class="toggle-btn"
                onclick="showCalendarView()">
                ▦ Calendar
            </button>
        </div>

        <div id="itineraryContainer"></div>

    </main>

    <script src="js/itinerary.js"></script>
</body>
</html>