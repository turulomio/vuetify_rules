import i18next from "i18next";

class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        this.language = "en";
        this.i18n = i18next;
        Singleton.instance = this;
    }

    async initI18N() {
        await this.i18n.init({
            initImmediate: true,
            debug: false,
            lng: "en",
            fallbackLng: "en",
            resources: {
                en: {
                    translation: {
                        "Email is required": "Email is required",
                        "Field can be empty or a number with {{maxdigits}} digits at most": "Field can be empty or a number with {{maxdigits}} digits at most",
                        "Field must be a number with {{maxdigits}} digits at most": "Field must be a number with {{maxdigits}} digits at most",
                        "Field must be a string between 8 and {{maxdigits}} characters": "Field must be a string between 8 and {{maxdigits}} characters",
                        "Field must be a string representing a date in iso format": "Field must be a string representing a date in iso format",
                        "Field must be a string representing a date time with timezone in iso format": "Field must be a string representing a date time with timezone in iso format",
                        "Field must be a string with at most {{maxdigits}} characters": "Field must be a string with at most {{maxdigits}} characters",
                        "Field must be empty or a string between 8 and {{maxdigits}} characters": "Field must be empty or a string between 8 and {{maxdigits}} characters",
                        "Field must be empty or a string with at most {{maxdigits}} characters": "Field must be empty or a string with at most {{maxdigits}} characters",
                        "Invalid Email address": "Invalid Email address",
                        "Must be a number greater than zero": "Must be a number greater than zero",
                        "Must be a number greater than or equal to zero": "Must be a number greater than or equal to zero",
                        "Must be a number less than or equal to zero": "Must be a number less than or equal to zero",
                        "Must be a number with {{maxdecimals}} decimals places at most": "Must be a number with {{maxdecimals}} decimals places at most",
                        "Must be an integer number": "Must be an integer number",
                        "Selection is required": "Selection is required",
                        "String must be empty or at most {{maxdigits}} characters": "String must be empty or at most {{maxdigits}} characters",
                        "You must select a date": "You must select a date",
                        "You must select date and time": "You must select date and time",
                    }
                },
                es: {
                    translation: {
                        "Email is required": "Se requiere correo electrónico",
                        "Field can be empty or a number with {{maxdigits}} digits at most": "El campo puede estar vacío o ser un número con {{maxdigits}} dígitos como mucho",
                        "Field must be a number with {{maxdigits}} digits at most": "El campo debe ser un número con {{maxdigits}} dígitos como mucho",
                        "Field must be a string between 8 and {{maxdigits}} characters": "El campo debe ser una cadena entre 8 y {{maxdigits}} caracteres",
                        "Field must be a string representing a date in iso format": "El campo debe ser una cadena representando una fecha en formato iso",
                        "Field must be a string representing a date time with timezone in iso format": "El campo debe ser una cadena representando una fecha y una hora en formato iso",
                        "Field must be a string with at most {{maxdigits}} characters": "El campo debe ser una cadena con {{maxdigits}} caracteres como mucho",
                        "Field must be empty or a string between 8 and {{maxdigits}} characters": "El campo puede estar vacío o ser una cadena entre 8 y {{maxdigits}} caracteres",
                        "Field must be empty or a string with at most {{maxdigits}} characters": "El campo puede estar vacío o ser una cadena con {{maxdigits}} caracteres como mucho",
                        "Invalid Email address": "Dirección de correo electrónico inválida",
                        "Must be a number greater than zero": "Debe ser un número mayor que cero",
                        "Must be a number greater than or equal to zero": "Debe ser un número mayor o igual que cero",
                        "Must be a number less than or equal to zero": "Debe ser un número menor o igual que cero",
                        "Must be a number with {{maxdecimals}} decimals places at most": "Debe ser un número con {{maxdecimals}} decimales como mucho",
                        "Must be an integer number": "Debe ser un número entero",
                        "Selection is required": "Se requiere una selección",
                        "String must be empty or at most {{maxdigits}} characters": "La cadena puede estar vacía o tener {{maxdigits}} caracteres como mucho",
                        "You must select a date": "Debe seleccionar una fecha",
                        "You must select date and time": "Debe seleccionar una fecha y una hora",
                    }
                }
            },
            interpolation: {
                escapeValue: false
            }
        });
    }

    async setLanguage(lang) {
        this.language = lang;
        await this.i18n.changeLanguage(this.language);
    }

    getLanguage() {
        return this.language;
    }
}

const instance = new Singleton();
instance.initI18N();

export default instance;
