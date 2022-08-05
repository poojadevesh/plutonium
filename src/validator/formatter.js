// Module 3: src/validator/formatter.js
// - trim() : calls the trim function on a hardcoded string for example ‘ functionUp  ’
// - changetoLowerCase() : changes the case of the string to lower. [Call toLowerCase() on a hardcoded string]
// - changeToUpperCase() : changes the case of the string to upper case [Call toUpperCase() on a hardcoded string]

const letterfunc= function(){

    const data = "    hello everyone    "
    console.log(data.trim())
    console.log(data.toLowerCase())
    console.log(data.toUpperCase())
}

module.exports.letterfunc=letterfunc