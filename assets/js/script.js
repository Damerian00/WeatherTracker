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
let sunny = "assets/img/day_clear.png";
let cloudy = "assets/img/cloudy.png";
let rain = "assets/img/rain.png";
let today = moment();

init();


function init(){
    let t = moment().format('MMMM Do YYYY');
    document.querySelector('.currentDay').innerHTML = t;
    let d1 = today.add(1, "days").format('MMMM Do YYYY');
    let d2 = today.add(1, "days").format('MMMM Do YYYY');
    let d3 = today.add(1, "days").format('MMMM Do YYYY');
    let d4 = today.add(1, "days").format('MMMM Do YYYY');
    let d5 = today.add(1, "days").format('MMMM Do YYYY');
    cards.children[0].children[0].innerHTML = d1;
    cards.children[1].children[0].innerHTML = d2;
    cards.children[2].children[0].innerHTML = d3;
    cards.children[3].children[0].innerHTML = d4;
    cards.children[4].children[0].innerHTML = d5;

}
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
var today = moment();
$("#1a").text(today.format("MMM Do, YYYY"));
var gradDate =today.format("MMM Do, YYYY");
$("#1a").text(gradDate);
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
    for (let i = 1; i < 7; i++) {
        let humid = weatherArray.daily[i].humidity;
        let wind = weatherArray.daily[i].wind_speed;
        let precip = weatherArray.daily[i].weather[0].main;
        let temperature = weatherArray.daily[i].temp.day;
        let h = weatherArray.daily[0].humidity;
        let w = weatherArray.daily[0].wind_speed;
        let t = weatherArray.daily[0].temp.day;
        let u = weatherArray.daily[0].uvi;
        tempHTML.innerHTML = ` ${t} &#8457`;t;
        windHTML.innerHTML =` ${w} MPH`; w;
        humidHTML.innerHTML =` ${h} %`;
        uVIHTML.innerHTML = u;
        if (u <= 2){
            uVIHTML.style.backgroundColor = "green";
        } else if (u >= 3 && u <= 5){
            uVIHTML.style.backgroundColor = "yellow";
        }else if (u >= 6 && u <= 7){
            uVIHTML.style.backgroundColor = "Orange";
        } else{
            uVIHTML.style.backgroundColor = "red";
        }
        //  console.log("Humidity: " + humid);
        //  console.log(wind);
        //  console.log(speed);
        //  console.log(deg);
        //  console.log(gust);
        //  console.log(precip);
        //  console.log("Temp: " + temperature);
        // cards.children[i].children[0].innerHTML = datey;
        cards.children[i-1].children[1].children[1].children[0].innerHTML = ` ${temperature}&#8457`;
        cards.children[i-1].children[1].children[2].children[0].innerHTML = ` ${wind}MPH`;
        cards.children[i-1].children[1].children[3].children[0].innerHTML = ` ${humid}%`;
        if (precip == "Rain"){
            cards.children[i-1].children[1].children[0].src = rain;    
            document.querySelector('.jumboImg').src = rain;
        } else if (precip == "Clouds"){
            cards.children[i-1].children[1].children[0].src = cloudy;
            document.querySelector('.jumboImg').src = cloudy;
        } else {
            cards.children[i-1].children[1].children[0].src = sunny;
            document.querySelector('.jumboImg').src = sunny;
        }
        // cards.children[i+1].children[1].children[1].children[0].innerHTML = 
    }

   

}

wChecker.addEventListener('submit', formSubmitHandler);