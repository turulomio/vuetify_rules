/**
 * Vuetify validation rule callback returning true if valid or a string error message if invalid.
 */
export type ValidationRule = (value: any) => boolean | string;

/**
 * Result object returned when reading a file or blob as Base64.
 */
export interface Base64Result {
  /** Complete data URL (e.g. 'data:image/png;base64,...') */
  jsimage: string;
  /** Raw Base64 encoded payload without data prefix */
  image: string;
  /** MIME type string (e.g. 'image/png') */
  mime: string;
}

/**
 * Singleton instance interface managing language state and dynamic translations.
 */
export interface SingletonInstance {
  /** Currently active language code (e.g. 'en', 'es', 'fr') */
  language: string;
  /**
   * Backward-compatible interface mimicking i18next
   */
  i18n: {
    /**
     * Translates a message key with optional variable interpolation.
     * @param key - Translation key in English.
     * @param params - Key-value map for `{{var}}` interpolation.
     */
    t(key: string, params?: Record<string, any>): string;
    /**
     * Changes active language asynchronously.
     * @param lang - Target language code.
     */
    changeLanguage(lang: string): Promise<void>;
  };
  /**
   * Translates a message key with optional variable interpolation.
   * Falls back to the English key if translation is missing or untranslated.
   *
   * @param key - Translation key in English.
   * @param params - Variables to interpolate into `{{variable}}`.
   * @returns Translated and interpolated string.
   */
  t(key: string, params?: Record<string, any>): string;
  /**
   * Initializes localization asynchronously (resolves immediately).
   */
  initI18N(): Promise<void>;
  /**
   * Sets the current active language.
   * @param lang - Target language code ('en', 'es', etc.).
   */
  setLanguage(lang: string): Promise<void>;
  /**
   * Gets the current active language code.
   * @returns Current language code.
   */
  getLanguage(): string;
  /**
   * Merges custom translations dynamically for a language.
   * @param lang - Target language code.
   * @param translations - Dictionary of key-value translation strings.
   */
  addTranslations(lang: string, translations: Record<string, string>): void;
}

/**
 * Global singleton instance for vuetify_rules i18n management.
 */
export const singleton: SingletonInstance;

// ==========================================
// Validation Rules
// ==========================================

/**
 * Generates Vuetify validation rules for integer fields.
 *
 * @param maxdigits - Maximum number of allowed digits.
 * @param required - Whether the field is mandatory.
 * @returns Array of Vuetify validation rule callbacks.
 * @example
 * ```html
 * <v-text-field :rules="RulesInteger(6, true)" label="Quantity" />
 * ```
 */
export function RulesInteger(maxdigits: number, required: boolean): ValidationRule[];

/**
 * Generates Vuetify validation rules for floating-point number fields.
 *
 * @param maxdigits - Maximum total digits allowed.
 * @param required - Whether the field is mandatory. If false, empty/null is permitted.
 * @param maxdecimals - Maximum number of decimal places allowed.
 * @returns Array of Vuetify validation rule callbacks.
 * @example
 * ```html
 * <v-text-field :rules="RulesFloat(8, false, 2)" label="Price" />
 * ```
 */
export function RulesFloat(maxdigits: number, required: boolean, maxdecimals: number): ValidationRule[];

/**
 * Generates Vuetify validation rules for numbers strictly greater than zero (> 0).
 *
 * @param maxdigits - Maximum total digits allowed.
 * @param required - Whether the field is mandatory.
 * @param maxdecimals - Maximum number of decimal places allowed.
 * @returns Array of Vuetify validation rule callbacks.
 */
export function RulesFloatGZ(maxdigits: number, required: boolean, maxdecimals: number): ValidationRule[];

/**
 * Generates Vuetify validation rules for numbers greater than or equal to zero (>= 0).
 *
 * @param maxdigits - Maximum total digits allowed.
 * @param required - Whether the field is mandatory.
 * @param maxdecimals - Maximum number of decimal places allowed.
 * @returns Array of Vuetify validation rule callbacks.
 */
export function RulesFloatGEZ(maxdigits: number, required: boolean, maxdecimals: number): ValidationRule[];

/**
 * Generates Vuetify validation rules for numbers less than or equal to zero (<= 0).
 *
 * @param maxdigits - Maximum total digits allowed.
 * @param required - Whether the field is mandatory.
 * @param maxdecimals - Maximum number of decimal places allowed.
 * @returns Array of Vuetify validation rule callbacks.
 */
export function RulesFloatLEZ(maxdigits: number, required: boolean, maxdecimals: number): ValidationRule[];

/**
 * Generates Vuetify validation rules for calendar dates in ISO format ('YYYY-MM-DD').
 *
 * @param required - Whether selecting a date is mandatory.
 * @returns Array of Vuetify validation rule callbacks.
 */
export function RulesDateIsoString(required: boolean): ValidationRule[];

/**
 * Generates Vuetify validation rules for timezone-aware UTC datetime strings in ISO format ('YYYY-MM-DDTHH:mm:ssZ').
 *
 * @param required - Whether selecting a datetime is mandatory.
 * @returns Array of Vuetify validation rule callbacks.
 */
export function RulesDatetimeAwareIsoString(required: boolean): ValidationRule[];

/**
 * @deprecated Use `RulesDatetimeAwareIsoString` instead.
 */
export function RulesDatetime(required: boolean): ValidationRule[];

/**
 * @deprecated Use `RulesDateIsoString` instead.
 */
export function RulesDate(required: boolean): ValidationRule[];

/**
 * Generates Vuetify validation rules for general string fields with maximum character length.
 *
 * @param maxdigits - Maximum allowed characters.
 * @param required - Whether mandatory (minimum 1 character if required).
 * @returns Array of Vuetify validation rule callbacks.
 */
export function RulesString(maxdigits: number, required: boolean): ValidationRule[];

/**
 * Generates Vuetify validation rules for password fields (minimum 8 characters, maximum defined by maxdigits).
 *
 * @param maxdigits - Maximum allowed characters.
 * @param required - Whether mandatory.
 * @returns Array of Vuetify validation rule callbacks.
 */
export function RulesPassword(maxdigits: number, required: boolean): ValidationRule[];

/**
 * Generates Vuetify validation rules for selection/autocomplete fields requiring a non-empty value.
 *
 * @param required - Whether selecting an item is mandatory.
 * @returns Array of Vuetify validation rule callbacks.
 */
export function RulesSelection(required: boolean): ValidationRule[];

/**
 * Generates Vuetify validation rules for email address fields with regex format validation.
 *
 * @param required - Whether entering an email is mandatory.
 * @returns Array of Vuetify validation rule callbacks.
 */
export function RulesEmail(required: boolean): ValidationRule[];

// ==========================================
// Helper Functions
// ==========================================

/**
 * Precision rounding helper that rounds a number to a specified number of decimal places.
 *
 * @param value - The number to round.
 * @param decimals - Number of decimal places (default: 0).
 * @returns The rounded number, or NaN if value is non-finite.
 */
export function round(value: number, decimals?: number): number;

/**
 * Converts a UTC ISO string with T and Z (e.g. '2016-10-10T15:35:52.764Z') to local date time formatted as 'YYYY-MM-DD HH:mm:ss'.
 *
 * @param value - UTC ISO datetime string.
 * @returns Local datetime string, or empty string if invalid.
 */
export function localtime(value: string): string;

/**
 * Parses a string or number into a valid float number, supporting comma as decimal separator.
 *
 * @param value - Value to parse.
 * @returns Parsed float number, or NaN if invalid.
 */
export function parseNumber(value: string | number): number;

/**
 * Returns empty string if the value is null or undefined; otherwise returns the value.
 *
 * @param value - Value to check.
 * @returns Value or empty string.
 */
export function ifnullempty<T>(value: T): T | "";

/**
 * Checks if a value is Null or Empty (null, undefined, or empty string).
 *
 * @param n - Value to check.
 * @returns True if null, undefined, or empty string.
 */
export function isNoE(n: any): boolean;

/**
 * Checks if a value is a valid finite number.
 *
 * @param n - Value to check.
 * @returns True if finite number.
 */
export function isNumber(n: any): boolean;

/**
 * Validates if a value is a number taking into account whether it is required.
 *
 * @param n - Value to check.
 * @param required - Whether mandatory.
 * @returns True if valid.
 */
export function isNumberWithRequired(n: any, required: boolean): boolean;

/**
 * Validates if a number has at most a specified number of digits, respecting the required flag.
 *
 * @param n - Value to check.
 * @param required - Whether mandatory.
 * @param maxdigits - Maximum number of digits allowed.
 * @returns True if valid.
 */
export function isNumberMaxDigitsWithRequired(n: any, required: boolean, maxdigits: number): boolean;

/**
 * Counts the number of decimal places of a finite number.
 *
 * @param n - Number to evaluate.
 * @returns Number of decimal places.
 */
export function countDecimals(n: number): number;

/**
 * Simple positional string formatter replacing [0], [1], etc. with arguments.
 *
 * @param s - Template string with positional tokens.
 * @param params - Array of replacement values.
 * @returns Formatted string.
 */
export function f(s: string, params?: any[]): string;

/**
 * Checks if a string represents a valid calendar date in ISO format ('YYYY-MM-DD').
 *
 * @param s - Date string to validate.
 * @returns True if valid calendar date in ISO format.
 */
export function isDateIsoString(s: string): boolean;

/**
 * Checks if a string length is within specified minimum and maximum bounds.
 *
 * @param s - String to validate.
 * @param mindigits - Minimum length.
 * @param maxdigits - Maximum length.
 * @returns True if length is within range.
 */
export function isStringWithMaxDigits(s: string, mindigits: number, maxdigits: number): boolean;

/**
 * Checks if a string is a valid UTC datetime aware ISO string ending in 'Z' (e.g. 'YYYY-MM-DDTHH:mm:ssZ').
 *
 * @param s - String to validate.
 * @returns True if valid timezone-aware UTC ISO datetime string.
 */
export function isDatetimeAwareIsoString(s: string): boolean;

/**
 * Returns yesterday's calendar date in ISO format ('YYYY-MM-DD').
 *
 * @returns Yesterday's date string.
 */
export function yesterday_in_isostring(): string;

/**
 * Extracts a property from an array of objects and joins the non-empty values into a delimited string.
 *
 * @param l - Array of objects.
 * @param key - Property key to extract.
 * @param separator - Separator string (default: ', ').
 * @returns Delimited joined string.
 */
export function aoo_to_string(l: Record<string, any>[], key: string, separator?: string): string;

/**
 * Converts an array of numbers or strings into a comma-separated string.
 *
 * @param l - Array of items.
 * @returns Comma-separated string.
 */
export function aoi_to_string(l: (number | string)[]): string;

/**
 * Parses a delimited string of integers into an array of numbers.
 *
 * @param s - Delimited string.
 * @param separator - Delimiter separator (default: ', ').
 * @returns Array of parsed integer numbers.
 */
export function string_to_aoi(s: string, separator?: string): number[];

/**
 * Plucks a specific property key from each object in an array of objects into a new array.
 *
 * @param l - Array of objects.
 * @param key - Property key to pluck.
 * @returns Array of plucked values.
 */
export function aoo_to_array<T = any>(l: Record<string, any>[], key: string): T[];

/**
 * Formats a decimal number as a localized percentage string (e.g. '15.40 %').
 *
 * @param num - Number to format (0.15 = 15%).
 * @param locale - BCP 47 language tag (e.g. 'es-ES', 'en-US').
 * @param decimals - Decimal places (default: 2).
 * @returns Formatted percentage string.
 */
export function percentage_generic_string(num: number | null | undefined, locale: string, decimals?: number): string;

/**
 * Formats a decimal number as an HTML percentage span, using class 'vuered' for negative values.
 *
 * @param num - Number to format.
 * @param locale - BCP 47 language tag.
 * @param decimals - Decimal places (default: 2).
 * @returns HTML span element string.
 */
export function percentage_generic_html(num: number | null | undefined, locale: string, decimals?: number): string;

/**
 * Finds the maximum number of decimal places for a given property across an array of objects.
 *
 * @param lo - Array of objects.
 * @param key - Property key to inspect.
 * @returns Maximum decimal places found.
 */
export function aoo_maxdecimals(lo: Record<string, any>[], key: string): number;

/**
 * Sums the numeric values of a property across an array of objects, rounded to target decimals.
 *
 * @param lo - Array of objects.
 * @param key - Property key to sum.
 * @param decimals - Desired decimal precision. Defaults to max decimals found in array.
 * @returns Rounded sum.
 */
export function aoo_sum(lo: Record<string, any>[], key: string, decimals?: number | null): number;

/**
 * Computes the weighted average of key1 weighted by key2 across an array of objects.
 *
 * @param lo - Array of objects.
 * @param key1 - Value property key.
 * @param key2 - Weight property key.
 * @returns Weighted average.
 */
export function aoo_average_ponderated(lo: Record<string, any>[], key1: string, key2: string): number;

/**
 * Reads a File or Blob (e.g. from Vuetify's v-file-input) and resolves with base64 and mime information.
 *
 * @param file - File or Blob to read.
 * @returns Promise resolving to Base64 representation.
 */
export function getBase64(file: File | Blob): Promise<Base64Result>;

/**
 * Extracts an array of values from a Map catalog.
 *
 * @param catalog - Map to convert.
 * @returns Array of map values.
 */
export function array_from_map<K = any, V = any>(catalog: Map<K, V>): V[];

/**
 * Calculates current age in years today given an ISO birthdate string.
 *
 * @param birth_iso_string - Birth date in ISO format ('YYYY-MM-DD').
 * @returns Age in years.
 */
export function age_today(birth_iso_string: string): number;

/**
 * Calculates age in years on a specific target date given an ISO birthdate string.
 *
 * @param birth_iso_string - Birth date in ISO format ('YYYY-MM-DD').
 * @param date_iso_string - Target date in ISO format.
 * @returns Age in years.
 */
export function age_in_a_date(birth_iso_string: string, date_iso_string: string): number;
