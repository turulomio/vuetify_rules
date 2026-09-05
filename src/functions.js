/**
 * Precision rounding helper that rounds a number to a given number of decimal places.
 *
 * @param {number} value - The number to round.
 * @param {number} [decimals=0] - Number of decimal places.
 * @returns {number} The rounded number, or NaN if value is invalid.
 * @example
 * round(1.005, 2); // 1.01
 */
export function round(value, decimals = 0) {
    if (typeof value !== 'number' || !Number.isFinite(value)) return NaN;
    if (decimals <= 0) return Math.round(value);
    return Number(Math.round(Number(`${value}e${decimals}`)) + `e-${decimals}`);
}

/**
 * Converts a UTC ISO string with T and Z (e.g. '2016-10-10T15:35:52.764Z') to local date time formatted as 'YYYY-MM-DD HH:mm:ss'.
 *
 * @param {string} value - The UTC ISO date-time string.
 * @returns {string} Formatted local datetime string, or empty string if invalid.
 * @example
 * localtime("2026-09-05T10:30:00.000Z"); // e.g. "2026-09-05 12:30:00"
 */
export function localtime(value) {
    if (typeof value !== 'string') return "";
    if (value.split("-").length !== 3) return "";
    if (value.split(":").length !== 3) return "";
    if (!value.includes("T") || !value.endsWith("Z")) return "";
    
    const date = new Date(value);
    if (isNaN(date.getTime())) return "";

    const pad = (num) => String(num).padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Parses a string or number into a valid float number, supporting comma as decimal separator.
 *
 * @param {string|number} value - The value to parse.
 * @returns {number} The parsed number, or NaN if invalid.
 * @example
 * parseNumber("12,34"); // 12.34
 * parseNumber(42); // 42
 */
export function parseNumber(value) {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return NaN;
    if (value.includes(",") && value.includes(".")) return NaN;
    const normalized = value.replace(",", '.');
    return parseFloat(normalized);
}

/**
 * Returns empty string if the value is null or undefined; otherwise returns the original value.
 *
 * @template T
 * @param {T} value - The value to check.
 * @returns {T|string} The value or empty string.
 * @example
 * ifnullempty(null); // ""
 * ifnullempty("hello"); // "hello"
 */
export function ifnullempty(value) {
    return value ?? "";
}

/**
 * Checks if a value is Null or Empty (null, undefined, or empty string).
 *
 * @param {*} n - The value to check.
 * @returns {boolean} True if null, undefined, or empty string.
 * @example
 * isNoE(""); // true
 * isNoE(null); // true
 * isNoE(0); // false
 */
export function isNoE(n) {
    return n === "" || n === null || n === undefined;
}

/**
 * Checks if a value is a valid finite number.
 *
 * @param {*} n - The value to check.
 * @returns {boolean} True if it is a finite number.
 * @example
 * isNumber(123); // true
 * isNumber(NaN); // false
 * isNumber("123"); // false
 */
export function isNumber(n) {
    return typeof n === 'number' && Number.isFinite(n);
}

/**
 * Validates if a value is a number taking into account whether it is required.
 *
 * @param {*} n - The value to check.
 * @param {boolean} required - Whether the field is mandatory.
 * @returns {boolean} True if valid according to requirement.
 * @example
 * isNumberWithRequired(null, false); // true
 * isNumberWithRequired(null, true); // false
 * isNumberWithRequired(10, true); // true
 */
export function isNumberWithRequired(n, required) {
    if (required === true) {
        return isNumber(n);
    }
    return isNoE(n) || isNumber(n);
}

/**
 * Validates if a number has at most a specified number of digits, respecting the required flag.
 *
 * @param {*} n - The value to check.
 * @param {boolean} required - Whether the field is mandatory.
 * @param {number} maxdigits - Maximum number of digits allowed.
 * @returns {boolean} True if valid.
 * @example
 * isNumberMaxDigitsWithRequired(123, true, 3); // true
 * isNumberMaxDigitsWithRequired(1234, true, 3); // false
 */
export function isNumberMaxDigitsWithRequired(n, required, maxdigits) {
    if (required === true) {
        return isNumberWithRequired(n, required) && String(n).length <= maxdigits;
    }
    if (isNoE(n)) return true;
    return isNumberWithRequired(n, required) && String(n).length <= maxdigits;
}

/**
 * Counts the number of decimal places of a finite number.
 *
 * @param {number} n - The number to evaluate.
 * @returns {number} Number of decimal places.
 * @example
 * countDecimals(12.345); // 3
 * countDecimals(10); // 0
 */
export function countDecimals(n) {
    if (typeof n !== 'number' || !Number.isFinite(n) || Math.floor(n) === n) return 0;
    const arr = String(n).split(".");
    return arr.length === 2 ? arr[1].length : 0;
}

/**
 * Simple positional string formatter replacing [0], [1], etc. with arguments.
 *
 * @param {string} s - Template string with positional tokens [0], [1], etc.
 * @param {Array<*>} [params=[]] - Array of replacement values.
 * @returns {string} Formatted string.
 * @example
 * f("Hello [0], you have [1] messages", ["Alice", 5]);
 */
export function f(s, params = []) {
    return s.replace(/\[(\d+)\]/g, (match, index) => {
        return typeof params[index] !== 'undefined' ? params[index] : match;
    });
}

/**
 * Checks if a string represents a valid calendar date in ISO format ('YYYY-MM-DD').
 *
 * @param {string} s - String to validate.
 * @returns {boolean} True if valid ISO calendar date.
 * @example
 * isDateIsoString("2026-09-05"); // true
 * isDateIsoString("2026-02-30"); // false
 */
export function isDateIsoString(s) {
    if (typeof s !== "string") return false;
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (!match) return false;
    const y = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const d = parseInt(match[3], 10);
    if (m < 1 || m > 12 || d < 1 || d > 31) return false;
    const date = new Date(Date.UTC(y, m - 1, d));
    return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

/**
 * Checks if a string length is within specified minimum and maximum bounds.
 *
 * @param {string} s - String to validate.
 * @param {number} mindigits - Minimum length.
 * @param {number} maxdigits - Maximum length.
 * @returns {boolean} True if length is within range.
 * @example
 * isStringWithMaxDigits("test", 1, 10); // true
 */
export function isStringWithMaxDigits(s, mindigits, maxdigits) {
    if (typeof s !== "string") return false;
    return s.length >= mindigits && s.length <= maxdigits;
}

/**
 * Checks if a string is a valid UTC datetime aware ISO string ending in 'Z' (e.g. 'YYYY-MM-DDTHH:mm:ssZ').
 *
 * @param {string} s - String to validate.
 * @returns {boolean} True if valid timezone-aware UTC ISO datetime string.
 * @example
 * isDatetimeAwareIsoString("2026-09-05T12:00:00Z"); // true
 */
export function isDatetimeAwareIsoString(s) {
    if (typeof s !== "string") return false;
    const parts = s.split("T");
    if (parts.length !== 2) return false;
    const [datePart, timePart] = parts;
    if (!timePart.endsWith("Z")) return false;
    if (!isDateIsoString(datePart)) return false;
    const timeWithoutZ = timePart.slice(0, -1);
    if (timeWithoutZ.split(":").length !== 3) return false;
    const date = new Date(s);
    return !isNaN(date.getTime());
}

/**
 * Returns yesterday's calendar date in ISO format ('YYYY-MM-DD').
 *
 * @returns {string} Yesterday's date string.
 * @example
 * yesterday_in_isostring(); // "2026-09-04"
 */
export function yesterday_in_isostring() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
}

/**
 * Extracts a property from an array of objects and joins the non-empty values into a delimited string.
 *
 * @param {Array<Record<string, *>>} l - Array of objects.
 * @param {string} key - Property key to extract.
 * @param {string} [separator=", "] - Separator string.
 * @returns {string} Joined string.
 * @example
 * aoo_to_string([{ name: "A" }, { name: "B" }], "name"); // "A, B"
 */
export function aoo_to_string(l, key, separator = ", ") {
    if (!Array.isArray(l)) return "";
    return l.map(o => (o && o[key] != null ? String(o[key]) : "")).filter(Boolean).join(separator);
}

/**
 * Converts an array of numbers or strings into a comma-separated string.
 *
 * @param {Array<number|string>} l - Array of items.
 * @returns {string} Joined string.
 * @example
 * aoi_to_string([1, 2, 3]); // "1, 2, 3"
 */
export function aoi_to_string(l) {
    if (!Array.isArray(l)) return "";
    return l.join(", ");
}

/**
 * Parses a delimited string of integers into an array of numbers.
 *
 * @param {string} s - Delimited string.
 * @param {string} [separator=", "] - Delimiter separator.
 * @returns {Array<number>} Array of parsed integers.
 * @example
 * string_to_aoi("1, 2, 3"); // [1, 2, 3]
 */
export function string_to_aoi(s, separator = ", ") {
    if (!s || typeof s !== 'string') return [];
    return s.split(separator).map(o => parseInt(o, 10));
}

/**
 * Plucks a specific property key from each object in an array of objects into a new array.
 *
 * @template T
 * @param {Array<Record<string, *>>} l - Array of objects.
 * @param {string} key - Property key to pluck.
 * @returns {Array<T>} Array of plucked values.
 * @example
 * aoo_to_array([{ id: 1 }, { id: 2 }], "id"); // [1, 2]
 */
export function aoo_to_array(l, key) {
    if (!Array.isArray(l)) return [];
    return l.map(o => o?.[key]);
}

/**
 * Formats a decimal number (e.g. 0.154) as a localized percentage string (e.g. '15.40 %').
 *
 * @param {number|null|undefined} num - Number to format (0.15 = 15%).
 * @param {string} locale - BCP 47 language tag (e.g. 'es-ES', 'en-US').
 * @param {number} [decimals=2] - Number of decimal digits.
 * @returns {string} Formatted percentage string, or '- - - %' if null or non-finite.
 * @example
 * percentage_generic_string(0.125, 'en-US', 2); // "12.50 %"
 */
export function percentage_generic_string(num, locale, decimals = 2) {
    if (num == null || !Number.isFinite(num)) return "- - - %";
    return `${round(num * 100, decimals).toLocaleString(locale, { minimumFractionDigits: decimals })} %`;
}

/**
 * Formats a decimal number as an HTML percentage span, using class 'vuered' for negative values.
 *
 * @param {number|null|undefined} num - Number to format.
 * @param {string} locale - BCP 47 language tag.
 * @param {number} [decimals=2] - Number of decimal digits.
 * @returns {string} HTML span element string.
 * @example
 * percentage_generic_html(-0.05, 'en-US', 1); // "<span class='vuered'>-5.0 %</span>"
 */
export function percentage_generic_html(num, locale, decimals = 2) {
    if (num == null) {
        return percentage_generic_string(num, locale, decimals);
    }
    const text = percentage_generic_string(num, locale, decimals);
    if (num >= 0) {
        return `<span>${text}</span>`;
    }
    return `<span class='vuered'>${text}</span>`;
}

/**
 * Finds the maximum number of decimal places for a given property across an array of objects.
 *
 * @param {Array<Record<string, *>>} lo - Array of objects.
 * @param {string} key - Property key to inspect.
 * @returns {number} Maximum decimal places found.
 * @example
 * aoo_maxdecimals([{ val: 1.2 }, { val: 3.456 }], "val"); // 3
 */
export function aoo_maxdecimals(lo, key) {
    if (!Array.isArray(lo)) return 0;
    let maxDecimals = 0;
    for (const o of lo) {
        if (o && o[key] != null) {
            const decimalPart = String(o[key]).split('.')[1];
            if (decimalPart) {
                maxDecimals = Math.max(maxDecimals, decimalPart.length);
            }
        }
    }
    return maxDecimals;
}

/**
 * Sums the numeric values of a property across an array of objects, rounded to target decimals.
 *
 * @param {Array<Record<string, *>>} lo - Array of objects.
 * @param {string} key - Property key to sum.
 * @param {number|null} [decimals=null] - Desired decimal precision. Defaults to max decimals in array.
 * @returns {number} Sum of the properties.
 * @example
 * aoo_sum([{ amount: 10.5 }, { amount: 20.25 }], "amount"); // 30.75
 */
export function aoo_sum(lo, key, decimals = null) {
    if (!Array.isArray(lo) || lo.length === 0) return 0;
    const targetDecimals = decimals ?? aoo_maxdecimals(lo, key);
    const sum = lo.reduce((accum, item) => accum + (Number(item?.[key]) || 0), 0);
    return round(sum, targetDecimals);
}

/**
 * Computes the weighted average of key1 weighted by key2 across an array of objects.
 *
 * @param {Array<Record<string, *>>} lo - Array of objects.
 * @param {string} key1 - Value property key.
 * @param {string} key2 - Weight property key.
 * @returns {number} Weighted average.
 * @example
 * aoo_average_ponderated([{ grade: 8, weight: 2 }, { grade: 10, weight: 1 }], "grade", "weight"); // 8.666...
 */
export function aoo_average_ponderated(lo, key1, key2) {
    if (!Array.isArray(lo) || lo.length === 0) return 0;
    let prod = 0;
    let total = 0;
    for (const item of lo) {
        if (item) {
            prod += (Number(item[key1]) || 0) * (Number(item[key2]) || 0);
            total += (Number(item[key2]) || 0);
        }
    }
    return total === 0 ? 0 : prod / total;
}

/**
 * Reads a File or Blob (e.g. from Vuetify's v-file-input) and resolves with base64 and mime information.
 *
 * @param {File|Blob} file - File or Blob to read.
 * @returns {Promise<{ jsimage: string, image: string, mime: string }>} Base64 representation object.
 */
export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function () {
            const result = reader.result;
            const r = {
                jsimage: result,
                image: typeof result === 'string' ? result.split(",")[1] : "",
                mime: typeof result === 'string' ? result.split(";base64,")[0].split(":")[1] : "",
            };
            return resolve(r);
        };
        reader.onerror = function (error) {
            return reject(error);
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Extracts an array of values from a Map catalog.
 *
 * @template K, V
 * @param {Map<K, V>} catalog - Map to convert.
 * @returns {Array<V>} Array of map values.
 * @example
 * array_from_map(new Map([['a', 1], ['b', 2]])); // [1, 2]
 */
export function array_from_map(catalog) {
    if (!catalog) return [];
    return Array.from(catalog.values());
}

/**
 * Calculates current age in years today given an ISO birthdate string.
 *
 * @param {string} birth_iso_string - Birth date in ISO format ('YYYY-MM-DD').
 * @returns {number} Age in years.
 * @example
 * age_today("2000-01-01");
 */
export function age_today(birth_iso_string) {
    return age_in_a_date(birth_iso_string, new Date().toISOString());
}

/**
 * Calculates age in years on a specific target date given an ISO birthdate string.
 *
 * @param {string} birth_iso_string - Birth date in ISO format ('YYYY-MM-DD').
 * @param {string} date_iso_string - Target date in ISO format.
 * @returns {number} Age in years.
 * @example
 * age_in_a_date("2000-01-01", "2020-01-01"); // 20
 */
export function age_in_a_date(birth_iso_string, date_iso_string) {
    const birth = new Date(birth_iso_string);
    const date = new Date(date_iso_string);
    let age = date.getFullYear() - birth.getFullYear();
    const monthDiff = date.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && date.getDate() < birth.getDate())) {
        age--;
    }
    return Math.max(0, age);
}