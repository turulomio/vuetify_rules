import { describe, it, beforeEach } from 'node:test';
import assert from "assert";
import {
  aoo_to_string,
  aoo_sum,
  aoo_maxdecimals,
  aoo_to_array,
  aoo_average_ponderated,
  array_from_map,
  age_in_a_date,
  percentage_generic_string,
  percentage_generic_html,
  round,
  ifnullempty,
  isDateIsoString,
  isNoE,
  isNumber,
  isNumberWithRequired,
  isNumberMaxDigitsWithRequired,
  countDecimals,
  isStringWithMaxDigits,
  localtime,
  parseNumber,
  yesterday_in_isostring
}  from '../src/functions.js';

describe("Functions", () => {

  let aoo
  beforeEach(
    function (){
      aoo=[
        {a:3,b:null, c:1.12, d:new Date()},
        {a:2,b:null, c:3.12, d:new Date()},
        {a:1,b:3, c:2.12, d:new Date()},
      ]
    }
  )


  it('isNoE', () => {
    assert.equal(isNoE(""), true);
    assert.equal(isNoE(null), true);
    assert.equal(isNoE(5), false);
    assert.equal(isNoE(0), false);
  });


  it('ifnullempty', () => {
    assert.equal(ifnullempty(""),"");
    assert.equal(ifnullempty(null),"");
    assert.equal(ifnullempty(12),12);
    assert.equal(ifnullempty(12.121),12.121);
    assert.equal(ifnullempty("12"),"12");
  })


  it('isDateIsoString', () => {
    assert.equal(isDateIsoString(""),false);
    assert.equal(isDateIsoString(null),false);
    assert.equal(isDateIsoString(12),false);
    assert.equal(isDateIsoString("12"),false);
    assert.equal(isDateIsoString("12-12-12"),false);
    assert.equal(isDateIsoString("12-14-12"),false);
    assert.equal(isDateIsoString("2023-11"),false);
    assert.equal(isDateIsoString("2023-1-1"),false);
    assert.equal(isDateIsoString("2023-01-01"),true);
  })

  it('isNumber', () => {
    assert.equal(isNumber(""),false);
    assert.equal(isNumber(null),false);
    assert.equal(isNumber(12),true);
    assert.equal(isNumber(12.121),true);
    assert.equal(isNumber("12"),false);
  })

  it('isNumberWithRequired', () => {
      assert.equal(isNumberWithRequired("",true),false);
      assert.equal(isNumberWithRequired(null,true),false);
      assert.equal(isNumberWithRequired(12,true),true);
      assert.equal(isNumberWithRequired(12.121,true),true);
      assert.equal(isNumberWithRequired("12",true),false);

      assert.equal(isNumberWithRequired("",false),true);
      assert.equal(isNumberWithRequired(null,false),true);
      assert.equal(isNumberWithRequired(12,false),true);
      assert.equal(isNumberWithRequired(12.121,false),true);
      assert.equal(isNumberWithRequired("12",false),false);
  })

  it('isNumberMaxDigitsWithRequired', () => {
      assert.equal(isNumberMaxDigitsWithRequired("",true,6),false);
      assert.equal(isNumberMaxDigitsWithRequired(null,true,6),false);
      assert.equal(isNumberMaxDigitsWithRequired(12,true,6),true);
      assert.equal(isNumberMaxDigitsWithRequired(12.121,true,6),true);
      assert.equal(isNumberMaxDigitsWithRequired("12",true,6),false);
      assert.equal(isNumberMaxDigitsWithRequired("",false,6),true);
      assert.equal(isNumberMaxDigitsWithRequired(null,false,6),true);
      assert.equal(isNumberMaxDigitsWithRequired(12,false,6),true);
      assert.equal(isNumberMaxDigitsWithRequired(12.121,false,6),true);
      assert.equal(isNumberMaxDigitsWithRequired(12.4567,false,6),false);
      assert.equal(isNumberMaxDigitsWithRequired("12",false,6),false);
  })

  it('countDecimals', () => {
      assert.equal(countDecimals(""),0);
      assert.equal(countDecimals(null),0);
      assert.equal(countDecimals(12),0);
      assert.equal(countDecimals(12.121),3);
      assert.equal(countDecimals(12.123,121),3);
      assert.equal(countDecimals(12,123.121),0);
      assert.equal(countDecimals("12"),0);
  })


  it ('localtime', () => {
    assert.equal(localtime(1.99), "")
    assert.equal(localtime(""), "")
    assert.equal(localtime(0), "")
    assert.equal(localtime("", 2), "")
    assert.equal(localtime(NaN, 2), "")
    assert.equal(localtime(Date(2023,1,1,1,1, 2)), "")
    assert.equal(localtime("2016"), "")
    assert.equal(localtime("2016-10-10T15:35:52.764Z").slice(14,19), "35:52") //Due to github localzone, automatic tests
    assert.equal(localtime("2023-12-10T15:35:52.764Z").slice(14,19), "35:52")
  })  

  it('parseNumber', () => {
    assert.equal(parseNumber(""), NaN);
    assert.equal(parseNumber(null),NaN);
    assert.equal(parseNumber(12),12);
    assert.equal(parseNumber(12.121),12.121);
    assert.equal(parseNumber("12"),"12");
    assert.equal(parseNumber("12.2"), 12.2);
    assert.equal(parseNumber("12,2"), 12.2);
    assert.equal(parseNumber("12.2"), 12.2);
    assert.equal(parseNumber("1,112.2"), NaN);
    assert.equal(parseNumber("1.112,2"), NaN);
  })

  it('isStringWithMaxDigits', () => {
    assert.equal(isStringWithMaxDigits("",0,100), true);
    assert.equal(isStringWithMaxDigits("",1,100), false);
    assert.equal(isStringWithMaxDigits("Hi",0,1), false);
    assert.equal(isStringWithMaxDigits("Hi",1,2), true);
    assert.equal(isStringWithMaxDigits(12, 0, 100), false);
    assert.equal(isStringWithMaxDigits(12.121, 1, 4), false);
    assert.equal(isStringWithMaxDigits(null, 0, 100), false);
  })

  it('yesterday_in_isostring', () => {
    assert.ok(typeof yesterday_in_isostring() === "string", "Value is not a string")    
  })

  it('aoo_to_string', () => {
    assert.equal( aoo_to_string(aoo, "a"), "3, 2, 1" , "String is not generated correctly")    
  })

  it('aoo_maxdecimals', () => {
    assert.equal(aoo_maxdecimals(aoo, "c"), 2)
    assert.equal(aoo_maxdecimals([{ a: 1.1234 }, { a: 2.1 }], "a"), 4)
  })

  it('aoo_sum', () => {
    // Tests auto maxdecimals resolution (default decimals=null)
    assert.equal(aoo_sum(aoo, "c"), 6.36)
    assert.equal(aoo_sum(aoo, "a"), 6)
    assert.equal(aoo_sum([], "a"), 0)
    assert.equal(aoo_sum(aoo, "c", 1), 6.4)
  })

  it('aoo_to_array', () => {
    assert.deepEqual(aoo_to_array(aoo, "a"), [3, 2, 1])
  })

  it('aoo_average_ponderated', () => {
    const list = [
      { grade: 8, weight: 2 },
      { grade: 10, weight: 3 }
    ]
    // (8*2 + 10*3) / (2+3) = 46 / 5 = 9.2
    assert.equal(aoo_average_ponderated(list, "grade", "weight"), 9.2)
    assert.equal(aoo_average_ponderated([], "grade", "weight"), 0)
  })

  it('array_from_map', () => {
    const map = new Map([['a', 1], ['b', 2]])
    assert.deepEqual(array_from_map(map), [1, 2])
  })

  it('age_in_a_date', () => {
    assert.equal(age_in_a_date("2000-05-15", "2020-05-15"), 20)
    assert.equal(age_in_a_date("2000-05-15", "2020-05-14"), 19)
    assert.equal(age_in_a_date("2000-05-15", "2020-05-16"), 20)
  })

  it('percentage_generic_string', () => {
    assert.equal(percentage_generic_string(0.255, "en", 2), "25.50 %")
    assert.equal(percentage_generic_string(null, "en", 2), "- - - %")
    assert.equal(percentage_generic_string(NaN, "en", 2), "- - - %")
  })

  it('percentage_generic_html', () => {
    assert.equal(percentage_generic_html(0.255, "en", 2), "<span>25.50 %</span>")
    assert.equal(percentage_generic_html(-0.15, "en", 2), "<span class='vuered'>-15.00 %</span>")
    assert.equal(percentage_generic_html(null, "en", 2), "- - - %")
  })

  it('round', () => {
    assert.equal(round(1.125, 2), 1.13)
    assert.equal(round(1.124, 2), 1.12)
    assert.equal(round(10.5, 0), 11)
  })

});
