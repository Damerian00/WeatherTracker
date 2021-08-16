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
let searchResults =[];
let invalidS = document.querySelector('.invalidSearch');
let visi = invalidS.getAttribute("data-visibility");
let rQ = document.querySelector('#recentQueries');

init();
initDays();


function init (){
    if (localStorage.getItem("City") != null) {
         searchResults = JSON.parse(localStorage.getItem("City"));
        
     
        // // if (rQ.children[].length != null){
        // //     for (let i = 0; i < rQ.children().length; i++) {
        // //         rQ.children[0].remove();
                
        // //     }

        // }

         for (i = 0; i < searchResults.length && i < 8; i++) {
             JSON.parse(localStorage.getItem("searchResults"));
             let theResult = searchResults[i];
               let p = document.createElement("p");
               p.classList = "query p-2 bg-secondary text-light text-center";
               p.innerHTML = theResult;
               rQ.appendChild(p);
             
            
         } 
        }
}
function initDays(){
    let t = today.format('MMMM Do YYYY');
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



let formSubmitHandler = function (event) {
    event.preventDefault();
    let qCity = document.querySelector('#criteria');
    qCity = qCity.value;
    cINput = qCity;
    searchResults.push(cINput);
    queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${qCity}&appid=${apiKey}&units=imperial`;
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
                                   if (visi === "hidden"){
                                     invalidS.setAttribute("data-visibility" , "hidden");
                                     invalidS.style.visibility = "hidden";
                                                                    }         
                                   setValues();
            }   
                    )    }
                })   
                    }else{
                        
                        if (visi === "hidden"){
                            invalidS.setAttribute("data-visibility" , "visible");
                            invalidS.style.visibility = "visible";
                        }
                        
                    }
                })
                
               
   

        
    }

function setValues() {
    cityName.innerHTML = cINput;
    let newPi = cityName.innerHTML;
    let p = document.createElement("p");
    p.classList = "query p-2 bg-secondary text-light text-center";
    p.innerHTML = newPi;
    rQ.appendChild(p);
    for (let i = 1; i < 6; i++) {
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
        
    }
    localStorage.setItem("City", JSON.stringify(searchResults));
    // init();

}

wChecker.addEventListener('submit', formSubmitHandler);
document.querySelectorAll('.query').forEach(item => {
    item.addEventListener('click', event => {
        let theText = event.target;
        document.querySelector('#criteria').value = theText.innerHTML;
      })
});