import {considerClouds} from "./clouds.js";
import {considerRain} from "./rain.js";
import {considerSnow} from "./snow.js";

import * as fxwrapper from "../fxwrapper.js";
import * as utils from "../../lib/utils.js";
import * as lib from "../../lib/lib.js";


var result = {}
var last_hour = 0
var last_precipitation = null
var last_dungeon_precipitation = null

var outside_weather_enabled = true
var dungeon_weather_enabled = false
var morning_fog_enabled = true
var lightning_enabled = true

var hot_temp_thresh = 85
var cold_temp_thresh = 35


export async function updateWeather(data){
    
    var hour = data["date"]["hour"]
    if (hour > last_hour || hour == 0){
        last_hour = hour
    } else {
        // console.log("WeatherSync return.");
        return
    }
    


    initWeather();

    var effectFlags = (await canvas.scene.getFlag("fxmaster", "effects")) ?? {};
    var filterFlags = (await canvas.scene.getFlag("fxmaster", "filters")) ?? {};

    // console.log("WeatherSync updateWeather.");
    // console.log("WeatherSync filterFlags." + JSON.stringify(filterFlags));
    // console.log("WeatherSync flags." + JSON.stringify(effectFlags));

    var results_html = game.settings.get('weather-control', 'weatherData')
    // console.log("WeatherSync results_html." + JSON.stringify(results_html));
    var precipitation = results_html.precipitation.toLowerCase()
    var temp = results_html.temp
    // console.log("WeatherSync precipitation: " + precipitation);


    var rain = {}
    var snow = {}
    var clouds = {}
    var lightning = {}
    var snowstorm = {}
    var fog = {}
    var brightness = {max: 1, min: 1}

    var birds = {}
    var crows = {}
    var eagles = {}
    var bats = {}
    var rats = {}
    var spiders = {}


    if (outside_weather_enabled){
        if (precipitation == last_precipitation && randomNumber(0,1) > 0.2){
            result = considerRain(precipitation);
        } else if (precipitation != last_precipitation) {
            last_precipitation = precipitation
            result = considerRain(precipitation);
        }

        rain = isObjectEmpty(result["rain"]) ? rain : result["rain"]
        clouds = isObjectEmpty(result["clouds"]) ? clouds : result["clouds"]
        lightning = isObjectEmpty(result["lightning"]) ? lightning : result["lightning"]
        brightness = isObjectEmpty(result["brightness"]) ? brightness : result["brightness"]
        snow = isObjectEmpty(result["snow"]) ? snow : result["snow"]
        fog = isObjectEmpty(result["fog"]) ? fog : result["fog"]
        snowstorm = isObjectEmpty(result["snowstorm"]) ? snowstorm : result["snowstorm"]

        birds = isObjectEmpty(result["birds"]) ? birds : result["birds"]
        crows = isObjectEmpty(result["crows"]) ? crows : result["crows"]
        eagles = isObjectEmpty(result["birds"]) ? eagles : result["eagles"]
        bats = isObjectEmpty(result["bats"]) ? eagles : result["bats"]

        considerEffect(effectFlags, rain, "rain")    
        considerEffect(effectFlags, snow, "snow")
        considerEffect(effectFlags, snowstorm, "snowstorm")
        considerEffect(effectFlags, clouds, "clouds")
        considerEffect(effectFlags, birds, "birds")
        considerEffect(effectFlags, crows, "crows")
        considerEffect(effectFlags, bats, "bats")
        considerEffect(effectFlags, eagles, "eagles")

        if (lightning_enabled){
            considerFilter(filterFlags, lightning, 'lightning')
        }

        if (morning_fog_enabled && isObjectEmpty(fog)){
            if (temp < 60 && temp > cold_temp_thresh){
               var fog_percent = considerFog(data);
                var fog = {scale: 1, speed: 1, lifetime: 0.2, density: fog_percent}
                if (fog_percent <= 0.01){
                    fog = {}
                }            
            }
        }

        considerEffect(effectFlags, fog, "fog")
    }

    if (dungeon_weather_enabled){
        if (precipitation == last_dungeon_precipitation && randomNumber(0,1) > 0.2){
            result = considerDungon();
        } else if (precipitation != last_dungeon_precipitation) {
            last_dungeon_precipitation = precipitation
            result = considerDungon();
        }

        brightness = isObjectEmpty(result["brightness"]) ? brightness : result["brightness"]
        fog = isObjectEmpty(result["fog"]) ? fog : result["fog"]
        clouds = isObjectEmpty(result["clouds"]) ? clouds : result["clouds"]
        spiders = isObjectEmpty(result["spiders"]) ? birds : result["spiders"]
        rats = isObjectEmpty(result["rats"]) ? birds : result["rats"]

        considerEffect(effectFlags, fog, "fog")
        considerEffect(effectFlags, clouds, "clouds")
        considerEffect(effectFlags, spiders, "spiders")
        considerEffect(effectFlags, rats, "rats")
    }
    
    considerSunlight(data, brightness)   
    considerTemprature(temp, filterFlags)

}

function considerTemprature(temp, filterFlags){
    var tempFilter = {}
    var bloomFilter = {}
    console.log("temp " + temp)

    if (temp > hot_temp_thresh){
        var hot_max = 120
        var hot_min  = hot_temp_thresh
        var hot_percent = (100/(hot_max-hot_min)) * (temp-hot_min)
        var hotness = oneDecimalPLace(lerp(0,1, hot_percent*0.01))
        // console.log("hot_percent " + hot_percent)        
        // console.log("HOT " + hotness)
        // HOT
        tempFilter = {
            color: {value:"#FFBA7A", apply:true},
            saturation: 1+hotness,
            contrast: "1.1",
            brightness: "1.1",         
            gamma: 1+hotness
        }

        bloomFilter = {
            blur: 2,
            bloomScale: 0.5,
            threshold: 0.1
        }
    } else if (temp < cold_temp_thresh) {
        // Cold
        // console.log("COLD")
        tempFilter = {
            color: {value:"#7ABAFF", apply:true},
            saturation: "2",
            contrast: "1.1",
            brightness: "1.1",         
            gamma: "2"
        }

        bloomFilter = {
            blur: 0.01,
            bloomScale: 0.5,
            threshold: 0.1
        }
    } else {
        console.log("NEUTRAL")
    }

    
    considerFilter(filterFlags, tempFilter, 'color')
    considerFilter(filterFlags, bloomFilter, 'bloom')
}


function considerFog(data){
    var hour = data["date"]["hour"]
    var minute = data["date"]["minute"]
    

    const fog_fadein_start = 260
    const fog_fadein_finish = 420
    var max_fog = 0.3
    const fog_fadeout_start = 480
    const fog_fadeout_finish = 540

    var mins_into_day = 60*hour + minute
    var percent = 100

    if (mins_into_day >= fog_fadein_start && mins_into_day <= fog_fadein_finish){
        // fog_fadein 
        percent = 100/(fog_fadein_finish-fog_fadein_start) * (mins_into_day-fog_fadein_start)
        percent = 100-percent
    } else if (mins_into_day >= fog_fadeout_start && mins_into_day <= fog_fadeout_finish){
        // fog_fadeout 
        percent = 100/(fog_fadeout_finish-fog_fadeout_start) * (mins_into_day-fog_fadeout_start)
    } else {
        if (mins_into_day >= fog_fadein_finish && mins_into_day < fog_fadeout_start){
            // console.log("MAX FOG")
            percent = 0
        } else if (mins_into_day >= fog_fadeout_finish ){
            // console.log("no FOG")
            percent = 100
        }
    }

    var perc = 1-(percent*0.01)     
    perc = lerp(0, max_fog, perc)
    perc = Math.round((perc + Number.EPSILON) * 100) / 100
    return perc
}

function considerSunlight(data, brightness){
    var hour = data["date"]["hour"]
    var minute = data["date"]["minute"]
    

    const sunrise_start = 300
    const sunrise_finish = 420

    const sunset_start = 1080
    const sunset_finish = 1260

    var min_darkness = 1-randomNumber(brightness.min, brightness.max)


    var mins_into_day = 60*hour + minute
    var percent = 0

    if (mins_into_day >= sunrise_start && mins_into_day <= sunrise_finish){
        // sunrise 
        percent = 100/(sunrise_finish-sunrise_start) * (mins_into_day-sunrise_start)
        percent = 100-percent
    } else if (mins_into_day >= sunset_start && mins_into_day <= sunset_finish){
        // sunset 
        percent = 100/(sunset_finish-sunset_start) * (mins_into_day-sunset_start)
    } else {
        // day/night
        if (hour >= 21 || hour < 5){
            // night 
            percent = 100
        } else {
            percent = 0
        }
    }

    percent = limitNumberWithinRange(percent)
    percent = percent*0.01
    var modded_percent = lerp(min_darkness, 1, percent)
    canvas.scene.update({darkness: modded_percent}, {animateDarkness: true})
}


