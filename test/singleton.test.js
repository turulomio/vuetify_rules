import singleton from "../src/singleton.js"
import assert from "assert"


var maxdigits=3


describe("i18next", () => {
  it('Translations', async () =>{

    console.log("tests", singleton)
    await singleton.setLanguage("es")
    assert.equal(singleton.i18n.t("Invalid Email address"), "Dirección de correo electrónico inválida")
    assert.equal(singleton.i18n.t('Field can be empty or a number with {{maxdigits}} digits at most',{maxdigits}), 'El campo puede estar vacío o ser un número con 3 dígitos como mucho')
    await singleton.setLanguage("en")
    assert.equal(singleton.i18n.t("Invalid Email address"), "Invalid Email address")
  })
})


