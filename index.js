import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
// import resourcesToBackend from 'i18next-resources-to-backend';
import en from "./locales/en/translation.json" assert { type: 'json' };
import es from "./locales/en/translation.json" assert { type: 'json' };
import fr from "./locales/en/translation.json" assert { type: 'json' };


i18next
    // .use(resourcesToBackend((language, namespace) => import(`./i18n/${language}/${namespace}.json`)))
    .use(LanguageDetector)
    .init({
        lng: [
            'en',
            'es',
            'fr',
         ], // if you're using a language detector, do not define the lng option
        resources: {
            'en': {translation: en},
            'es': {translation: es},
            'fr': {translation: fr},
            // // ---------^ namespace
            // 'nl-NL': {translation: require('./nl-nl/translation.json')},
          },
        debug: true,    
        // partialBundledLanguages: "true",
        fallbackLng: "en"
    });

export const i18n=i18next

// console.log(en)
import { 
    isNullOrEmpty as f_isNullOrEmpty,
    localtime as f_localtime,
    capitalizeFirstLetter as f_capitalizeFirstLetter,
    parseNumber as f_parseNumber,
    ifnullempty as f_ifnullempty,
    isNumber as f_isNumber,
    isNumberWithRequired as f_isNumberWithRequired,
    isNumberMaxDigitsWithRequired as f_isNumberMaxDigitsWithRequired,
    countDecimals as f_countDecimals,
    isDateIsoString as f_isDateIsoString,
    isDatetimeAwareIsoString as f_isDatetimeAwareIsoString,
    isStringWithMaxDigits as f_isStringWithMaxDigits,
    f as f_f,
    my_round as f_my_round
} from "./src/functions.js";

import { 
    RulesDate as f_RulesDate,
    RulesDateIsoString as f_RulesDateIsoString,
    RulesDatetime as f_RulesDatetime,
    RulesDatetimeAwareIsoString as f_RulesDatetimeAwareIsoString,
    RulesEmail as f_RulesEmail,
    RulesFloat as f_RulesFloat,
    RulesFloatGEZ as f_RulesFloatGEZ,
    RulesFloatGZ as f_RulesFloatGZ,
    RulesFloatLEZ as f_RulesFloatLEZ,
    RulesInteger as f_RulesInteger,
    RulesPassword as f_RulesPassword,
    RulesSelection as f_RulesSelection,
    RulesString as f_RulesString
} from "./src/rules.js";

// const vuetify_rules={
//     isNullOrEmpty,
//     localtime,
//     capitalizeFirstLetter,
//     parseNumber,
//     ifnullempty,
//     isNumber,
//     isNumberWithRequired,
//     isNumberMaxDigitsWithRequired,
//     countDecimals,
//     translate,
//     isDateIsoString,
//     isDatetimeAwareIsoString,
//     isStringWithMaxDigits,
//     f,
//     my_round,
//     RulesDate,
//     RulesDateIsoString,
//     RulesDatetime,
//     RulesDatetimeAwareIsoString,
//     RulesEmail,
//     RulesFloat,
//     RulesFloatGEZ,
//     RulesFloatGZ,
//     RulesFloatLEZ,
//     RulesInteger,
//     RulesPassword,
//     RulesSelection,
//     RulesString,
// }


export const isNullOrEmpty = f_isNullOrEmpty
export const localtime = f_localtime
export const capitalizeFirstLetter = f_capitalizeFirstLetter
export const parseNumber = f_parseNumber
export const ifnullempty = f_ifnullempty
export const isNumber = f_isNumber
export const isNumberWithRequired = f_isNumberWithRequired
export const isNumberMaxDigitsWithRequired = f_isNumberMaxDigitsWithRequired
export const countDecimals = f_countDecimals
export const isDateIsoString = f_isDateIsoString
export const isDatetimeAwareIsoString = f_isDatetimeAwareIsoString
export const isStringWithMaxDigits = f_isStringWithMaxDigits
export const RulesDate = f_RulesDate
export const RulesDateIsoString = f_RulesDateIsoString
export const RulesDatetime = f_RulesDatetime
export const RulesDatetimeAwareIsoString = f_RulesDatetimeAwareIsoString
export const RulesEmail = f_RulesEmail
export const RulesFloat = f_RulesFloat
export const RulesFloatGZ = f_RulesFloatGZ
export const RulesFloatGEZ = f_RulesFloatGEZ
export const RulesFloatLEZ = f_RulesFloatLEZ
export const RulesInteger = f_RulesInteger
export const RulesPassword = f_RulesPassword
export const RulesSelection = f_RulesSelection
export const RulesString = f_RulesString
export const my_round = f_my_round
export const f = f_f