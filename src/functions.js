// Precision rounding helper to replace lodash.round
export function round(value, decimals = 0) {
    if (typeof value !== 'number' || !Number.isFinite(value)) return NaN;
    if (decimals <= 0) return Math.round(value);
    return Number(Math.round(Number(`${value}e${decimals}`)) + `e-${decimals}`);
}

// Value is an utc iso string with T and Z (e.g. 2016-10-10T15:35:52.764Z)
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

export function parseNumber(value) {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return NaN;
    if (value.includes(",") && value.includes(".")) return NaN;
    const normalized = value.replace(",", '.');
    return parseFloat(normalized);
}

export function ifnullempty(value) {
    return value ?? "";
}

export function isNoE(n) {
    return n === "" || n === null || n === undefined;
}

// Returns if it's a valid finite Number
export function isNumber(n) {
    return typeof n === 'number' && Number.isFinite(n);
}

export function isNumberWithRequired(n, required) {
    if (required === true) {
        return isNumber(n);
    }
    return isNoE(n) || isNumber(n);
}

// Returns if it's a Number with max digits, with required attribute
export function isNumberMaxDigitsWithRequired(n, required, maxdigits) {
    if (required === true) {
        return isNumberWithRequired(n, required) && String(n).length <= maxdigits;
    }
    if (isNoE(n)) return true;
    return isNumberWithRequired(n, required) && String(n).length <= maxdigits;
}

// Counts the number of decimals of a number
export function countDecimals(n) {
    if (typeof n !== 'number' || !Number.isFinite(n) || Math.floor(n) === n) return 0;
    const arr = String(n).split(".");
    return arr.length === 2 ? arr[1].length : 0;
}

export function f(s, params = []) {
    return s.replace(/\[(\d+)\]/g, (match, index) => {
        return typeof params[index] !== 'undefined' ? params[index] : match;
    });
}

// Returns if string has valid format 'YYYY-MM-DD'
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

export function isStringWithMaxDigits(s, mindigits, maxdigits) {
    if (typeof s !== "string") return false;
    return s.length >= mindigits && s.length <= maxdigits;
}

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

export function yesterday_in_isostring() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
}

export function aoo_to_string(l, key, separator = ", ") {
    if (!Array.isArray(l)) return "";
    return l.map(o => (o && o[key] != null ? String(o[key]) : "")).filter(Boolean).join(separator);
}

export function aoi_to_string(l) {
    if (!Array.isArray(l)) return "";
    return l.join(", ");
}

export function string_to_aoi(s, separator = ", ") {
    if (!s || typeof s !== 'string') return [];
    return s.split(separator).map(o => parseInt(o, 10));
}

export function aoo_to_array(l, key) {
    if (!Array.isArray(l)) return [];
    return l.map(o => o?.[key]);
}

export function percentage_generic_string(num, locale, decimals = 2) {
    if (num == null || !Number.isFinite(num)) return "- - - %";
    return `${round(num * 100, decimals).toLocaleString(locale, { minimumFractionDigits: decimals })} %`;
}

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

// Find the maximum number of decimal places
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

// Sums values in an array of objects respecting max number of decimals
export function aoo_sum(lo, key, decimals = null) {
    if (!Array.isArray(lo) || lo.length === 0) return 0;
    const targetDecimals = decimals ?? aoo_maxdecimals(lo, key);
    const sum = lo.reduce((accum, item) => accum + (Number(item?.[key]) || 0), 0);
    return round(sum, targetDecimals);
}

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

// file is the value of v-file-input.
// Returns an object with image in base64, jsimage, and mime parameters
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

export function array_from_map(catalog) {
    if (!catalog) return [];
    return Array.from(catalog.values());
}

export function age_today(birth_iso_string) {
    return age_in_a_date(birth_iso_string, new Date().toISOString());
}

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