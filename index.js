// import {
//     vuetify_rules_i18next, 
//     vuetify_rules_i18next_init,
//     vuetify_rules_i18next_change_language
// } from "./src/i18next.js"


// export const vuetify_rules_i18next=f_vuetify_rules_i18next
// export const vuetify_rules_i18next_init=f_vuetify_rules_i18next_init
// export const vuetify_rules_i18next_change_language=f_vuetify_rules_i18next_change_language

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
    isDateIsoString,
    isDatetimeAwareIsoString,
    isStringWithMaxDigits,
    f,
    my_round
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
    RulesString
} from "./src/rules.js";

import singleton from './src/singleton.js';

export {
  singleton,
  isNullOrEmpty,
  localtime,
  capitalizeFirstLetter,
  parseNumber,
  ifnullempty,
  isNumber,
  isNumberWithRequired,
  isNumberMaxDigitsWithRequired,
  countDecimals,
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
  RulesString
};