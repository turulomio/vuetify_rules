import moment from 'moment-timezone'

// Rounds num or return null if can't do it
export function my_round(num, decimals = 2) {
    if (typeof num != "number" || isNaN(num)) return null
    return Math.round(num*Math.pow(10, decimals))/Math.pow(10, decimals)
}


// Value es un utc iso string with T and Z
export function localtime(value){
    if (typeof value!='string') return ""
    if ( moment(value,moment.ISO_8601).isValid()==false) return ""
    if (value.split("-").length!=3) return ""
    if (value.split(":").length!=3) return ""
    if (value.includes("T")==false) return ""
    if (value.endsWith("Z")==false) return ""
    if (value){
        var dateFormat = 'YYYY-MM-DD HH:mm:ss';
        var testDateUtc = moment(value,moment.ISO_8601);
        var localDate = testDateUtc.tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
        return (localDate.format(dateFormat)); // 2015-30-01 02:00:00
    }
    return null;
}   

export function capitalizeFirstLetter(value) {
    if (typeof value!='string') throw TypeError(f("I can't capitalize a non string: [0]", [typeof value,]))
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

export function parseNumber(value){
    if (typeof value==='number') return value
    if (typeof value!=='string') return NaN
    if (value.includes(",") && value.includes(".")) return NaN //1.222,2334   1,222.22223
    value = value.toString().replace(",", '.');
    return parseFloat(value);
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

export function isDatetimeAwareIsoString(s){
    if (typeof s!="string") return false
    if (s.split("-").length!=3) return false
    if (s.split(":").length!=3) return false
    if (s.includes("T")==false) return false
    if (s.endsWith("Z")==false) return false
    if ( moment(s, moment.ISO_8601).isValid()==false) return false 
    return true

}

export function yesterday_in_isostring(){
    // Get the current date
    let currentDate = new Date();

    // Subtract one day (86400000 milliseconds = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    let previousDate = new Date(currentDate.getTime() - 86400000);

    // Convert to ISO string
    return previousDate.toISOString().split('T')[0];
}



export function sortObjectsArray(objectsArray, sortKey)
{
    // Quick Sort:
    var retVal;

    if (1 < objectsArray.length)
    {
        var pivotIndex = Math.floor((objectsArray.length - 1) / 2);  // middle index
        var pivotItem = objectsArray[pivotIndex];                    // value in the middle index
        var less = [], more = [];

        objectsArray.splice(pivotIndex, 1);                          // remove the item in the pivot position
        objectsArray.forEach(function(value)
        {
            value[sortKey] <= pivotItem[sortKey] ?                   // compare the 'sortKey' proiperty
                less.push(value) :
                more.push(value) ;
        });

        retVal = sortObjectsArray(less, sortKey).concat([pivotItem], sortObjectsArray(more, sortKey));
    }
    else
    {
        retVal = objectsArray;
    }
    
    return retVal;
}

export function arrayobjects_to_stringofstrings(l, key){
    var s=""
    l.forEach(o => s=s+o[key].toString() + ", ")
    return s.slice(0,-2)
}


export function arrayofintegers_to_stringofintegers(l){
    var s=""
    l.forEach(o => s=s+o.toString() + ", ")
    return s.slice(0,-2)
}


export function stringofintegers_to_arrayofintegers(s,separator=", "){
    var l=[]
    s.split(separator).forEach(o => l.push(parseInt(o)))
    return l
}


export function arrayobjects_to_array(l, key){
    var s=[]
    l.forEach(o => s.push(o[key]))
    return s
}


export function percentage_generic_string(num, locale, decimals=2){
    if (num==null || isNaN(num)) return "- - - %"
    return `${my_round(num*100,decimals).toLocaleString(locale,{ minimumFractionDigits: decimals,  })} %`
}

export function percentage_generic_html(num, locale, decimals=2){
    if (num==null){
        return percentage_generic_string(num,locale,decimals)
    }

    if (num>=0){
        return `<span>${percentage_generic_string(num, locale, decimals)}</span>`
    } else {
        return `<span class='vuered'>${percentage_generic_string(num, locale, decimals)}</span>`
    }
}


// Find the maximum number of decimal places
export function listobjects_maxdecimals(lo, key){
    let maxDecimals = 0;
    lo.forEach(o => {
        const decimalPart = o[key].toString().split('.')[1];
        if (decimalPart) {
        maxDecimals = Math.max(maxDecimals, decimalPart.length);
        }
    });
    return maxDecimals

}

// Sums values in a lo respecting the max number of decimals
export function listobjects_sum(lo,key,decimals=null){
    if (lo.length==0) return 0
    if (decimals==null) decimals=listobjects_maxdecimals(lo,key)
    return my_round(lo.reduce((accum,item) => accum + item[key], 0), decimals)
}

export function listobjects_average_ponderated(lo,key1, key2){
    var prod=0;
    var total=0;
    var i;
    for (i = 0; i < lo.length; i++) {
        prod=prod+lo[i][key1]*lo[i][key2]
        total=total+lo[i][key2]
    } 
    return prod/total
}

// file is the value of v-file-input. La funcion donde se pone la función debe ser async y para recibir valor const l= await getBase64(file)
// Returns an object with image in base64, jsimage, and mime parameters
export function getBase64(file) {
    // Returns a promise which gets resolved or rejected based on the reader events
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // Sets up even listeners BEFORE you call reader.readAsDataURL
        reader.onload = function () {
            const result = reader.result
            var r={
                jsimage: result,
                image: result.split(",")[1],
                mime: result.split(";base64,")[0].split(":")[1],
            }
            return resolve(r)
        };
        reader.onerror = function (error) {
            return reject(error);
        };
        // Calls reader function
        reader.readAsDataURL(file);
    })
}

export function getArrayFromMap(catalog){
    //Catalog is a map
    return Array.from(catalog).map(([,value]) => (value))
    
}

export function age_today(birth_iso_string) {
    return age_in_a_date(birth_iso_string, new Date().toISOString())
}

export function age_in_a_date(birth_iso_string, date_iso_string) {
    //The magic number: 31557600000 is 24 * 3600 * 365.25 * 1000 
    // ~~ Math.floor  
    var birth = new Date(birth_iso_string)
    var date = new Date(date_iso_string)
    if (birth.getDate()==date.getDate() && birth.getMonth()==date.getMonth()){ // To avoid decimal errors in birthday
        return date.getFullYear()-birth.getFullYear()
    } else {
        return ~~((date - birth ) / (31557600000));
    }
}