
function limitNumberWithinRange(num, min, max){
    const MIN = min || 0;
    const MAX = max || 100;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}

function randomNumber(min, max) { 
    return Math.random() * (max - min) + min;
}

function lerp (value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
}

function variantNumber(number, variant_range){
    var num = number + randomNumber(-variant_range, variant_range)
    num = Math.round((num + Number.EPSILON) * 10) / 10
    return num
}

function oneDecimalPLace(number){
    return Math.round((number + Number.EPSILON) * 10) / 10
}