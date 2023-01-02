var opts = {
    method: "POST",
    mode: "no-cors",
    redirect: "follow", 
    referrer: "no-referrer"
};

var dateTell = new Date();

var fullFeedbackurl = "https://docs.google.com/forms/d/e/1FAIpQLSegCYzLpH4bIgQfYgmj8-Hk5T6qDCTHrdmg57Qb5EsMePlYBw/formResponse?usp=pp_url&entry.1948324434="+dateTell;


window.onload = function() {
    fetch(fullFeedbackurl, opts)
        .then(function(response) {
            console.log("Success fetch");
        })
        .catch(function(error) {
            console.log("Unsuccess fetch");
        });
};
