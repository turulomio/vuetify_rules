import locales from '../locales/index.js';

class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        this.language = "en";
        this.resources = {
            en: {},
            es: { ...locales.es },
            fr: { ...locales.fr },
        };
        // Compatible API with i18next (singleton.i18n.t)
        this.i18n = {
            t: this.t.bind(this),
            changeLanguage: this.setLanguage.bind(this),
        };
        Singleton.instance = this;
    }

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

    async initI18N() {
        return Promise.resolve();
    }

    async setLanguage(lang) {
        this.language = lang;
        return Promise.resolve();
    }

    getLanguage() {
        return this.language;
    }

    addTranslations(lang, translations) {
        this.resources[lang] = {
            ...(this.resources[lang] || {}),
            ...translations,
        };
    }
}

const instance = new Singleton();

export default instance;
