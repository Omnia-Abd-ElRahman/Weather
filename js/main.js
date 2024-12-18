let weather = document.getElementById('weather');
let search = document.getElementById('search');

let arrWeather = [];

async function getData(country = 'cairo') {
    weather.innerHTML = "<p>Loading...</p>";
    try { 
        let d = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cea9fcae54c04e5c875114706240812&q=${country}&days=3`);
        d = await d.json();

        let locationName = d.location.name;
        let forecastData = d.forecast.forecastday;
        let current=d.current;
        let condition=d.condition;

        arrWeather = { locationName, forecastData,current,condition };

        console.log(arrWeather); 

        createWeatherTemplate();
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weather.innerHTML = "<p>Error fetching weather data. Please try again later.</p>";
    }
}

function createWeatherTemplate() {
    if (!arrWeather || arrWeather.forecastData.length === 0) {
        weather.innerHTML = "<p>No weather data available.</p>";
        return;
    }

    let date = new Date();
    let day = date.toLocaleString('en-US', { weekday: 'long' });
    let month = date.toLocaleString('en-US', { month: 'long' });
    let dayOfMonth = date.getDate();
    date.setDate(date.getDate() + 1);
    let dayNext = date.toLocaleString('en-US', { weekday: 'long' });
    date.setDate(date.getDate() + 1);
    let dayNext2 = date.toLocaleString('en-US', { weekday: 'long' });

    
    weather.innerHTML = `
        <div class="col-md-12 col-lg-4 text-white">
            <div class="today_weather">
                <div class="today_header d-flex justify-content-between" id="today">
                    <div class="day">${day}</div>
                    <div class="date">${dayOfMonth} ${month}</div>
                </div>
                <div class="content_today" id="current">
                    <div class="location">${arrWeather.locationName}</div> 
                    <div class="degree d-flex">
                        <div class="num me-5">
                            ${arrWeather.forecastData[0].day.maxtemp_c}<sup>o</sup>C
                        </div>
                        <div class="weather_icon">
                            <img src="https:${arrWeather.forecastData[0].day.condition.icon}" alt="${arrWeather.forecastData[0].day.condition.text}" class="mt-3 w-100">
                        </div>
                    </div>
                    <div class="custom">${arrWeather.forecastData[0].day.condition.text}</div>
                    <span class="me-4">
                        <img src="./images/icon-umberella@2x.png" alt="" class="me-2">
                        ${arrWeather.forecastData[0].day.daily_chance_of_rain}%
                    </span>
                    <span class="me-4">
                        <img src="./images/icon-wind@2x.png" alt="" class="me-2">
                        ${arrWeather.forecastData[0].day.maxwind_kph} km/h
                    </span>
                    <span class="me-4">
                        <img src="./images/icon-compass@2x.png" alt="" class="me-2">
                        ${arrWeather.current.wind_dir}
                    </span>
                </div>
            </div>
        </div>

        <div class="col-md-12 col-lg-4 text-white">
            <div class="second_today text-center">
                <div class="today_header text-center" id="today">
                    <div class="day">${dayNext}</div>
                </div>
                <div class="content_today" id="current">
                    <div class="weather_icon">
                        <img src="https:${arrWeather.forecastData[1].day.condition.icon}" alt="${arrWeather.forecastData[1].day.condition.text}" class="mt-3">
                    </div>
                    <div class="degree d-flex flex-column align-items-center justify-content-center">
                        <div class="num">
                            ${arrWeather.forecastData[1].day.maxtemp_c}<sup>o</sup>C
                        </div>
                        <p>
                            ${arrWeather.forecastData[1].day.mintemp_c}<sup>o</sup>C
                        </p>
                    </div>
                    <div class="custom">${arrWeather.forecastData[1].day.condition.text}</div>
                </div>
            </div>
        </div>

        <div class="col-md-12 col-lg-4 text-white">
            <div class="third_today text-center">
                <div class="today_header text-center" id="today">
                    <div class="day">${dayNext2}</div>
                </div>
                <div class="content_today" id="current">
                    <div class="weather_icon">
                        <img src="https:${arrWeather.forecastData[2].day.condition.icon}" alt="${arrWeather.forecastData[2].day.condition.text}" class="mt-3">
                    </div>
                    <div class="degree d-flex flex-column align-items-center justify-content-center">
                        <div class="num">
                            ${arrWeather.forecastData[2].day.maxtemp_c}<sup>o</sup>C
                        </div>
                        <p>
                            ${arrWeather.forecastData[2].day.mintemp_c}<sup>o</sup>C
                        </p>
                    </div>
                    <div class="custom">${arrWeather.forecastData[2].day.condition.text}</div>
                </div>
            </div>
        </div>
    `;
}
search.addEventListener('input', (e) => {
    let country = e.target.value.trim();
    if (country.length > 2) {
        getData(country);  
    } else if(country.length === 0){
        getData(lastSearch); 
    }
});
window.onload = function() {
    getData();
};

