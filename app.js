const inputBox = document.querySelector('.search-box input');
const searchBtn = document.getElementById('btn');
const description = document.getElementById('description');
const weatherImage = document.getElementById('weather-img');
const cTemp = document.getElementById('c-temp');
const minTemp = document.getElementById('min-temp');
const maxTemp = document.getElementById('max-temp');
const humidity = document.getElementById('humidity');
const windspeed = document.getElementById('wind-speed');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

// function api(city){
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4a8dfc4a3102029ff115a45eea4b6b6c`).then(response=>response.json()).then(data=>console.log(data));
// }
// api();



function convertUnixTimeToDigitalTime(unixTimestamp) {
    // Create a new Date object using the Unix timestamp (in milliseconds)
    const date = new Date(unixTimestamp * 1000);

    // Get the hours, minutes, and seconds from the Date object
    const hours = date.getHours().toString().padStart(2, '0'); // Ensure two-digit format
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two-digit format
  
    // Concatenate hours, minutes, and seconds with ':' separator
    const digitalTime = `${hours}:${minutes}`;

    return digitalTime;
}

async function checkWeather(city){
    const apiKey = '4a8dfc4a3102029ff115a45eea4b6b6c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(url).then(response=>response.json()).then(json => {
        const img = document.querySelector('.weather-img');
        console.log(json);
       
        switch(json.weather[0].main){
            case "Clouds":
                img.src = './img/cloud.png';
                break;
            case "Clear":
                img.src = './img/clear.png';
                break;
            case "Rain" :
                img.src = './img/rain.png';
                break;
            case "Haze" :
                img.src = './img/mist.png';
                break;
            case "Snow" :
                img.src = './img/snow.png';
                break;
            // default :
            //     img.src = './img/snow.png';
                    
            }
        description.innerText = json.weather[0].main; 
        cTemp.innerText = Math.round(json.main.temp-273.15);
        minTemp.innerText = Math.round(json.main.temp_min-273.15);
        maxTemp.innerText = Math.round(json.main.temp_max-273.15);
        humidity.innerText = json.main.humidity; 
        windspeed.innerText = json.wind.speed; 
        sunrise.innerText = convertUnixTimeToDigitalTime(json.sys.sunrise);
        sunset.innerText = convertUnixTimeToDigitalTime(json.sys.sunset);
        
    }   )
} 
        
        
searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
    
});
// checkWeather("raipur");
