import moment from 'moment-timezone'

// Rounds num or return null if can't do it
export function my_round(num, decimals = 2) {
    if (typeof num != "number" || isNaN(num)) return null
    return Math.round(num*Math.pow(10, decimals))/Math.pow(10, decimals)
}


// Value es un utc iso string with T and Z
export function localtime(value){
    if (typeof value!='string') return null
    if ( moment(value,moment.ISO_8601).isValid()==false) return null
    if (value.split("-").length!=3) return null
    if (value.split(":").length!=3) return null
    if (value.includes("T")==false) return null
    if (value.endsWith("Z")==false) return null
    if (value){
        var dateFormat = 'YYYY-MM-DD HH:mm:ss';
        var testDateUtc = moment(value,moment.ISO_8601);
        var localDate = testDateUtc.tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
        return (localDate.format(dateFormat)); // 2015-30-01 02:00:00
    }
    return null;
}   

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export function parseNumber(strg){
    strg = strg.toString().replace(',', '.');
    return parseFloat(strg);
}


export function ifnullempty(value){
    if (value==null) return ""
    return value
}

export function isNullOrEmpty(n){
    if (n==="") return true
    if (n===0) return false
    if (n===null) return true
    return false
}

//Returns if it's a Number, with required attribute
export function isNumber(n){
    return typeof n === 'number' && isFinite(n);

}

export function isNumberWithRequired(n,required){
    var r=false
    if (required==true){
        if (isNumber(n)) r= true
    } else {
        if (isNullOrEmpty(n) || isNumber(n)) r= true
    }
    return r
}


//Returns if it's a Number with max digits, with required attribute
export function isNumberMaxDigitsWithRequired(n,required,maxdigits){
    if (required==true){
        if (isNumberWithRequired(n,required) && n.toString().length<=maxdigits) return true
    } else { //required false
        if (isNullOrEmpty(n))  return true
        if (isNumberWithRequired(n,required) && n.toString().length<=maxdigits) return true
    }
    return false
}

    
//Counts the number of decimals of a number
export function countDecimals (n) {
    if (isNaN(n)) return 0
    if(Math.floor(n) === n) return 0;
    var arr=String(n).split(".")
    if (arr.length!=2) return 0
    return n.toString().split(".")[1].length || 0; 
}
    
export function translate(s){
    if (this==undefined){
        return s
    } 
    return this.$t(s)
}

export function f(s, params=[]){
    return s.replace(/\[(\d+)\]/g, (match, index) => {
        return typeof params[index] !== 'undefined' ? params[index] : match;
    });
}

// Returns if string has this format 'YYYY-mm-DD'
export function isDateIsoString(s){
    if (typeof s!="string") return false
    if (s.split("-").length!=3) return false
    if ( moment(s, moment.ISO_8601).isValid()==false) return false 
    return true

}
export function isStringWithMaxDigits(s,mindigits,maxdigits){
    if (typeof s!="string") return false
    if (s.length<mindigits || s.length>maxdigits) return false
    return true
}
// Returns if string has this format '2016-10-10T15:35:52.764Z'
export function isDatetimeAwareIsoString(s){
    if (typeof s!="string") return false
    if (s.split("-").length!=3) return false
    if (s.split(":").length!=3) return false
    if (s.includes("T")==false) return false
    if (s.endsWith("Z")==false) return false
    if ( moment(s, moment.ISO_8601).isValid()==false) return false 
    return true

}
