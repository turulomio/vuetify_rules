import { describe, it } from 'node:test';
import singleton from "../src/singleton.js";
import assert from "assert";
import { RulesString, RulesFloatGEZ, RulesFloatLEZ } from "../index.js";

var maxdigits=3

describe("i18next", () => {
  it('Translations', async () =>{
    await singleton.setLanguage("es")
    assert.equal(singleton.i18n.t("Invalid Email address"), "Dirección de correo electrónico inválida")
    assert.equal(singleton.i18n.t('Field can be empty or a number with {{maxdigits}} digits at most',{maxdigits}), 'El campo puede estar vacío o ser un número con 3 dígitos como mucho')
    assert.equal(singleton.i18n.t('Must be a number greater than or equal to zero'), 'Debe ser un número mayor o igual que cero')
    assert.equal(singleton.i18n.t('Must be a number less than or equal to zero'), 'Debe ser un número menor o igual que cero')
    await singleton.setLanguage("en")
    assert.equal(singleton.i18n.t("Invalid Email address"), "Invalid Email address")
  })

  it('Dynamic translations in pre-created rules', async () => {
    // Create rule when language is en
    await singleton.setLanguage("en")
    const stringRule = RulesString(5, true)[0]
    const gezRule = RulesFloatGEZ(5, true, 2)[1]
    const lezRule = RulesFloatLEZ(5, true, 2)[1]

    assert.equal(stringRule("too-long-text"), "Field must be a string with at most 5 characters")
    assert.equal(gezRule(-1), "Must be a number greater than or equal to zero")
    assert.equal(lezRule(1), "Must be a number less than or equal to zero")

    // Switch language to es and re-evaluate the same rule
    await singleton.setLanguage("es")
    assert.equal(stringRule("too-long-text"), "El campo debe ser una cadena con 5 caracteres como mucho")
    assert.equal(gezRule(-1), "Debe ser un número mayor o igual que cero")
    assert.equal(lezRule(1), "Debe ser un número menor o igual que cero")

    // Reset back to en
    await singleton.setLanguage("en")
  })

  it('addTranslations and getLanguage', async () => {
    singleton.addTranslations('fr', {
      'Invalid Email address': 'Adresse e-mail invalide'
    })
    await singleton.setLanguage('fr')
    assert.equal(singleton.getLanguage(), 'fr')
    assert.equal(singleton.i18n.t('Invalid Email address'), 'Adresse e-mail invalide')
    // Falls back to en if missing in fr
    assert.equal(singleton.i18n.t('Selection is required'), 'Selection is required')

    await singleton.setLanguage('en')
    assert.equal(singleton.getLanguage(), 'en')
  })
})



