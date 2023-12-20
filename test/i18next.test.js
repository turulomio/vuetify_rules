import {i18n,change_language} from '../index.js';
import assert from "assert"


var maxdigits=3

describe("i18next", () => {
  it('Translations',() =>{
    change_language("es")
    assert.equal(i18n.t("Invalid Email address"), "Dirección de correo electrónico inválida")
    assert.equal(i18n.t('Field can be empty or a number with {{maxdigits}} digits at most',{maxdigits}), 'El campo puede estar vacío o ser un número con 3 dígitos como mucho')
    change_language("en")
    assert.equal(i18n.t("Invalid Email address"), "Invalid Email address")
  })
})


