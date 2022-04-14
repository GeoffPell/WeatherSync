function delay(ms) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

function isObjectEmpty(obj){
    if (obj == null){
        return true;
    }

    if (Object.keys(obj).length == 0){
        return true;
    }
    
    return false;
}