import { vuetify_rules } from '../index.js';
import assert from "assert"

describe("Functions", () => {
  it('isNullOrEmpty', () => {
    assert.equal(vuetify_rules.isNullOrEmpty(""), true);
    assert.equal(vuetify_rules.isNullOrEmpty(null), true);
    assert.equal(vuetify_rules.isNullOrEmpty(5), false);
    assert.equal(vuetify_rules.isNullOrEmpty(0), false);
  });


  it('isNumber', () => {
      assert.equal(vuetify_rules.isNumber(""),false);
      assert.equal(vuetify_rules.isNumber(null),false);
      assert.equal(vuetify_rules.isNumber(12),true);
      assert.equal(vuetify_rules.isNumber(12.121),true);
      assert.equal(vuetify_rules.isNumber("12"),false);
  })

  it('isNumberWithRequired', () => {
      assert.equal(vuetify_rules.isNumberWithRequired("",true),false);
      assert.equal(vuetify_rules.isNumberWithRequired(null,true),false);
      assert.equal(vuetify_rules.isNumberWithRequired(12,true),true);
      assert.equal(vuetify_rules.isNumberWithRequired(12.121,true),true);
      assert.equal(vuetify_rules.isNumberWithRequired("12",true),false);

      assert.equal(vuetify_rules.isNumberWithRequired("",false),true);
      assert.equal(vuetify_rules.isNumberWithRequired(null,false),true);
      assert.equal(vuetify_rules.isNumberWithRequired(12,false),true);
      assert.equal(vuetify_rules.isNumberWithRequired(12.121,false),true);
      assert.equal(vuetify_rules.isNumberWithRequired("12",false),false);
  })

  it('isNumberMaxDigitsWithRequired', () => {
      assert.equal(vuetify_rules.isNumberMaxDigitsWithRequired("",true,6),false);
      assert.equal(vuetify_rules.isNumberMaxDigitsWithRequired(null,true,6),false);
      assert.equal(vuetify_rules.isNumberMaxDigitsWithRequired(12,true,6),true);
      assert.equal(vuetify_rules.isNumberMaxDigitsWithRequired(12.121,true,6),true);
      assert.equal(vuetify_rules.isNumberMaxDigitsWithRequired("12",true,6),false);
      assert.equal(vuetify_rules.isNumberMaxDigitsWithRequired("",false,6),true);
      assert.equal(vuetify_rules.isNumberMaxDigitsWithRequired(null,false,6),true);
      assert.equal(vuetify_rules.isNumberMaxDigitsWithRequired(12,false,6),true);
      assert.equal(vuetify_rules.isNumberMaxDigitsWithRequired(12.121,false,6),true);
      assert.equal(vuetify_rules.isNumberMaxDigitsWithRequired(12.4567,false,6),false);
      assert.equal(vuetify_rules.isNumberMaxDigitsWithRequired("12",false,6),false);
  })

  it('countDecimals', () => {
      assert.equal(vuetify_rules.countDecimals(""),0);
      assert.equal(vuetify_rules.countDecimals(null),0);
      assert.equal(vuetify_rules.countDecimals(12),0);
      assert.equal(vuetify_rules.countDecimals(12.121),3);
      assert.equal(vuetify_rules.countDecimals(12.123,121),3);
      assert.equal(vuetify_rules.countDecimals(12,123.121),0);
      assert.equal(vuetify_rules.countDecimals("12"),0);
  })


  function validate_rules(value, rules, log=false){
      var r=true
      rules.forEach(f => {
          if (log) console.log(f(value))
          if  (f(value) != true){
              r= false
          }
      });
      return r
      
  }

  it('RulesInteger',() =>{
      assert.equal(validate_rules(12346,  vuetify_rules.RulesInteger(6,true),   false),true);
      assert.equal(validate_rules(1234611,  vuetify_rules.RulesInteger(6,true),   false),false);
      assert.equal(validate_rules("1231",  vuetify_rules.RulesInteger(6,true),   false),false);
      assert.equal(validate_rules(null,  vuetify_rules.RulesInteger(6,true),   false),false);
      assert.equal(validate_rules("",  vuetify_rules.RulesInteger(6,true),   false),false);

      assert.equal(validate_rules(12346,  vuetify_rules.RulesInteger(6,false),   false),true);
      assert.equal(validate_rules(1234611,  vuetify_rules.RulesInteger(6,false),   false),false);
      assert.equal(validate_rules("1231",  vuetify_rules.RulesInteger(6,false),   false),false);
      assert.equal(validate_rules(null,  vuetify_rules.RulesInteger(6,false),   false),true);
      assert.equal(validate_rules("",  vuetify_rules.RulesInteger(6,false),   false),true);
  })


  it('RulesFloat',() =>{
      assert.equal(validate_rules(12346,  vuetify_rules.RulesFloat(6,true,2),   false),true);
      assert.equal(validate_rules(12.46,  vuetify_rules.RulesFloat(6,true,2),   false),true);
      assert.equal(validate_rules(1234611,  vuetify_rules.RulesFloat(6,true,2),   false),false);
      assert.equal(validate_rules("1231",  vuetify_rules.RulesFloat(6,true,2),   false),false);
      assert.equal(validate_rules(null,  vuetify_rules.RulesFloat(6,true,2),   false),false);
      assert.equal(validate_rules("",  vuetify_rules.RulesFloat(6,true,2),   false),false);

      assert.equal(validate_rules(12346,  vuetify_rules.RulesFloat(6,false,2),   false),true);
      assert.equal(validate_rules(12.46,  vuetify_rules.RulesFloat(6,false,2),   false),true);
      assert.equal(validate_rules(1234611,  vuetify_rules.RulesFloat(6,false,2),   false),false);
      assert.equal(validate_rules("1231",  vuetify_rules.RulesFloat(6,false,2),   false),false);
      assert.equal(validate_rules(null,  vuetify_rules.RulesFloat(6,false,2),   false),true);
      assert.equal(validate_rules("",  vuetify_rules.RulesFloat(6,false,2),   false),true);
  })

  it('RulesFloatGZ',() =>{
      assert.equal(validate_rules(12346,  vuetify_rules.RulesFloatGZ(6,true,2),   false),true);
      assert.equal(validate_rules(12.46,  vuetify_rules.RulesFloatGZ(6,true,2),   false),true);
      assert.equal(validate_rules(12.463,  vuetify_rules.RulesFloatGZ(6,true,2),   false),false);
      assert.equal(validate_rules(0,  vuetify_rules.RulesFloatGZ(6,true,2),   false),false);
      assert.equal(validate_rules(-12.46,  vuetify_rules.RulesFloatGZ(6,true,2),   false),false);
      assert.equal(validate_rules(1234611,  vuetify_rules.RulesFloatGZ(6,true,2),   false),false);
      assert.equal(validate_rules("1231",  vuetify_rules.RulesFloatGZ(6,true,2),   false),false);
      assert.equal(validate_rules(null,  vuetify_rules.RulesFloatGZ(6,true,2),   false),false);
      assert.equal(validate_rules("",  vuetify_rules.RulesFloatGZ(6,true,2),   false),false);

      assert.equal(validate_rules(12346,  vuetify_rules.RulesFloatGZ(6,false,2),   false),true);
      assert.equal(validate_rules(12.46,  vuetify_rules.RulesFloatGZ(6,false,2),   false),true);
      assert.equal(validate_rules(12.463,  vuetify_rules.RulesFloatGZ(6,false,2),   false),false);
      assert.equal(validate_rules(0,  vuetify_rules.RulesFloatGZ(6,false,2),   false),false);
      assert.equal(validate_rules(-12.46,  vuetify_rules.RulesFloatGZ(6,false,2),   false),false);
      assert.equal(validate_rules(1234611,  vuetify_rules.RulesFloatGZ(6,false,2),   false),false);
      assert.equal(validate_rules("1231",  vuetify_rules.RulesFloatGZ(6,false,2),   false),false);
      assert.equal(validate_rules(null,  vuetify_rules.RulesFloatGZ(6,false,2),   false),true);
      assert.equal(validate_rules("",  vuetify_rules.RulesFloatGZ(6,false,2),   false),true);
  })

  it('RulesFloatGEZ',() =>{
      assert.equal(validate_rules(12346,  vuetify_rules.RulesFloatGEZ(6,true,2),   false),true);
      assert.equal(validate_rules(12.46,  vuetify_rules.RulesFloatGEZ(6,true,2),   false),true);
      assert.equal(validate_rules(12.463,  vuetify_rules.RulesFloatGEZ(6,true,2),   false),false);
      assert.equal(validate_rules(0,  vuetify_rules.RulesFloatGEZ(6,true,2),   false),true);
      assert.equal(validate_rules(-12.46,  vuetify_rules.RulesFloatGEZ(6,true,2),   false),false);
      assert.equal(validate_rules(1234611,  vuetify_rules.RulesFloatGEZ(6,true,2),   false),false);
      assert.equal(validate_rules("1231",  vuetify_rules.RulesFloatGEZ(6,true,2),   false),false);
      assert.equal(validate_rules(null,  vuetify_rules.RulesFloatGEZ(6,true,2),   false),false);
      assert.equal(validate_rules("",  vuetify_rules.RulesFloatGEZ(6,true,2),   false),false);

      assert.equal(validate_rules(12346,  vuetify_rules.RulesFloatGEZ(6,false,2),   false),true);
      assert.equal(validate_rules(12.46,  vuetify_rules.RulesFloatGEZ(6,false,2),   false),true);
      assert.equal(validate_rules(12.463,  vuetify_rules.RulesFloatGEZ(6,false,2),   false),false);
      assert.equal(validate_rules(0,  vuetify_rules.RulesFloatGEZ(6,false,2),   false),true);
      assert.equal(validate_rules(-12.46,  vuetify_rules.RulesFloatGEZ(6,false,2),   false),false);
      assert.equal(validate_rules(1234611,  vuetify_rules.RulesFloatGEZ(6,false,2),   false),false);
      assert.equal(validate_rules("1231",  vuetify_rules.RulesFloatGEZ(6,false,2),   false),false);
      assert.equal(validate_rules(null,  vuetify_rules.RulesFloatGEZ(6,false,2),   false),true);
      assert.equal(validate_rules("",  vuetify_rules.RulesFloatGEZ(6,false,2),   false),true);
  })

  it('RulesFloatLEZ',() =>{
      assert.equal(validate_rules(-12346,  vuetify_rules.RulesFloatLEZ(6,true,2),   false),true);
      assert.equal(validate_rules(-12.46,  vuetify_rules.RulesFloatLEZ(6,true,2),   false),true);
      assert.equal(validate_rules(-12.463,  vuetify_rules.RulesFloatLEZ(6,true,2),   false),false);
      assert.equal(validate_rules(0,  vuetify_rules.RulesFloatLEZ(6,true,2),   false),true);
      assert.equal(validate_rules(12.46,  vuetify_rules.RulesFloatLEZ(6,true,2),   false),false);
      assert.equal(validate_rules(-1234611,  vuetify_rules.RulesFloatLEZ(6,true,2),   false),false);
      assert.equal(validate_rules("-1231",  vuetify_rules.RulesFloatLEZ(6,true,2),   false),false);
      assert.equal(validate_rules(null,  vuetify_rules.RulesFloatLEZ(6,true,2),   false),false);
      assert.equal(validate_rules("",  vuetify_rules.RulesFloatLEZ(6,true,2),   false),false);

      assert.equal(validate_rules(-12346,  vuetify_rules.RulesFloatLEZ(6,false,2),   false),true);
      assert.equal(validate_rules(-12.46,  vuetify_rules.RulesFloatLEZ(6,false,2),   false),true);
      assert.equal(validate_rules(-12.463,  vuetify_rules.RulesFloatLEZ(6,false,2),   false),false);
      assert.equal(validate_rules(0,  vuetify_rules.RulesFloatLEZ(6,false,2),   false),true);
      assert.equal(validate_rules(12.46,  vuetify_rules.RulesFloatLEZ(6,false,2),   false),false);
      assert.equal(validate_rules(-1234611,  vuetify_rules.RulesFloatLEZ(6,false,2),   false),false);
      assert.equal(validate_rules("-1231",  vuetify_rules.RulesFloatLEZ(6,false,2),   false),false);
      assert.equal(validate_rules(null,  vuetify_rules.RulesFloatLEZ(6,false,2),   false),true);
      assert.equal(validate_rules("",  vuetify_rules.RulesFloatLEZ(6,false,2),   false),true);
  })



  it('RulesDateIsoString',() =>{
      assert.equal(validate_rules("2023-12-12",  vuetify_rules.RulesDateIsoString(true),   false),true);
      assert.equal(validate_rules("2023",  vuetify_rules.RulesDateIsoString(true),   false),false);
      assert.equal(validate_rules("2023-12",  vuetify_rules.RulesDateIsoString(true),   false),false);
      assert.equal(validate_rules("2023-12-32",  vuetify_rules.RulesDateIsoString(true),   false),false);
      assert.equal(validate_rules(2023,  vuetify_rules.RulesDateIsoString(true),   false),false);
      assert.equal(validate_rules(2023.12,  vuetify_rules.RulesDateIsoString(true),   false),false);
      assert.equal(validate_rules("",  vuetify_rules.RulesDateIsoString(true),   false),false);
      assert.equal(validate_rules(null,  vuetify_rules.RulesDateIsoString(true),   false),false);
      assert.equal(validate_rules(0,  vuetify_rules.RulesDateIsoString(true),   false),false);
      assert.equal(validate_rules(new Date(),  vuetify_rules.RulesDateIsoString(true),   false),false);

      assert.equal(validate_rules("2023-12-12",  vuetify_rules.RulesDateIsoString(false),   false),true);
      assert.equal(validate_rules("2023",  vuetify_rules.RulesDateIsoString(false),   false),false);
      assert.equal(validate_rules("2023-12",  vuetify_rules.RulesDateIsoString(false),   false),false);
      assert.equal(validate_rules("2023-12-32",  vuetify_rules.RulesDateIsoString(false),   false),false);
      assert.equal(validate_rules(2023,  vuetify_rules.RulesDateIsoString(false),   false),false);
      assert.equal(validate_rules(2023.12,  vuetify_rules.RulesDateIsoString(false),   false),false);
      assert.equal(validate_rules("",  vuetify_rules.RulesDateIsoString(false),   false),true);
      assert.equal(validate_rules(null,  vuetify_rules.RulesDateIsoString(false),   false),true);
      assert.equal(validate_rules(0,  vuetify_rules.RulesDateIsoString(false),   false),false);
      assert.equal(validate_rules(new Date(),  vuetify_rules.RulesDateIsoString(false),   false),false);
  })

  it('RulesDatetimeAwareIsoString',() =>{
      assert.equal(validate_rules("2016-10-10T15:35:52.764Z",  vuetify_rules.RulesDatetimeAwareIsoString(true),   false),true);
      assert.equal(validate_rules("2023",  vuetify_rules.RulesDatetimeAwareIsoString(true),   false),false);
      assert.equal(validate_rules("2023-12",  vuetify_rules.RulesDatetimeAwareIsoString(true),   false),false);
      assert.equal(validate_rules("2016-10-32T15:35:52.764Z",  vuetify_rules.RulesDatetimeAwareIsoString(true),   false),false);
      assert.equal(validate_rules(2023,  vuetify_rules.RulesDatetimeAwareIsoString(true),   false),false);
      assert.equal(validate_rules(2023.12,  vuetify_rules.RulesDatetimeAwareIsoString(true),   false),false);
      assert.equal(validate_rules("",  vuetify_rules.RulesDatetimeAwareIsoString(true),   false),false);
      assert.equal(validate_rules(null,  vuetify_rules.RulesDatetimeAwareIsoString(true),   false),false);
      assert.equal(validate_rules(0,  vuetify_rules.RulesDatetimeAwareIsoString(true),   false),false);
      assert.equal(validate_rules(new Date(),  vuetify_rules.RulesDatetimeAwareIsoString(true),   false),false);

      assert.equal(validate_rules("2016-10-10T15:35:52.764Z",  vuetify_rules.RulesDatetimeAwareIsoString(false),   false),true);
      assert.equal(validate_rules("2023",  vuetify_rules.RulesDatetimeAwareIsoString(false),   false),false);
      assert.equal(validate_rules("2023-12",  vuetify_rules.RulesDatetimeAwareIsoString(false),   false),false);
      assert.equal(validate_rules("2016-10-32T15:35:52.764Z",  vuetify_rules.RulesDatetimeAwareIsoString(false),   false),false);
      assert.equal(validate_rules(2023,  vuetify_rules.RulesDatetimeAwareIsoString(false),   false),false);
      assert.equal(validate_rules(2023.12,  vuetify_rules.RulesDatetimeAwareIsoString(false),   false),false);
      assert.equal(validate_rules("",  vuetify_rules.RulesDatetimeAwareIsoString(false),   false),true);
      assert.equal(validate_rules(null,  vuetify_rules.RulesDatetimeAwareIsoString(false),   false),true);
      assert.equal(validate_rules(0,  vuetify_rules.RulesDatetimeAwareIsoString(false),   false),false);
      assert.equal(validate_rules(new Date(),  vuetify_rules.RulesDatetimeAwareIsoString(false),   false),false);
  })
});
