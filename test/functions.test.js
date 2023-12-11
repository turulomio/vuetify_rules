import {
  capitalizeFirstLetter,
  ifnullempty,
  isDateIsoString,
  isNullOrEmpty,
  isNumber,
  isNumberWithRequired,
  isNumberMaxDigitsWithRequired,
  countDecimals,
  my_round,
  localtime
}  from '../index.js';



//Coverage of the test not of the module

import assert from "assert"

describe("Functions", () => {
  it('isNullOrEmpty', () => {
    assert.equal(isNullOrEmpty(""), true);
    assert.equal(isNullOrEmpty(null), true);
    assert.equal(isNullOrEmpty(5), false);
    assert.equal(isNullOrEmpty(0), false);
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


  it('my_round', () => {
    assert.equal(my_round(1.99, 2),1.99)
    assert.equal(my_round(1.999, 2), 2)
    assert.equal(my_round(1.001, 2), 1)
    assert.equal(my_round("", 2), null)
    assert.equal(my_round(0, 2), 0)
    assert.equal(my_round(null, 2), null)
    assert.equal(my_round(NaN, 2), null)
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

  it ('capitalizeFirstLetter', () => {
    assert.equal(capitalizeFirstLetter("turulomio"), "Turulomio")
    assert.equal(capitalizeFirstLetter("Turulomio"), "Turulomio")
    assert.equal(capitalizeFirstLetter(""), "")
    assert.throws(() => capitalizeFirstLetter(null),TypeError)
    assert.throws(() => capitalizeFirstLetter(1.99),TypeError)
  })

});
