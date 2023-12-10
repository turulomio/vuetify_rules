//import { RulesInteger } from "./src/rules";
// odule.exports={
//     RulesInteger
// }
// m

exports.isNullOrEmpty= function(n){
    if (n==="") return true
    if (n===0) return false
    if (n===null) return true
    return false
}