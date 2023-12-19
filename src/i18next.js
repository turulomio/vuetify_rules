import i18next from "i18next";
import Backend from 'i18next-fs-backend';



i18next
    .use(Backend)
    .init({
        debug: false,  
        lng: [
            'en',
            'es',
            'fr',
         ],
        backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json',
            // path to post missing resources
            addPath: './locales/{{lng}}/{{ns}}.missing.json',
          },  
        fallbackLng: "en"
    });

i18next.changeLanguage(Intl.DateTimeFormat().resolvedOptions().locale)
export const module_i18next=i18next