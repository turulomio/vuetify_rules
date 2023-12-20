import i18next from "i18next";
import Backend from 'i18next-fs-backend';



export function vuetify_rules_i18next_init(){
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
    vuetify_rules_i18next_change_language(locale)
    return i18next
}

export const vuetify_rules_i18next=vuetify_rules_i18next_init()


export async function vuetify_rules_i18next_change_language( locale) {
    await i18next.changeLanguage(locale)

}