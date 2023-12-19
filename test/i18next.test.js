import {i18n} from '../index.js';
import assert from "assert"



describe("i18next", () => {
  it('Translations',() =>{
    i18n.changeLanguage("es")
    assert.equal(i18n.t("Invalid Email address"), "Dirección de correo electrónico inválida")
    i18n.changeLanguage("en")
    assert.equal(i18n.t("Invalid Email address"), "Invalid Email address")
  })
})


