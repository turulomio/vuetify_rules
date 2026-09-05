// IMPORTANT
// v-text-field can't be type="number" it doesn't recognize alpha characters
// v-model.number can be used

// Vuetify rules behavior:
// Returns true when valid, returns a string error message when invalid

import {
    isNoE,
    isNumber,
    isNumberMaxDigitsWithRequired,
    countDecimals,
    isDateIsoString,
    isDatetimeAwareIsoString,
    isStringWithMaxDigits,
} from "./functions.js";

import singleton from './singleton.js';

const i18n = singleton.i18n;

export function RulesInteger(maxdigits, required) {
    if (required === false) {
        return [
            v => (isNoE(v) || isNumberMaxDigitsWithRequired(v, required, maxdigits)) || i18n.t('Field can be empty or a number with {{maxdigits}} digits at most', { maxdigits }),
            v => (isNoE(v) || (isNumber(v) && countDecimals(v) <= 0)) || i18n.t('Must be an integer number'),
        ];
    }
    return [
        v => isNumberMaxDigitsWithRequired(v, required, maxdigits) || i18n.t('Field must be a number with {{maxdigits}} digits at most', { maxdigits }),
        v => countDecimals(v) <= 0 || i18n.t('Must be an integer number'),
    ];
}

// If required===true must be 0 or a number
// If required===false can be null
export function RulesFloat(maxdigits, required, maxdecimals) {
    if (required === false) {
        return [
            v => (isNoE(v) || isNumberMaxDigitsWithRequired(v, required, maxdigits)) || i18n.t('Field can be empty or a number with {{maxdigits}} digits at most', { maxdigits }),
            v => (isNoE(v) || (isNumber(v) && countDecimals(v) <= maxdecimals)) || i18n.t('Must be a number with {{maxdecimals}} decimals places at most', { maxdecimals }),
        ];
    }
    return [
        v => isNumberMaxDigitsWithRequired(v, required, maxdigits) || i18n.t('Field must be a number with {{maxdigits}} digits at most', { maxdigits }),
        v => countDecimals(v) <= maxdecimals || i18n.t('Must be a number with {{maxdecimals}} decimals places at most', { maxdecimals }),
    ];
}

// Float Greater Than Zero (> 0)
export function RulesFloatGZ(maxdigits, required, maxdecimals) {
    if (required === false) {
        return [
            v => (isNoE(v) || isNumberMaxDigitsWithRequired(v, required, maxdigits)) || i18n.t('Field can be empty or a number with {{maxdigits}} digits at most', { maxdigits }),
            v => (isNoE(v) || (isNumber(v) && v > 0)) || i18n.t('Must be a number greater than zero'),
            v => (isNoE(v) || (isNumber(v) && countDecimals(v) <= maxdecimals)) || i18n.t('Must be a number with {{maxdecimals}} decimals places at most', { maxdecimals }),
        ];
    }
    return [
        v => isNumberMaxDigitsWithRequired(v, required, maxdigits) || i18n.t('Field must be a number with {{maxdigits}} digits at most', { maxdigits }),
        v => v > 0 || i18n.t('Must be a number greater than zero'),
        v => countDecimals(v) <= maxdecimals || i18n.t('Must be a number with {{maxdecimals}} decimals places at most', { maxdecimals }),
    ];
}

// Number Greater Than or Equal to Zero (>= 0)
export function RulesFloatGEZ(maxdigits, required, maxdecimals) {
    if (required === false) {
        return [
            v => (isNoE(v) || isNumberMaxDigitsWithRequired(v, required, maxdigits)) || i18n.t('Field can be empty or a number with {{maxdigits}} digits at most', { maxdigits }),
            v => (isNoE(v) || (isNumber(v) && v >= 0)) || i18n.t('Must be a number greater than or equal to zero'),
            v => (isNoE(v) || (isNumber(v) && countDecimals(v) <= maxdecimals)) || i18n.t('Must be a number with {{maxdecimals}} decimals places at most', { maxdecimals }),
        ];
    }
    return [
        v => isNumberMaxDigitsWithRequired(v, required, maxdigits) || i18n.t('Field must be a number with {{maxdigits}} digits at most', { maxdigits }),
        v => v >= 0 || i18n.t('Must be a number greater than or equal to zero'),
        v => countDecimals(v) <= maxdecimals || i18n.t('Must be a number with {{maxdecimals}} decimals places at most', { maxdecimals }),
    ];
}

// Number Less Than or Equal to Zero (<= 0)
export function RulesFloatLEZ(maxdigits, required, maxdecimals) {
    if (required === false) {
        return [
            v => (isNoE(v) || isNumberMaxDigitsWithRequired(v, required, maxdigits)) || i18n.t('Field can be empty or a number with {{maxdigits}} digits at most', { maxdigits }),
            v => (isNoE(v) || (isNumber(v) && v <= 0)) || i18n.t('Must be a number less than or equal to zero'),
            v => (isNoE(v) || (isNumber(v) && countDecimals(v) <= maxdecimals)) || i18n.t('Must be a number with {{maxdecimals}} decimals places at most', { maxdecimals }),
        ];
    }
    return [
        v => isNumberMaxDigitsWithRequired(v, required, maxdigits) || i18n.t('Field must be a number with {{maxdigits}} digits at most', { maxdigits }),
        v => v <= 0 || i18n.t('Must be a number less than or equal to zero'),
        v => countDecimals(v) <= maxdecimals || i18n.t('Must be a number with {{maxdecimals}} decimals places at most', { maxdecimals }),
    ];
}

export function RulesDateIsoString(required) {
    if (required === true) {
        return [
            v => (!isNoE(v) && isDateIsoString(v)) || i18n.t("Field must be a string representing a date in iso format"),
        ];
    }
    return [
        v => (isNoE(v) || isDateIsoString(v)) || i18n.t("Field must be a string representing a date in iso format"),
    ];
}

export function RulesDatetimeAwareIsoString(required) {
    if (required === true) {
        return [
            v => (!isNoE(v) && isDatetimeAwareIsoString(v)) || i18n.t("Field must be a string representing a date time with timezone in iso format"),
        ];
    }
    return [
        v => (isNoE(v) || isDatetimeAwareIsoString(v)) || i18n.t("Field must be a string representing a date time with timezone in iso format"),
    ];
}

export function RulesDatetime(required) {
    console.warn("Deprecated: RulesDatetime should change to RulesDatetimeAwareIsoString");
    if (required === false) {
        return [];
    }
    return [
        v => (!!v) || i18n.t('You must select date and time'),
    ];
}

export function RulesDate(required) {
    console.warn("Deprecated: RulesDate should change to RulesDateIsoString");
    if (required === false) {
        return [];
    }
    return [
        v => (!!v) || i18n.t("You must select a date"),
    ];
}

export function RulesString(maxdigits, required) {
    if (required === true) {
        return [
            v => (!isNoE(v) && isStringWithMaxDigits(v, 1, maxdigits)) || i18n.t("Field must be a string with at most {{maxdigits}} characters", { maxdigits }),
        ];
    }
    return [
        v => (isNoE(v) || isStringWithMaxDigits(v, 0, maxdigits)) || i18n.t("Field must be empty or a string with at most {{maxdigits}} characters", { maxdigits }),
    ];
}

export function RulesPassword(maxdigits, required) {
    if (required === true) {
        return [
            v => (!isNoE(v) && isStringWithMaxDigits(v, 8, maxdigits)) || i18n.t("Field must be a string between 8 and {{maxdigits}} characters", { maxdigits }),
        ];
    }
    return [
        v => (isNoE(v) || isStringWithMaxDigits(v, 8, maxdigits)) || i18n.t("Field must be empty or a string between 8 and {{maxdigits}} characters", { maxdigits }),
    ];
}

export function RulesSelection(required) {
    if (required === true) {
        return [
            (v) => !!v || i18n.t('Selection is required'),
        ];
    }
    return [];
}

export function RulesEmail(required) {
    if (required === false) {
        return [
            v => isNoE(v) || /.+@.+/.test(v) || i18n.t('Invalid Email address'),
        ];
    }
    return [
        v => !!v || i18n.t('Email is required'),
        v => /.+@.+/.test(v) || i18n.t('Invalid Email address'),
    ];
}
