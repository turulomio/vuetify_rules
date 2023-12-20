import {i18n,change_language} from '../index.js';
import assert from "assert"



describe("i18next", () => {
  it('Translations',() =>{
    change_language("es")
    assert.equal(i18n.t("Invalid Email address"), "Dirección de correo electrónico inválida")
    change_language("en")
    assert.equal(i18n.t("Invalid Email address"), "Invalid Email address")
  })
})


