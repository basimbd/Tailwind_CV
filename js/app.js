$(document).ready(function(){
    $('.js-up_down-indicator').click(function(){
        $(this).parent().parent().find('.js-expandable').slideToggle();
        if($(this).find('i').hasClass('fa-caret-up')){
            $(this).find('i').removeClass('fa-caret-up');
            $(this).find('i').addClass('fa-caret-down');
        }else if ($(this).find('i').hasClass('fa-caret-down')){
            $(this).find('i').removeClass('fa-caret-down');
            $(this).find('i').addClass('fa-caret-up');
        }
        //alert("Show");
    });

    $('.js-plus_minus-indicator').click(function(){
        $(this).parent().parent().find('.js-expandable-item').slideToggle();
        if($(this).find('i').hasClass('fa-plus')){
            $(this).find('i').removeClass('fa-plus').addClass('fa-minus');
            $(this).find('span').text("Hide Details ");
        }else if ($(this).find('i').hasClass('fa-minus')){
            $(this).find('i').removeClass('fa-minus').addClass('fa-plus');
            $(this).find('span').text("View Details ");
        }
    });
});

let location_button = document.getElementById('location-id');
let city_name = location_button.innerText.split(',',1)[0];
let weather_url = "https://api.openweathermap.org/data/2.5/weather?q="+city_name+"&appid=89ee35f2d09eab65ae74f03ada741468&units=metric"

axios.get(weather_url)
    .then(function (response) {
        //console.log(response);
        putValuesInHTML(response);
    })
    .catch(function (error) {
        console.log(error);
    });

location_button.addEventListener('click', function (){
    showWeatherInfo();
});

function putValuesInHTML(response){
    let city_name = document.getElementById('city-name-span');

    let temp = document.getElementById('temp-span');
    let feels_like = document.getElementById('feels_like-span');
    let humidity = document.getElementById('humidity-span');
    let pressure = document.getElementById('pressure-span');
    let wind_speed = document.getElementById('wind-speed-span');
    let wind_dir = document.getElementById('wind-dir-span');
    let weather = document.getElementById('weather-span');

    city_name.innerText = response.data.name;

    temp.innerText = response.data.main.temp+"\u2103"; //degree celsius symbol
    feels_like.innerText = response.data.main.feels_like+"\u2103";
    humidity.innerText = response.data.main.humidity+"%";
    pressure.innerText = response.data.main.pressure+"hPa";
    wind_speed.innerText = response.data.wind.speed+"m/sec";
    wind_dir.innerText = degreeToText(parseInt(response.data.wind.deg));
    weather.innerText = response.data.weather[0].main;
}

function  degreeToText(degree){
    if(degree>337.5) return 'North';
    if(degree>292.5) return 'North West';
    if(degree>247.5) return 'West';
    if(degree>202.5) return 'South West';
    if(degree>157.5) return 'South';
    if(degree>122.5) return 'South East';
    if(degree>67.5) return 'East';
    if(degree>22.5){return 'North East';}
    return 'North';
}

function showWeatherInfo(){
    let weather_div = $('#weather-div-id');
    weather_div.show('slow');
    weather_div.delay(5000).hide('slow');
}