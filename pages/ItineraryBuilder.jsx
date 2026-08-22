<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Itinerary Builder</title>
    <link rel="stylesheet" href="css/itinerary.css">
</head>
<body>

    <header class="navbar">
        <div class="logo">Trip<span>Planner</span></div>

        <nav>
            <a href="#">Dashboard</a>
            <a href="#">My Trips</a>
            <a href="itinerary-view.html">Itinerary</a>
        </nav>

        <div class="profile">DR</div>
    </header>

    <main class="container">

        <div class="page-header">
            <div>
                <p class="small-title">CREATE YOUR TRIP</p>
                <h1>Itinerary Builder</h1>
                <p class="subtitle">
                    Add cities, dates and activities to build your perfect trip.
                </p>
            </div>

            <button class="primary-btn" onclick="addStop()">
                + Add Stop
            </button>
        </div>

        <div id="stopsContainer"></div>

        <div class="bottom-actions">
            <button class="secondary-btn" onclick="saveTrip()">
                Save Trip
            </button>

            <button class="primary-btn" onclick="continueToView()">
                View Itinerary →
            </button>
        </div>

    </main>

    <script src="js/itinerary.js"></script>
</body>
</html>