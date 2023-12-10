import vuetify_rules from '../index.js';
import assert from "assert"

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

describe("Rules", () => {
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
