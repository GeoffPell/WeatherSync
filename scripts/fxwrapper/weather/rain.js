import * as lib from "../../lib/lib.js";

export function considerRain(precipitation){    
    var rain = {}
    var clouds = {}
    var brightness = {max: 1, min: 1}
    var lightning = {}
    var birds = {}
    var snow = {}
    var snowstorm = {}
    var fog = {}
    var wind = 0


    if (precipitation.includes("heavy rain")){
        wind =  Math.round(variantNumber(75, 30))

        rain = {
            scale: variantNumber(1.2, 0.4),
            direction: wind,
            speed: variantNumber(1.2, 0.5),
            lifetime: variantNumber(0.9, 0.2),
            density: variantNumber(1.1, 0.4),
        },

        clouds = {
            scale: variantNumber(3, 0.3),
            direction: wind,
            speed: variantNumber(1, 0.3),
            lifetime: variantNumber(0.5, 0.2),
            density: variantNumber(0.03, 0.01),
            Tint: "#0f0f0f"
        }

        // lightning = {frequency: 500, spark_duration: 300, brightness: 3}
        brightness = {max: 0.80, min: 0.60}
    }

    if (precipitation.includes("completely overcast; light drizzles possible.")){
        wind =  Math.round(variantNumber(75, 30))

        rain = {
            scale: variantNumber(3, 0.2),
            direction: wind,
            speed: variantNumber(0.5, 0.3),
            lifetime: variantNumber(1, 0.3),
            density: variantNumber(0.3, 0.6)
        }

        clouds = {
            scale: variantNumber(2, 0.3),
            direction: wind,
            speed: variantNumber(0.8, 0.3),
            lifetime: variantNumber(0.5, 0.2),
            density: variantNumber(0.03, 0.01),
            Tint: "#0f0f0f"
        }

        birds = {
            scale: 1.4,
            speed: 1,
            lifetime: 1,
            density: 0.0004
        }

        brightness = {max: 0.85, min: 0.65}
    }

    if (precipitation.includes("freezing rain")){
        wind =  Math.round(variantNumber(75, 30))

        rain = {
            scale: variantNumber(1, 0.2),
            direction: wind,
            speed: variantNumber(0.8, 0.3),
            lifetime: variantNumber(1, 0.3),
            density: variantNumber(0.2, 0.2)
        }

        snowstorm = {
            scale: variantNumber(1, 0.2),
            direction: wind,
            speed: variantNumber(0.8, 0.2),
            lifetime: variantNumber(0.3, 0.1),
            density: variantNumber(0.5, 0.3)
        }

        brightness = {max: 0.85, min: 0.70}
    }


    if (precipitation.includes("moderate freezing rain") || precipitation.includes("large amount of freezing rain today.")){
        wind =  Math.round(variantNumber(75, 30))

        rain = {
            scale: variantNumber(1, 0.2),
            direction: wind,
            speed: variantNumber(0.8, 0.3),
            lifetime: variantNumber(1, 0.3),
            density: variantNumber(0.3, 0.3)
        }

        snowstorm = {
            scale: variantNumber(0.8, 0.2),
            direction: wind,
            speed: variantNumber(0.7, 0.2),
            lifetime: variantNumber(0.3, 0.1),
            density: variantNumber(0.3, 0.3)
        }

        brightness = {max: 0.85, min: 0.70}
    }

    if (precipitation.includes("light to moderate rain")){
        wind =  Math.round(variantNumber(75, 30))

        rain = {
            scale: variantNumber(1, 0.2),
            direction: wind,
            speed: variantNumber(0.5, 0.3),
            lifetime: variantNumber(1, 0.3),
            density: variantNumber(0.3, 0.2)
        }

        clouds = {
            scale: variantNumber(2, 0.3),
            direction: wind,
            speed: variantNumber(1, 0.3),
            lifetime: variantNumber(0.5, 0.2),
            density: variantNumber(0.03, 0.01),
            Tint: "#0f0f0f"
        }

        birds = {
            scale: 1.4,
            speed: 1,
            lifetime: 1,
            density: 0.0001
        }

        brightness = {max: 0.85, min: 0.70}
    }

    if (precipitation.includes("light freezing rain possible")){
        wind =  Math.round(variantNumber(75, 30))

        rain = {
            scale: variantNumber(1, 0.2),
            direction: wind,
            speed: variantNumber(0.5, 0.3),
            lifetime: variantNumber(1, 0.3),
            density: variantNumber(0.3, 0.2)
        }

        snowstorm = {
            scale: variantNumber(0.6, 0.2),
            direction: wind,
            speed: variantNumber(0.5, 0.2),
            lifetime: variantNumber(0.5, 0.1),
            density: variantNumber(0.2, 0.2)
        }

        brightness = {max: 0.85, min: 0.70}
    }

    if (precipitation.includes("torrential rains today")){
        rain = {
            scale: variantNumber(1.2, 0.3),
            direction: Math.round(variantNumber(45, 30)),
            speed: variantNumber(1.2, 0.4),
            lifetime: variantNumber(0.8, 0.2),
            density: variantNumber(2.5, 1.5)
        }

        if (randomNumber(0,1) > 0.6){
            lightning = {frequency: 1400, spark_duration: 500, brightness: 3}
        }
        brightness = {max: 0.75, min: 0.60}
    }

    if (precipitation.includes("monsoon-like rainfall") ||
            precipitation.includes("tornado") ||
            precipitation.includes("volcano ")
            ){
            rain = {
                scale: variantNumber(1.0, 0.5),
                direction: Math.round(variantNumber(45, 30)),
                speed: variantNumber(1.2, 0.3),
                lifetime: variantNumber(0.5, 0.2),
                density: variantNumber(2.0, 0.5)
            }

            if (randomNumber(0,1) > 0.3){
                lightning = {frequency: 1100, spark_duration: 600, brightness: 3}
            }
            
            brightness = {max: 0.65, min: 0.50}
    }


    // Clouds

    if (precipitation.includes("clear sky today")){
        birds = {
            scale: 1.4,
            speed: 1,
            lifetime: 1,
            density: 0.0006
        }

        brightness = {max: 1, min: 1}
    }

    if (precipitation.includes("dark, smokey skies today")){
        clouds = {
            scale: variantNumber(2, 1.5),
            Direction: variantNumber(90, 30),
            speed: variantNumber(1, 0.5),
            lifetime: variantNumber(0.8, 0.5),
            density: variantNumber(0.06, 0.03),
            Tint: "#050505"
        }
        brightness = {max: 0.85, min: 0.70}
    }

    if (precipitation.includes("scattered clouds, but mostly clear today.")){
        clouds = {
            scale: variantNumber(1, 0.3),
            Direction: variantNumber(90, 30),
            speed: variantNumber(1, 0.3),
            lifetime: variantNumber(0.5, 0.2),
            density: variantNumber(0.04, 0.02),
            Tint: "#ffffff"
        }
        brightness = {max: 1, min: 0.80}
    }

    if (precipitation.includes("the sun is completely obscured by ash, possible ashfall today")){
        clouds = {
            scale: variantNumber(2, 1.5),
            direction: variantNumber(90, 30),
            speed: variantNumber(1, 0.5),
            lifetime: variantNumber(0.8, 0.5),
            density: variantNumber(0.06, 0.03),
            Tint: "#000000"
        }

        brightness = {max: 0.55, min: 0.4}
    }


    // Snow
    if (precipitation.includes("icestorm today") || precipitation.includes("blizzard")){
        wind = Math.round(variantNumber(180, 180))

        snowstorm = {
            scale: variantNumber(1.2, 0.4),
            direction: wind,
            speed: variantNumber(1.5, 1.4),
            lifetime: variantNumber(0.5, 0.3),
            density: variantNumber(1, 0.5),
        }

        clouds = {
            scale: variantNumber(1, 0.2),
            direction: wind,
            speed: variantNumber(1, 0.2),
            lifetime: variantNumber(0.5, 0.2),
            density: variantNumber(0.03, 0.01),
            Tint: "#ffffff"
        }

        fog = {
            scale: variantNumber(1, 0.2),
            direction: wind,
            speed: variantNumber(1, 1.2),
            lifetime: variantNumber(0.5, 0.2),
            density: variantNumber(0.05, 0.03),
            Tint: "#ffffff"
        }

        brightness = {max: 0.95, min: 0.60}
    }

    if (precipitation.includes("large amount of snowfall today")){
        snowstorm = {
            scale: variantNumber(1, 0.2),
            direction: variantNumber(90, 40),
            speed: variantNumber(1, 0.2),
            lifetime: variantNumber(0.5, 0.2),
            density: variantNumber(1, 0.2),
        }

        brightness = {max: 0.95, min: 0.80}
    }

    if (precipitation.includes("large amount of freezing rain today.")){
        snowstorm = {
            scale: variantNumber(1, 0.2),
            direction: variantNumber(90, 20),
            speed: variantNumber(1, 0.2),
            lifetime: variantNumber(0.4, 0.1),
            density: variantNumber(1, 0.2),
        }
    }

    if (precipitation.includes("a light to moderate amount of snow today.")){
        snow = {
            scale: variantNumber(1, 0.2),
            Direction: variantNumber(90, 20),
            speed: variantNumber(1, 0.2),
            lifetime: variantNumber(0.4, 0.2),
            density: variantNumber(1, 0.2),
        }
    }

    if (precipitation.includes("completely overcast with some snow flurries possible.")){
        snowstorm = {
            scale: variantNumber(1, 0.2),
            direction: variantNumber(90, 20),
            speed: variantNumber(0.5, 0.2),
            lifetime: variantNumber(0.4, 0.2),
            density: variantNumber(0.3, 0.6),
        }
    }


    return {rain: rain, clouds: clouds, brightness: brightness, lightning: lightning, birds: birds, snowstorm: snowstorm, snow: snow, fog: fog}
}




