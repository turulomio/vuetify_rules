export type ValidationRule = (value: any) => boolean | string;

export interface Base64Result {
  jsimage: string;
  image: string;
  mime: string;
}

export interface SingletonInstance {
  language: string;
  i18n: any;
  initI18N(): Promise<void>;
  setLanguage(lang: string): Promise<void>;
  getLanguage(): string;
}

export const singleton: SingletonInstance;

// Validation Rules
export function RulesInteger(maxdigits: number, required: boolean): ValidationRule[];
export function RulesFloat(maxdigits: number, required: boolean, maxdecimals: number): ValidationRule[];
export function RulesFloatGZ(maxdigits: number, required: boolean, maxdecimals: number): ValidationRule[];
export function RulesFloatGEZ(maxdigits: number, required: boolean, maxdecimals: number): ValidationRule[];
export function RulesFloatLEZ(maxdigits: number, required: boolean, maxdecimals: number): ValidationRule[];
export function RulesDateIsoString(required: boolean): ValidationRule[];
export function RulesDatetimeAwareIsoString(required: boolean): ValidationRule[];
/** @deprecated RulesDatetime should change to RulesDatetimeAwareIsoString */
export function RulesDatetime(required: boolean): ValidationRule[];
/** @deprecated RulesDate should change to RulesDateIsoString */
export function RulesDate(required: boolean): ValidationRule[];
export function RulesString(maxdigits: number, required: boolean): ValidationRule[];
export function RulesPassword(maxdigits: number, required: boolean): ValidationRule[];
export function RulesSelection(required: boolean): ValidationRule[];
export function RulesEmail(required: boolean): ValidationRule[];

// Helper Functions
export function round(value: number, decimals?: number): number;
export function localtime(value: string): string;
export function parseNumber(value: string | number): number;
export function ifnullempty<T>(value: T): T | "";
export function isNoE(n: any): boolean;
export function isNumber(n: any): boolean;
export function isNumberWithRequired(n: any, required: boolean): boolean;
export function isNumberMaxDigitsWithRequired(n: any, required: boolean, maxdigits: number): boolean;
export function countDecimals(n: number): number;
export function f(s: string, params?: any[]): string;
export function isDateIsoString(s: string): boolean;
export function isStringWithMaxDigits(s: string, mindigits: number, maxdigits: number): boolean;
export function isDatetimeAwareIsoString(s: string): boolean;
export function yesterday_in_isostring(): string;
export function aoo_to_string(l: Record<string, any>[], key: string, separator?: string): string;
export function aoi_to_string(l: (number | string)[]): string;
export function string_to_aoi(s: string, separator?: string): number[];
export function aoo_to_array<T = any>(l: Record<string, any>[], key: string): T[];
export function percentage_generic_string(num: number | null | undefined, locale: string, decimals?: number): string;
export function percentage_generic_html(num: number | null | undefined, locale: string, decimals?: number): string;
export function aoo_maxdecimals(lo: Record<string, any>[], key: string): number;
export function aoo_sum(lo: Record<string, any>[], key: string, decimals?: number | null): number;
export function aoo_average_ponderated(lo: Record<string, any>[], key1: string, key2: string): number;
export function getBase64(file: File | Blob): Promise<Base64Result>;
export function array_from_map<K = any, V = any>(catalog: Map<K, V>): V[];
export function age_today(birth_iso_string: string): number;
export function age_in_a_date(birth_iso_string: string, date_iso_string: string): number;
