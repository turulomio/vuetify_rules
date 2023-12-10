import { 
    isNullOrEmpty,
    localtime,
    capitalizeFirstLetter,
    parseNumber,
    ifnullempty,
    isNumber,
    isNumberWithRequired,
    isNumberMaxDigitsWithRequired,
    countDecimals,
    translate,
    isDateIsoString,
    isDatetimeAwareIsoString,
    isStringWithMaxDigits,
    f,
    my_round,
} from "./src/functions.js";

import { 
    RulesDate,
    RulesDateIsoString,
    RulesDatetime,
    RulesDatetimeAwareIsoString,
    RulesEmail,
    RulesFloat,
    RulesFloatGEZ,
    RulesFloatGZ,
    RulesFloatLEZ,
    RulesInteger,
    RulesPassword,
    RulesSelection,
    RulesString,
} from "./src/rules.js";

const vuetify_rules={
    isNullOrEmpty,
    localtime,
    capitalizeFirstLetter,
    parseNumber,
    ifnullempty,
    isNumber,
    isNumberWithRequired,
    isNumberMaxDigitsWithRequired,
    countDecimals,
    translate,
    isDateIsoString,
    isDatetimeAwareIsoString,
    isStringWithMaxDigits,
    f,
    my_round,
    RulesDate,
    RulesDateIsoString,
    RulesDatetime,
    RulesDatetimeAwareIsoString,
    RulesEmail,
    RulesFloat,
    RulesFloatGEZ,
    RulesFloatGZ,
    RulesFloatLEZ,
    RulesInteger,
    RulesPassword,
    RulesSelection,
    RulesString,
}

export default vuetify_rules;


// export const isNullOrEmpty=isNullOrEmpty
// export const localtime=localtime
// export const capitalizeFirstLetter=capitalizeFirstLetter
// export const parseNumber=parseNumber
// export const ifnullempty=ifnullempty
// export const isNumber=isNumber
// export const isNumberWithRequired=isNumberWithRequired
// export const isNumberMaxDigitsWithRequired=isNumberMaxDigitsWithRequired
// export const countDecimals=countDecimals
// export const translate=translate
// export const isDateIsoString=isDateIsoString
// export const isDatetimeAwareIsoString=isDatetimeAwareIsoString
// export const isStringWithMaxDigits=isStringWithMaxDigits
// export const RulesDate=RulesDate
// export const RulesDateIsoString=RulesDateIsoString
// export const RulesDatetime=RulesDatetime
// export const RulesDatetimeAwareIsoString=RulesDatetimeAwareIsoString
// export const RulesEmail=RulesEmail
// export const RulesFloat=RulesFloat
// export const RulesFloatGZ=RulesFloatGZ
// export const RulesFloatGEZ=RulesFloatGEZ
// export const RulesFloatLEZ=RulesFloatLEZ
// export const RulesInteger=RulesInteger
// export const RulesPassword=RulesPassword
// export const RulesSelection=RulesSelection
// export const RulesString=RulesString