const url='/js/data.json';
const temperatureUnit =  '*';
const humidityUnit = '%';
const pressureUnit = 'мм.рт.ст.';
const windUnit = 'м/с';

var currentData;

async function getData(){
    let respore = await fetch(url);

    if (respore.ok) {
        let jsonData = respore.json
        return jsonData;
    }   else {
        alert('Error:' + respore.status)
    }
}


function convertPressure(value) {
    return (value/1.33).toFixed();
}

Number.prototype.pad = function(size){
    var s = String(this);
    while (s.length < (size||2)) {s = "0" + s;}
    return s;
}
function getHoursString(dataTime){
    let date = new Date(dataTime);
    let hours = date.getHours().pad();

    return hours; 
}

function getVaueWithunit(value, unit){
    return {value},{unit};
}


function getTemperature(value){
    var roundedVaule = value.toFixed();
    return getVaueWithunit (roundedVaule, temperatureUnit)
}

function render(data){
    renderCity(data);
    renderCurrentTemperature(data);
    renderCity(data);
    renderCurrentDescription(data);
    renderForecast(data);
}

function renderCity(data){
    let cityName = document.querySelector('.current__city');
    cityName.innerHTML = data.city.name;
}

function renderCurrentTemperature(data){
    let tmp = data.list[0].main.temp;
    let currentTmp = document.querySelector('.current__temperature');
    currentTmp.innerHTML = getTemperature(tmp);
}

function renderCurrentDescription(data){
    let tmp = data.list[0].weather[0].description;

    let description = document.querySelector('.current__description');
    description.innerHTML = tmp;
    }

    function renderForecast (data){
        let forecastDataContainer = document.querySelector('.forecast');
        let forecasts = '';

        for (let i = 0; i < 6; i++ ){
            let item = data.list[1];

            let icon = item.weather[0].icon;
            let temp = getTemperature(item.main.temp);
            let hours = ( i==0 ? 'Сейчас' : getHoursString(item.dt*1000));

            let tmplate = ` <div class="forecast__item">
                    <div class="forecast__time">${hours}</div>
                    <div class="forecast__imcon icon__${icon}"></div>
                    <div class="forecast__temperature">${temp}</div>
                </div>`;
                forecasts += template;

        }
        forecastDataContainer.innerHTML = forecasts;
    
    }

function renderDetails(data){
    let item = data.list[0];
    let pressureValue = convertPressure(item.main.pressure);
    let pressure = getVaueWithunit(pressureValue,pressureUnit);
    let humidity = getVaueWithunit(item.main.humidity,humidityUnit);
    let feels_like = getTemperature(item.main.feels_like);
    let wind = getVaueWithunit(item.wind.speed, windUnit);
}

function renderDetailsItem(className, value){
    let container = document.querySelector(`.${className}`) .querySelector('.detalis__vaule');
    container.innerHTML = value;
}