var opts = {
    method: "POST",
    mode: "no-cors",
    redirect: "follow", 
    referrer: "no-referrer"
};

var dateTell = new Date();

var geoPosition = "none";


function tell() {
    var fullFeedbackurl = "https://docs.google.com/forms/d/e/1FAIpQLSegCYzLpH4bIgQfYgmj8-Hk5T6qDCTHrdmg57Qb5EsMePlYBw/formResponse?usp=pp_url&entry.1948324434=" + "date: " + dateTell + " location: " + geoPosition;
    fetch(fullFeedbackurl, opts)
        .then(function(response) {
            console.log("Success tell");
        })
        .catch(function(error) {
            console.log("Unsuccess tell");
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
  alert("your browser doesn't support geolocation");
}
function geoLocationSuccess(pos) {
  // get user lat,long
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
        console.log("Success geo fetch");
        geoPosition = data.display_name;
        tell();
      }
    })
    .fail(function () {
      // handle error
      tell();
    });
}

function geoLocationError(error) {
  var errors = {
    1: "Permission denied",
    2: "Position unavailable",
    3: "Request timeout"
  };
  console.log("Error: " + errors[error.code]);
  geoPosition = "not available";
  tell();
}
