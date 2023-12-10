"use strict"

function isNullOrEmpty(n){
    if (n==="") return true
    if (n===0) return false
    if (n===null) return true
    return false
}
module.exports= isNullOrEmpty