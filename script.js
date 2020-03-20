        //event listener, define variables
window.addEventListener("load", () => {
    var long;
    var lat;
    var temperatureDescription = document.querySelector(".temp-description");
    var temperatureDegree = document.querySelector(".degrees");
    var locationTimezone = document.querySelector(".location-timezone");
    var temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

        //get users location for data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          long = position.coords.longitude;
          lat = position.coords.latitude;  

          //define weather api
          var queryURL = "https://api.darksky.net/forecast/d888ee01f3533778c91d396059eed1b8/${lat},${long}";
          
          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
          });
      

          //get data request
          fetch(api)
          .then(response => {
              return response.json();
          })
          .then(data => {
              console.log(data);   
            const { temperature, summary } = data.currently; 
            //set DOM Elements from the API to dashboard
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            //formula to turn F to C
            var celsius = (temperature - 32) * (5 / 9);

            //change temp to Celsius/Far with click
            temperatureSection.addEventListener('click', () =>{
                if(temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);  
                }else{
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
            });
          });
        });
    }
}); 