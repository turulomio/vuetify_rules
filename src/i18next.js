import i18next from "i18next";
i18next.init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
    en: {
        translation: {
            "key": "hello world translated"
        }
    }
    }
});

export const i18n=i18next