import locales from '../locales/index.js';

/**
 * Singleton class managing localization, language state, and message translation.
 */
class Singleton {
    /**
     * Initializes the Singleton instance. Returns existing instance if already created.
     */
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        /** @type {string} Current active language code */
        this.language = "en";
        /** @type {Record<string, Record<string, string>>} Loaded translation resources by language */
        this.resources = {
            en: {},
            es: { ...locales.es },
            fr: { ...locales.fr },
        };
        /**
         * Backward-compatible interface mimicking i18next
         * @type {{ t: function(string, Record<string, *>=): string, changeLanguage: function(string): Promise<void> }}
         */
        this.i18n = {
            t: this.t.bind(this),
            changeLanguage: this.setLanguage.bind(this),
        };
        Singleton.instance = this;
    }

    /**
     * Translates a message key for the active language with variable interpolation.
     * If the translation is missing or untranslated, falls back to the English key.
     *
     * @param {string} key - The English template key (e.g. 'Field must have {{maxdigits}} digits').
     * @param {Record<string, *>} [params={}] - Key-value map of variables to interpolate into `{{var}}`.
     * @returns {string} The translated and interpolated text.
     * @example
     * singleton.t('Field must be a number with {{maxdigits}} digits at most', { maxdigits: 5 });
     */
    t(key, params = {}) {
        const langResources = this.resources[this.language] || {};
        let template = langResources[key];
        if (!template || template.endsWith(' (NOT TRANSLATED)')) {
            template = this.resources.en?.[key] ?? key;
        }
        return template.replace(/\{\{(\w+)\}\}/g, (_, varName) => {
            return params[varName] !== undefined ? String(params[varName]) : `{{${varName}}}`;
        });
    }

    /**
     * Initializes localization asynchronously (kept for backward compatibility).
     *
     * @returns {Promise<void>}
     */
    async initI18N() {
        return Promise.resolve();
    }

    /**
     * Changes the current active language.
     *
     * @param {string} lang - Language code (e.g. 'es', 'en', 'fr').
     * @returns {Promise<void>}
     * @example
     * await singleton.setLanguage('es');
     */
    async setLanguage(lang) {
        this.language = lang;
        return Promise.resolve();
    }

    /**
     * Returns the currently active language code.
     *
     * @returns {string} Current language code (e.g. 'en', 'es').
     */
    getLanguage() {
        return this.language;
    }

    /**
     * Registers or merges external translations for a specific language catalog.
     *
     * @param {string} lang - Target language code.
     * @param {Record<string, string>} translations - Dictionary of key-value translation strings.
     * @example
     * singleton.addTranslations('de', { 'Must be an integer number': 'Muss eine ganze Zahl sein' });
     */
    addTranslations(lang, translations) {
        this.resources[lang] = {
            ...(this.resources[lang] || {}),
            ...translations,
        };
    }
}

const instance = new Singleton();

export default instance;
