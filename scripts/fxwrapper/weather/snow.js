
export function considerSnow(precipitation){
    let snow = {}
    let clouds = {}

    if (precipitation.includes("icestorm today") || precipitation.includes("blizzard")){
        snow = {
            scale: 1,
            Direction: 90,
            speed: 1,
            lifetime: 0.4,
            density: 1
        }

        clouds = {
            scale: 1,
            Direction: 90,
            speed: 1,
            lifetime: 0.4,
            density: 0.03,
            Tint: "#ffffff"
        }

        brightness = {max: 80, min: 60}
    }

    if (precipitation.includes("large amount of snowfall today")){
        snow = {
            scale: 1,
            Direction: 90,
            speed: 1,
            lifetime: 0.4,
            density: 1
        }
    }

    if (precipitation.includes("large amount of freezing rain today.")){
        snow = {
            scale: 1,
            Direction: 90,
            speed: 1,
            lifetime: 0.4,
            density: 1
        }
    }

    if (precipitation.includes("a light to moderate amount of snow today.")){
        snow = {
            scale: 1,
            Direction: 90,
            speed: 1,
            lifetime: 0.4,
            density: 1
        }
    }

    if (precipitation.includes("completely overcast with some snow flurries possible.")){
        snow = {
            scale: 1,
            Direction: 90,
            speed: 1,
            lifetime: 0.4,
            density: 1
        }
    }

    return {snow: snow, clouds: clouds}
}