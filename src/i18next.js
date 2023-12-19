import i18next from "i18next";
// import resourcesToBackend from 'i18next-resources-to-backend';

  
i18next
    // .use(resourcesToBackend((language, namespace) => import(`../../i18n/${language}/${namespace}.json`)))
    .init({
        lng: 'en', // if you're using a language detector, do not define the lng option
        debug: true,    
        fallbackLng: "en"
    });

export const i18n=i18next