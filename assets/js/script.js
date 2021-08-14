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
let cards = document.querySelector('.cards');


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
    cINput = qCity;
    queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${qCity}&appid=${apiKey}&units=imperial`;
    // fetch(queryUrl)
    // .then(headers => headers.json())
    // .then(weatherData => {
    //     console.log(weatherData)
    //     weatherArray = weatherData;
    //     cINput = qCity;
    //     console.log(weatherArray);
    /*.city.cord.lat
    .city.cord.lon
    */
    fetch(queryUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(weatherData => {
                    let lat = weatherData.city.coord.lat;
                    let lon = weatherData.city.coord.lon;
                    weatherArray = weatherData;
                    queryUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
                    return fetch(queryUrl);
                })
                .then(function (weatherData) {
                            if (weatherData.ok) {
                                weatherData.json()
                                .then(weatherData => {
                                   weatherArray = weatherData;
                                   setValues();
            }   
                    )    }
                        })   
             }
                })
         
        
   

       
/*weatherArray.city.name
let precip = weatherArray.list[0].weather[0].main;
let date = weatherArray.list[i].dt_text.format(mm/dd/yyyy);
let temperature = weatherArray.list[0].main.temp
(( temp - 273.15) * 9/5) + 32
*/

// let invalidSearch = document.querySelector('.invalidSearch');
//     if ((response.status === 404) && invalidSearch.getAttribute(visibility, "hidden")){
    //         let z = invalidSearch.setAttribute(visibility, "visible");

    //     }

    // .then(if (response.status === 404){

        //   })
        // Use a conditional to check the response status.
        // If that status equals the conditional, then redirect to the 404 page.
        
    }

function setValues() {
    cityName.innerHTML = cINput;
    console.log(weatherArray)
    for (let i = 1; i < 7; i++) {
        let humid = weatherArray.daily[i].humidity;
        let wind = weatherArray.daily[i].wind_speed;
        let precip = weatherArray.daily[i].weather[0].main;
        let temperature = weatherArray.daily[i].temp.day;
        //  console.log("Humidity: " + humid);
        //  console.log(wind);
        //  console.log(speed);
        //  console.log(deg);
        //  console.log(gust);
        //  console.log(precip);
        //  console.log("Temp: " + temperature);
        // cards.children[i].children[0].innerHTML = datey;
        cards.children[i-1].children[1].children[1].children[0].innerHTML = ` ${temperature}  &#8457`;
        cards.children[i-1].children[1].children[2].children[0].innerHTML = ` ${wind} MPH`;
        cards.children[i-1].children[1].children[3].children[0].innerHTML = ` ${humid} %`;
        // cards.children[i+1].children[1].children[1].children[0].innerHTML = 
    }
    let h = weatherArray.daily[0].humidity;
    let w = weatherArray.daily[0].wind_speed;
    let t = weatherArray.daily[0].temp.day;
    let u = weatherArray.daily[0].uvi;


}

wChecker.addEventListener('submit', formSubmitHandler);