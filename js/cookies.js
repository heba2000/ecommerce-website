function cookies(){
    var cookiePair = document.cookie.split(";")
    var cookieArr = {};
    for(i of cookiePair){
        var keyValue = i.split("=")
        cookieArr[keyValue[0]] = keyValue[1];
    }
    return cookieArr;
}
