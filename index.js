/*
  Acronyms:
    - aoo: Array of objects
    - aoi: Arroy of integers


*/

import { 
  age_in_a_date,
  age_today,
  aoi_to_string,
  aoo_average_ponderated,
  aoo_maxdecimals,
  aoo_sort,
  aoo_sum,
  aoo_to_array,
  aoo_to_string,
  array_from_map,
  f,
  getBase64,
  ifnullempty,
  isDateIsoString,
  isDatetimeAwareIsoString,
  isNoE,
  isNumber,
  isNumberWithRequired,
  isNumberMaxDigitsWithRequired,
  countDecimals,
  isStringWithMaxDigits,
  localtime,
  parseNumber,
  percentage_generic_string,
  percentage_generic_html,
  string_to_aoi,
  yesterday_in_isostring,
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

import singleton from './src/singleton.js';

export {
  singleton,
  
  age_in_a_date,
  age_today,
  aoi_to_string,
  aoo_average_ponderated,
  aoo_maxdecimals,
  aoo_sort,
  aoo_sum,
  aoo_to_array,
  aoo_to_string,
  array_from_map,
  f,
  getBase64,
  ifnullempty,
  isDateIsoString,
  isDatetimeAwareIsoString,
  isNoE,
  isNumber,
  isNumberWithRequired,
  isNumberMaxDigitsWithRequired,
  countDecimals,
  isStringWithMaxDigits,
  localtime,
  parseNumber,
  percentage_generic_string,
  percentage_generic_html,
  string_to_aoi,
  yesterday_in_isostring,

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
};