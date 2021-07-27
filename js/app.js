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

let location_button = $('#location-id');
let city_name = location_button.text().split(',',1)[0];
let weather_url = "https://api.openweathermap.org/data/2.5/weather?q="+city_name+"&appid=89ee35f2d09eab65ae74f03ada741468&units=metric"

axios.get(weather_url)
    .then(function (response) {
        putValuesInHTML(response);
    })
    .catch(function (error) {
        console.log(error);
    });

location_button.on('click', function (){
    showWeatherInfo();
});

function putValuesInHTML( {data} ){
    const city_name_span = $('#city-name-span');

    const temp_span = $('#temp-span');
    const feels_like_span = $('#feels_like-span');
    const humidity_span = $('#humidity-span');
    const pressure_span = $('#pressure-span');
    const wind_speed_span = $('#wind-speed-span');
    const wind_dir_span = $('#wind-dir-span');
    const weather_span = $('#weather-span');

    const {
        name,
        main: {
            temp, feels_like, humidity, pressure
        },
        wind: {
            speed, deg
        },
        weather: {
            0: {
                main
            }
        }
    } = data;

    city_name_span.text(name);

    temp_span.text(temp+"℃");
    feels_like_span.text(feels_like+"℃");
    humidity_span.text(humidity+"%");
    pressure_span.text(pressure+"hPa");
    wind_speed_span.text(speed+"m/sec");
    wind_dir_span.text(degreeToText(parseInt(deg)));
    weather_span.text(main);
}

function degreeToText(degree){
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
    const weather_div = $('#weather-div-id');
    weather_div.show('slow');
    weather_div.delay(5000).hide('slow');
}