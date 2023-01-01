function isEmptyObject(data) {
    if(Object.keys(data).length == 0)
    return true
}

function isValidName(name){
    return /^[a-zA-Z ]{2,30}$/.test(name)
}
module.exports = {isEmptyObject, isValidName}