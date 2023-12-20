import i18next from "i18next";
import Backend from 'i18next-fs-backend';



i18next
    .use(Backend)
    .init({
        initImmediate: false,
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
var locale=Intl.DateTimeFormat().resolvedOptions().locale.slice(0,2)
console.log("VuetifyRules detected language with Intl: ", locale )
await change_language(locale)
export const module_i18next=i18next

export async function change_language( locale) {
    await i18next.changeLanguage(locale)

}