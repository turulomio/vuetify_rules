
import {
  ifnullempty,
  isDateIsoString,
  isNoE,
  isNumber,
  isNumberWithRequired,
  isNumberMaxDigitsWithRequired,
  isStringWithMaxDigits,
  countDecimals,
  localtime,
  parseNumber
}  from '../index.js';



//Coverage of the test not of the module

import assert from "assert"

describe("Functions", () => {
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

});
