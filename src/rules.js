// IMPORTANT
// v-text-field can't be type="number" it doesn't recognized alpha characters
// v-model.number can be used


// TO improve readibility I will emule rules behavier
// Rules returns [] when everything is ok, returns a ['comment'] to show error



import {
    isNullOrEmpty,
    isNumber,
    isNumberMaxDigitsWithRequired,
    countDecimals,
    isDateIsoString,
    isDatetimeAwareIsoString,
    isStringWithMaxDigits,
    f,
    i18n,
} from "../index.js"



// console.log(i18n)
// i18n.t("HOLA")

export function RulesInteger(maxdigits,required){
    var r
    if (required==false){
        r= [
            v => (isNullOrEmpty(v) || isNumberMaxDigitsWithRequired(v,required,maxdigits)) || i18n.t('Field can be empty or a number with [0] digits at most',[maxdigits]),
            v => (isNullOrEmpty(v) || isNumber(v) && countDecimals(v)<=0) || i18n.t('Must be an integer number'),
        ]
    } else { // required==true
        r= [
            v => isNumberMaxDigitsWithRequired(v,required,maxdigits)|| i18n.t('Field must be a number with at most [0] digits', [maxdigits]),
            v => countDecimals(v)<=0 || i18n.t('Must be an integer number'),
        ]
    }
    return r
}


// If required==true must be 0 or a number
// If required==false can be null,
export function RulesFloat (maxdigits, required, maxdecimals){
    var r
    if (required==false){
        r= [
            v => (isNullOrEmpty(v) || isNumberMaxDigitsWithRequired(v,required,maxdigits)) || i18n.t('Field can be empty or a number with [0] digits at most', [maxdigits]),
            v => (isNullOrEmpty(v) || isNumber(v) && countDecimals(v)<=maxdecimals) || i18n.t('Must be a number with [0] decimals places at most', [maxdecimals]),
        ]
    } else { // required==true
        r= [
            v => isNumberMaxDigitsWithRequired(v,required,maxdigits)|| i18n.t('Field must be a number with at most [0] digits', [maxdigits]),
            v => countDecimals(v)<=maxdecimals || i18n.t('Must be a number with [0] decimals places at most', [maxdecimals]),
        ]
    }
    return r
}
//Float Greaater Zero
export function RulesFloatGZ (maxdigits, required, maxdecimals){
    var r
    if (required==false){
        r= [
            v => (isNullOrEmpty(v) || isNumberMaxDigitsWithRequired(v,required,maxdigits)) || i18n.t('Field can be empty or a number with [0] digits at most', [maxdigits]),
            v => (isNullOrEmpty(v) || (isNumber(v) && v>0)) || i18n.t('Must be a number greater than zero'),
            v => (isNullOrEmpty(v) || (isNumber(v) && countDecimals(v)<=maxdecimals)) || i18n.t('Must be a number with [0] decimals places at most', [maxdecimals]),
        ]
    } else { // required==true
        r= [
            v => isNumberMaxDigitsWithRequired(v,required,maxdigits)|| i18n.t('Field must be a number with at most [0] digits', [maxdigits]),
            v => v>0 || i18n.t('Must be a number greater than zero'),
            v => countDecimals(v)<=maxdecimals || i18n.t('Must be a number with [0] decimals places at most', [maxdecimals]),
        ]
    }
    return r
}
//Number Greater Equal Zero
export function RulesFloatGEZ (maxdigits, required, maxdecimals){
    var r
    if (required==false){
        r= [
            v => (isNullOrEmpty(v) || isNumberMaxDigitsWithRequired(v,required,maxdigits)) || i18n.t('Field can be empty or a number with [0] digits at most', [maxdigits]),
            v => (isNullOrEmpty(v) || isNumber(v) && v>=0) || i18n.t('Must be a number greater than zero'),
            v => (isNullOrEmpty(v) || isNumber(v) && countDecimals(v)<=maxdecimals) || i18n.t('Must be a number with [0] decimals places at most', [maxdecimals]),
        ]
    } else { // required==true
        r= [
            v => isNumberMaxDigitsWithRequired(v,required,maxdigits)|| i18n.t('Field must be a number with at most [0] digits', [maxdigits]),
            v => v>=0 || i18n.t('Must be a number greater than zero'),
            v => countDecimals(v)<=maxdecimals || i18n.t('Must be a number with [0] decimals places at most', [maxdecimals]),
        ]
    }
    return r
}
export function RulesFloatLEZ(maxdigits, required, maxdecimals){
    var r
    if (required==false){
        r= [
            v => (isNullOrEmpty(v) || isNumberMaxDigitsWithRequired(v,required,maxdigits)) || i18n.t('Field can be empty or a number with [0] digits at most', [maxdigits]),
            v => (isNullOrEmpty(v) || isNumber(v) && v<=0) || i18n.t('Must be a number greater than zero'),
            v => (isNullOrEmpty(v) || isNumber(v) && countDecimals(v)<=maxdecimals) || i18n.t('Must be a number with [0] decimals places at most', [maxdecimals]),
        ]
    } else { // required==true
        r= [
            v => isNumberMaxDigitsWithRequired(v,required,maxdigits)|| i18n.t('Field must be a number with at most [0] digits', [maxdigits]),
            v => v<=0 || i18n.t('Must be a number greater than zero'),
            v => countDecimals(v)<=maxdecimals || i18n.t('Must be a number with [0] decimals places at most', [maxdecimals]),
        ]
    }
    return r
}

export function RulesDateIsoString(required){
    var error=i18n.t("Field must be a string representig a date in iso format")
    var r
    if (required==true){
        r= [
            v => (!isNullOrEmpty(v) && isDateIsoString(v))|| error,
        ]
    } else {
        r= [
            v => (isNullOrEmpty(v) || isDateIsoString(v))|| error,
        ]
    }

    return r
}


export function RulesDatetimeAwareIsoString(required){
    var error=i18n.t("Field must be a string representig a date time with timezone in iso format")
    var r
    if (required==true){
        r= [
            v => (!isNullOrEmpty(v) && isDatetimeAwareIsoString(v))|| error,
        ]
    } else {
        r= [
            v => (isNullOrEmpty(v) || isDatetimeAwareIsoString(v))|| error,
        ]
    }

    return r
}



export function RulesDatetime(required){
    console.log("Deprecated, will remove in 2024-03-01: RulesDatetime should change to RulesDatetimeAwareIsoString")
    var r= [
        v => (!!v) || i18n.t('You must select date and time'),
    ]
    if (required==false){
        r.shift()
    }
    return r
}
export function RulesDate(required){
    console.log("Deprecated, will remove in 2024-03-01: RulesDate should change to RulesDateIsoString")
    var r= [
            v => (!!v) || i18n.t("You must select a date"),
        ]
    if (required==false){
        r.shift()
    }
    return r
}



// Si required=true no puede ser ni null ni ""
export function RulesString(maxdigits,required){
    var error_required=i18n.t("Field must be a string with at most [0] characters", [maxdigits])
    var error_not_required=i18n.t("Field must be empty or a string with at most [0] characters", [maxdigits])
    var r

    i18n.t("String must be empty or at most [0] characters", [maxdigits])
    if (required==true){
        r= [
            v => (!isNullOrEmpty(v) && isStringWithMaxDigits(v,1,maxdigits))|| error_required,
        ]
    } else {
        r= [
            v => (isNullOrEmpty(v) || isStringWithMaxDigits(v,0,maxdigits))|| error_not_required,
        ]
    }
    return r
}

// Si required=true no puede ser ni null ni ""
export function RulesPassword(maxdigits,required){
    var error_required=i18n.t("Field must be a string between 8 and [0] characters", [maxdigits])
    var error_not_required=i18n.t("Field must be empty or a string between 8 and [0] characters", [maxdigits])
    var r
    if (required==true){
        r= [
            v => (!isNullOrEmpty(v) && isStringWithMaxDigits(v,8,maxdigits))|| error_required,
        ]
    } else {
        r= [
            v => (isNullOrEmpty(v) || isStringWithMaxDigits(v,8,maxdigits))|| error_not_required,
        ]
    }
    return r
}

export function RulesSelection(required){
    var r= []
    if (required==true){
        r.push((v) => !!v || i18n.t('Selection is required'))
    }
    return r
}
export function RulesEmail(required){

    var r=  [
        v => !!v || i18n.t('Email is required'),
        v => /.+@.+/.test(v) || i18n.t('Invalid Email address') 
    ]
    if (required==false){
        r.shift()
    }
    return r
}

