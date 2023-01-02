var opts = {
    method: "POST",
    mode: "no-cors", // Google will only submit a form if "mode" is "no-cors"
    redirect: "follow", 
    referrer: "no-referrer"
};

var fullFeedbackurl = "https://docs.google.com/forms/d/e/1FAIpQLSegCYzLpH4bIgQfYgmj8-Hk5T6qDCTHrdmg57Qb5EsMePlYBw/viewform?usp=pp_url&entry.1948324434=blabla";

window.onload = function() {
    fetch(fullFeedbackurl, opts)
        .then(function(response) {
            console.log("Success fetch");
        })
        .catch(function(error) {
            console.log("Unsuccess fetch");
        });
};

