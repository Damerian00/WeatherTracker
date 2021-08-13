let apiKey = "bc5c1e90bc58d68be94eff3ea7ee1d3b";
let wChecker = document.querySelector("#wSearch");
let queryUrl;
let cINput;
let weatherArray;
let cityName = document.querySelector('#cityName');
let tempHTML = document.querySelector('#temp');
let windHTML = document.querySelector('#wind');
let humidHTML = document.querySelector('#humid');
let uVIHTML = document.querySelector('#uVI');
let lat;
let long;


/* dt_txt: "2021-08-13 21:00:00"
main: {temp: 308.49, feels_like: 312.71, temp_min: 308.49, temp_max: 309.1, pressure: 1016, …}
main:
    feels_like: 312.71
    grnd_level: 994
    humidity: 45
    pressure: 1016
    sea_level: 1016
    temp: 308.49
    temp_kf: -0.61
    temp_max: 309.1
    temp_min: 308.49
wind: {speed: 2.59, deg: 175, gust: 3.1}


*/

let formSubmitHandler = function (event) {
    event.preventDefault();
    let qCity = document.querySelector('#criteria');
    qCity = qCity.value;
    console.log(qCity);
    queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${qCity}&appid=${apiKey}`;
    fetch(queryUrl)
    .then(headers => headers.json())
    .then(weatherData => {
        console.log(weatherData)
        weatherArray = weatherData;
        cINput = qCity;
        console.log(weatherArray);
    /*weatherArray.city.name
    let humid = weatherArray.list[0].main.humidity;
    let wind = weatherArray.list[0].wind;
    let deg = wind.deg;
    let gust - wind.gust;
    let speed = wind.speed;


    let temperature = weatherArray.list[0].main.temp
    (( temp - 273.15) * 9/5) + 32
    */
        setValues();
    })
    // let invalidSearch = document.querySelector('.invalidSearch');
    //     if ((response.status === 404) && invalidSearch.getAttribute(visibility, "hidden")){
    //         let z = invalidSearch.setAttribute(visibility, "visible");
            
    //     }
    
    // .then(if (response.status === 404){
        
    //   })
      // Use a conditional to check the response status.
      // If that status equals the conditional, then redirect to the 404 page.
   
  }

  function setValues (){
    
    cityName.innerHTML = cINput;
  }

wChecker.addEventListener('submit', formSubmitHandler);