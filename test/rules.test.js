import {RulesInteger,RulesFloat,RulesFloatGEZ,RulesFloatLEZ,RulesFloatGZ,RulesDatetimeAwareIsoString,RulesDateIsoString} from '../index.js';
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

function test_rules(value,rules){
    for (let index = 0; index < rules.length; index++) {
        if (rules[index](value)!=true){
            return rules[index](value)
        }
    }
    return true
}

describe("Rules", () => {
    it('RulesInteger',() =>{
        assert.equal(test_rules(123456, RulesInteger(6,true)),true)
        assert.equal(test_rules(1234526, RulesInteger(6,true)), 'Field must be a number with 6 digits at most')
        assert.equal(test_rules("1231", RulesInteger(6,true)),'Field must be a number with 6 digits at most')
        assert.equal(test_rules(null, RulesInteger(6,true)),'Field must be a number with 6 digits at most')
        assert.equal(test_rules("", RulesInteger(6,true)),'Field must be a number with 6 digits at most')

        assert.equal(test_rules(123456, RulesInteger(6,false)),true)
        assert.equal(test_rules(1234526, RulesInteger(6,false)), 'Field can be empty or a number with 6 digits at most')
        assert.equal(test_rules("1231", RulesInteger(3,false)),'Field can be empty or a number with 3 digits at most')
        assert.equal(test_rules(null, RulesInteger(6,false)), true)
        assert.equal(test_rules("", RulesInteger(6,false)), true)

    })


    it('RulesFloat',() =>{
        assert.equal(validate_rules(12346,  RulesFloat(6,true,2),   false),true);
        assert.equal(validate_rules(12.46,  RulesFloat(6,true,2),   false),true);
        assert.equal(validate_rules(1234611,  RulesFloat(6,true,2),   false),false);
        assert.equal(validate_rules("1231",  RulesFloat(6,true,2),   false),false);
        assert.equal(validate_rules(null,  RulesFloat(6,true,2),   false),false);
        assert.equal(validate_rules("",  RulesFloat(6,true,2),   false),false);

        assert.equal(validate_rules(12346,  RulesFloat(6,false,2),   false),true);
        assert.equal(validate_rules(12.46,  RulesFloat(6,false,2),   false),true);
        assert.equal(validate_rules(1234611,  RulesFloat(6,false,2),   false),false);
        assert.equal(validate_rules("1231",  RulesFloat(6,false,2),   false),false);
        assert.equal(validate_rules(null,  RulesFloat(6,false,2),   false),true);
        assert.equal(validate_rules("",  RulesFloat(6,false,2),   false),true);
    })

    it('RulesFloatGZ',() =>{
        assert.equal(validate_rules(12346,  RulesFloatGZ(6,true,2),   false),true);
        assert.equal(validate_rules(12.46,  RulesFloatGZ(6,true,2),   false),true);
        assert.equal(validate_rules(12.463,  RulesFloatGZ(6,true,2),   false),false);
        assert.equal(validate_rules(0,  RulesFloatGZ(6,true,2),   false),false);
        assert.equal(validate_rules(-12.46,  RulesFloatGZ(6,true,2),   false),false);
        assert.equal(validate_rules(1234611,  RulesFloatGZ(6,true,2),   false),false);
        assert.equal(validate_rules("1231",  RulesFloatGZ(6,true,2),   false),false);
        assert.equal(validate_rules(null,  RulesFloatGZ(6,true,2),   false),false);
        assert.equal(validate_rules("",  RulesFloatGZ(6,true,2),   false),false);

        assert.equal(validate_rules(12346,  RulesFloatGZ(6,false,2),   false),true);
        assert.equal(validate_rules(12.46,  RulesFloatGZ(6,false,2),   false),true);
        assert.equal(validate_rules(12.463,  RulesFloatGZ(6,false,2),   false),false);
        assert.equal(validate_rules(0,  RulesFloatGZ(6,false,2),   false),false);
        assert.equal(validate_rules(-12.46,  RulesFloatGZ(6,false,2),   false),false);
        assert.equal(validate_rules(1234611,  RulesFloatGZ(6,false,2),   false),false);
        assert.equal(validate_rules("1231",  RulesFloatGZ(6,false,2),   false),false);
        assert.equal(validate_rules(null,  RulesFloatGZ(6,false,2),   false),true);
        assert.equal(validate_rules("",  RulesFloatGZ(6,false,2),   false),true);

    })

    it('RulesFloatGEZ',() =>{
        assert.equal(validate_rules(12346,  RulesFloatGEZ(6,true,2),   false),true);
        assert.equal(validate_rules(12.46,  RulesFloatGEZ(6,true,2),   false),true);
        assert.equal(validate_rules(12.463,  RulesFloatGEZ(6,true,2),   false),false);
        assert.equal(validate_rules(0,  RulesFloatGEZ(6,true,2),   false),true);
        assert.equal(validate_rules(-12.46,  RulesFloatGEZ(6,true,2),   false),false);
        assert.equal(validate_rules(1234611,  RulesFloatGEZ(6,true,2),   false),false);
        assert.equal(validate_rules("1231",  RulesFloatGEZ(6,true,2),   false),false);
        assert.equal(validate_rules(null,  RulesFloatGEZ(6,true,2),   false),false);
        assert.equal(validate_rules("",  RulesFloatGEZ(6,true,2),   false),false);

        assert.equal(validate_rules(12346,  RulesFloatGEZ(6,false,2),   false),true);
        assert.equal(validate_rules(12.46,  RulesFloatGEZ(6,false,2),   false),true);
        assert.equal(validate_rules(12.463,  RulesFloatGEZ(6,false,2),   false),false);
        assert.equal(validate_rules(0,  RulesFloatGEZ(6,false,2),   false),true);
        assert.equal(validate_rules(-12.46,  RulesFloatGEZ(6,false,2),   false),false);
        assert.equal(validate_rules(1234611,  RulesFloatGEZ(6,false,2),   false),false);
        assert.equal(validate_rules("1231",  RulesFloatGEZ(6,false,2),   false),false);
        assert.equal(validate_rules(null,  RulesFloatGEZ(6,false,2),   false),true);
        assert.equal(validate_rules("",  RulesFloatGEZ(6,false,2),   false),true);
    })

    it('RulesFloatLEZ',() =>{
        assert.equal(validate_rules(-12346,  RulesFloatLEZ(6,true,2),   false),true);
        assert.equal(validate_rules(-12.46,  RulesFloatLEZ(6,true,2),   false),true);
        assert.equal(validate_rules(-12.463,  RulesFloatLEZ(6,true,2),   false),false);
        assert.equal(validate_rules(0,  RulesFloatLEZ(6,true,2),   false),true);
        assert.equal(validate_rules(12.46,  RulesFloatLEZ(6,true,2),   false),false);
        assert.equal(validate_rules(-1234611,  RulesFloatLEZ(6,true,2),   false),false);
        assert.equal(validate_rules("-1231",  RulesFloatLEZ(6,true,2),   false),false);
        assert.equal(validate_rules(null,  RulesFloatLEZ(6,true,2),   false),false);
        assert.equal(validate_rules("",  RulesFloatLEZ(6,true,2),   false),false);

        assert.equal(validate_rules(-12346,  RulesFloatLEZ(6,false,2),   false),true);
        assert.equal(validate_rules(-12.46,  RulesFloatLEZ(6,false,2),   false),true);
        assert.equal(validate_rules(-12.463,  RulesFloatLEZ(6,false,2),   false),false);
        assert.equal(validate_rules(0,  RulesFloatLEZ(6,false,2),   false),true);
        assert.equal(validate_rules(12.46,  RulesFloatLEZ(6,false,2),   false),false);
        assert.equal(validate_rules(-1234611,  RulesFloatLEZ(6,false,2),   false),false);
        assert.equal(validate_rules("-1231",  RulesFloatLEZ(6,false,2),   false),false);
        assert.equal(validate_rules(null,  RulesFloatLEZ(6,false,2),   false),true);
        assert.equal(validate_rules("",  RulesFloatLEZ(6,false,2),   false),true);
    })



    it('RulesDateIsoString',() =>{
        assert.equal(validate_rules("2023-12-12",  RulesDateIsoString(true),   false),true);
        assert.equal(validate_rules("2023",  RulesDateIsoString(true),   false),false);
        assert.equal(validate_rules("2023-12",  RulesDateIsoString(true),   false),false);
        assert.equal(validate_rules("2023-12-32",  RulesDateIsoString(true),   false),false);
        assert.equal(validate_rules(2023,  RulesDateIsoString(true),   false),false);
        assert.equal(validate_rules(2023.12,  RulesDateIsoString(true),   false),false);
        assert.equal(validate_rules("",  RulesDateIsoString(true),   false),false);
        assert.equal(validate_rules(null,  RulesDateIsoString(true),   false),false);
        assert.equal(validate_rules(0,  RulesDateIsoString(true),   false),false);
        assert.equal(validate_rules(new Date(),  RulesDateIsoString(true),   false),false);

        assert.equal(validate_rules("2023-12-12",  RulesDateIsoString(false),   false),true);
        assert.equal(validate_rules("2023",  RulesDateIsoString(false),   false),false);
        assert.equal(validate_rules("2023-12",  RulesDateIsoString(false),   false),false);
        assert.equal(validate_rules("2023-12-32",  RulesDateIsoString(false),   false),false);
        assert.equal(validate_rules(2023,  RulesDateIsoString(false),   false),false);
        assert.equal(validate_rules(2023.12,  RulesDateIsoString(false),   false),false);
        assert.equal(validate_rules("",  RulesDateIsoString(false),   false),true);
        assert.equal(validate_rules(null,  RulesDateIsoString(false),   false),true);
        assert.equal(validate_rules(0,  RulesDateIsoString(false),   false),false);
        assert.equal(validate_rules(new Date(),  RulesDateIsoString(false),   false),false);
    })

    it('RulesDatetimeAwareIsoString',() =>{
        assert.equal(validate_rules("2016-10-10T15:35:52.764Z",  RulesDatetimeAwareIsoString(true),   false),true);
        assert.equal(validate_rules("2023",  RulesDatetimeAwareIsoString(true),   false),false);
        assert.equal(validate_rules("2023-12",  RulesDatetimeAwareIsoString(true),   false),false);
        assert.equal(validate_rules("2016-10-32T15:35:52.764Z",  RulesDatetimeAwareIsoString(true),   false),false);
        assert.equal(validate_rules(2023,  RulesDatetimeAwareIsoString(true),   false),false);
        assert.equal(validate_rules(2023.12,  RulesDatetimeAwareIsoString(true),   false),false);
        assert.equal(validate_rules("",  RulesDatetimeAwareIsoString(true),   false),false);
        assert.equal(validate_rules(null,  RulesDatetimeAwareIsoString(true),   false),false);
        assert.equal(validate_rules(0,  RulesDatetimeAwareIsoString(true),   false),false);
        assert.equal(validate_rules(new Date(),  RulesDatetimeAwareIsoString(true),   false),false);

        assert.equal(validate_rules("2016-10-10T15:35:52.764Z",  RulesDatetimeAwareIsoString(false),   false),true);
        assert.equal(validate_rules("2023",  RulesDatetimeAwareIsoString(false),   false),false);
        assert.equal(validate_rules("2023-12",  RulesDatetimeAwareIsoString(false),   false),false);
        assert.equal(validate_rules("2016-10-32T15:35:52.764Z",  RulesDatetimeAwareIsoString(false),   false),false);
        assert.equal(validate_rules(2023,  RulesDatetimeAwareIsoString(false),   false),false);
        assert.equal(validate_rules(2023.12,  RulesDatetimeAwareIsoString(false),   false),false);
        assert.equal(validate_rules("",  RulesDatetimeAwareIsoString(false),   false),true);
        assert.equal(validate_rules(null,  RulesDatetimeAwareIsoString(false),   false),true);
        assert.equal(validate_rules(0,  RulesDatetimeAwareIsoString(false),   false),false);
        assert.equal(validate_rules(new Date(),  RulesDatetimeAwareIsoString(false),   false),false);
    })
});
