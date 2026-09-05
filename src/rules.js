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

/**
 * Validation rules for integer fields in Vuetify forms.
 *
 * @param {number} maxdigits - Maximum number of allowed digits.
 * @param {boolean} required - Whether the field is mandatory.
 * @returns {Array<function(*): (boolean|string)>} Array of Vuetify validation rule functions.
 * @example
 * // In Vue template:
 * // <v-text-field :rules="RulesInteger(6, true)" label="Age" />
 */
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

/**
 * Validation rules for floating-point number fields in Vuetify forms.
 *
 * @param {number} maxdigits - Maximum number of allowed digits (integer + decimals).
 * @param {boolean} required - Whether the field is mandatory. If false, empty/null values are permitted.
 * @param {number} maxdecimals - Maximum number of allowed decimal places.
 * @returns {Array<function(*): (boolean|string)>} Array of Vuetify validation rule functions.
 * @example
 * // <v-text-field :rules="RulesFloat(8, false, 2)" label="Price" />
 */
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

/**
 * Validation rules for numbers strictly greater than zero (> 0).
 *
 * @param {number} maxdigits - Maximum allowed digits.
 * @param {boolean} required - Whether the field is mandatory.
 * @param {number} maxdecimals - Maximum allowed decimal places.
 * @returns {Array<function(*): (boolean|string)>} Array of Vuetify validation rule functions.
 * @example
 * // <v-text-field :rules="RulesFloatGZ(6, true, 2)" label="Positive Amount" />
 */
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

/**
 * Validation rules for numbers greater than or equal to zero (>= 0).
 *
 * @param {number} maxdigits - Maximum allowed digits.
 * @param {boolean} required - Whether the field is mandatory.
 * @param {number} maxdecimals - Maximum allowed decimal places.
 * @returns {Array<function(*): (boolean|string)>} Array of Vuetify validation rule functions.
 * @example
 * // <v-text-field :rules="RulesFloatGEZ(6, true, 2)" label="Non-negative Amount" />
 */
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

/**
 * Validation rules for numbers less than or equal to zero (<= 0).
 *
 * @param {number} maxdigits - Maximum allowed digits.
 * @param {boolean} required - Whether the field is mandatory.
 * @param {number} maxdecimals - Maximum allowed decimal places.
 * @returns {Array<function(*): (boolean|string)>} Array of Vuetify validation rule functions.
 * @example
 * // <v-text-field :rules="RulesFloatLEZ(6, true, 2)" label="Discount Amount" />
 */
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

/**
 * Validation rules for calendar dates in ISO format ('YYYY-MM-DD').
 *
 * @param {boolean} required - Whether selecting a date is mandatory.
 * @returns {Array<function(*): (boolean|string)>} Array of Vuetify validation rule functions.
 * @example
 * // <v-text-field :rules="RulesDateIsoString(true)" label="Birthdate" />
 */
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

/**
 * Validation rules for timezone-aware UTC datetime strings in ISO format ('YYYY-MM-DDTHH:mm:ssZ').
 *
 * @param {boolean} required - Whether selecting a datetime is mandatory.
 * @returns {Array<function(*): (boolean|string)>} Array of Vuetify validation rule functions.
 * @example
 * // <v-text-field :rules="RulesDatetimeAwareIsoString(true)" label="Event Timestamp" />
 */
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

/**
 * Validation rules for datetime fields.
 *
 * @deprecated Use RulesDatetimeAwareIsoString instead.
 * @param {boolean} required - Whether mandatory.
 * @returns {Array<function(*): (boolean|string)>} Array of Vuetify validation rule functions.
 */
export function RulesDatetime(required) {
    console.warn("Deprecated: RulesDatetime should change to RulesDatetimeAwareIsoString");
    if (required === false) {
        return [];
    }
    return [
        v => (!!v) || i18n.t('You must select date and time'),
    ];
}

/**
 * Validation rules for date fields.
 *
 * @deprecated Use RulesDateIsoString instead.
 * @param {boolean} required - Whether mandatory.
 * @returns {Array<function(*): (boolean|string)>} Array of Vuetify validation rule functions.
 */
export function RulesDate(required) {
    console.warn("Deprecated: RulesDate should change to RulesDateIsoString");
    if (required === false) {
        return [];
    }
    return [
        v => (!!v) || i18n.t("You must select a date"),
    ];
}

/**
 * Validation rules for general string fields with maximum character length.
 *
 * @param {number} maxdigits - Maximum allowed characters.
 * @param {boolean} required - Whether mandatory (if true, minimum 1 character required).
 * @returns {Array<function(*): (boolean|string)>} Array of Vuetify validation rule functions.
 * @example
 * // <v-text-field :rules="RulesString(50, true)" label="Name" />
 */
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

/**
 * Validation rules for password fields (minimum 8 characters, maximum defined by maxdigits).
 *
 * @param {number} maxdigits - Maximum allowed characters.
 * @param {boolean} required - Whether mandatory.
 * @returns {Array<function(*): (boolean|string)>} Array of Vuetify validation rule functions.
 * @example
 * // <v-text-field :rules="RulesPassword(32, true)" type="password" label="Password" />
 */
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

/**
 * Validation rules for select / autocomplete fields requiring a selection.
 * Properly validates both single selections (disallowing null, undefined, empty string)
 * and multiple selections (disallowing empty array []).
 *
 * @param {boolean} required - Whether a selection is mandatory.
 * @returns {Array<function(*): (boolean|string)>} Array of Vuetify validation rule functions.
 * @example
 * // <v-select :rules="RulesSelection(true)" :items="items" label="Category" />
 */
export function RulesSelection(required) {
    if (required === true) {
        return [
            v => (!isNoE(v) && (!Array.isArray(v) || v.length > 0) && (typeof v !== 'string' || v.trim().length > 0)) || i18n.t('Selection is required'),
        ];
    }
    return [];
}

/**
 * Validation rules for email address fields with regex format validation.
 *
 * @param {boolean} required - Whether mandatory.
 * @returns {Array<function(*): (boolean|string)>} Array of Vuetify validation rule functions.
 * @example
 * // <v-text-field :rules="RulesEmail(true)" label="Email address" />
 */
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
