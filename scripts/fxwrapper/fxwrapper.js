

// Weather ======================
function initWeather(){
    deActivateFilter("core_lightning");   
}

function considerEffect(flags, effect, effectName){    
    if (isObjectEmpty(effect) && isEffectActive(flags, effectName)){
        deActivateEffects(flags, effectName)
    } else if (!isObjectEmpty(effect)) {
        if (!isEffectActive(flags, effectName)){
            activateEffects(effect, effectName)
        } else if (effectIsDifferent(flags, effect)){
            updateEffects(effect, effectName)
        }
    }
}


function effectIsDifferent(flags, effect){
    var firstKeyValue = flags[Object.keys(flags)[0]]
    var options = firstKeyValue["options"]    

    if (JSON.stringify(options) != JSON.stringify(effect)){
        return true
    }
    return false
}

function isEffectActive(flags, effectName){
    if (isObjectEmpty(flags)){
        return false
    }

    var isActive = false
    Object.keys(flags).forEach(key => {
      if (flags[key]["type"] == effectName){
          isActive = true
      }
    })

    return isActive
}

function activateEffects(effect, effectName){
    Hooks.call("fxmaster.switchWeather", {
      name: effectName,
      type: effectName,
      options: effect
    });
}

function deActivateEffects(flags, effectName){
    if (isObjectEmpty(flags) || flags == null){
        return false
    }

    Object.keys(flags).forEach(key => {
      if (flags[key]["type"] == effectName){
          Hooks.call("fxmaster.switchWeather", {
            name: key,
            type: effectName
          });
      }
    })
}

function updateEffects(effect, effectName){
    Hooks.call("fxmaster.updateWeather", [{
        name: effectName,
        type: effectName,
        options: effect
      }]);
}
// END Weather ======================



// Filter ======================

function considerFilter(flags, filter, filterName){
    if (isObjectEmpty(filter) && isFilterActive(flags, filterName)){
        deActivateFilter(filterName)
    } else if (!isObjectEmpty(filter)) {
        if (!isFilterActive(flags, filterName)){
            activateFilter(filter, filterName)
        } else if (filterIsDifferent(flags, filter)){
            updateFilter(filter, filterName)
        }
    }
}

function activateFilter(effect, effectName){
    FXMASTER.filters.addFilter(effectName, effectName, effect);
}

function filterIsDifferent(flags, filter){
    var firstKeyValue = flags[Object.keys(flags)[0]]
    var options = firstKeyValue["options"]

    if (JSON.stringify(options) != JSON.stringify(filter)){
        return true
    }

    return false
}

function isFilterActive(flags, filterName){
    if (isObjectEmpty(flags)){
        return false
    }

    var isActive = false
    Object.keys(flags).forEach(key => {
      if (flags[key]["type"] == filterName){
        isActive = true
      }
    })

    return isActive
}


function deActivateFilter(filterName){
    FXMASTER.filters.removeFilter(filterName);
}

async function updateFilter(filter, filterName){
    // deActivateFilter(filterName)
    // activateFilter(filter, filterName)
}