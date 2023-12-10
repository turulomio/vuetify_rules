import vuetify_rules  from '../index.js';

//Coverage of the test not of the module

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


  it('my_round', () => {
    assert.equal(vuetify_rules.my_round(1.99, 2),1.99)
    assert.equal(vuetify_rules.my_round(1.999, 2), 2)
    assert.equal(vuetify_rules.my_round(1.001, 2), 1)
    assert.equal(vuetify_rules.my_round("", 2), null)
    assert.equal(vuetify_rules.my_round(0, 2), 0)
    assert.equal(vuetify_rules.my_round(null, 2), null)
    assert.equal(vuetify_rules.my_round(NaN, 2), null)
})

  it ('localtime', () => {
    assert.equal(vuetify_rules.localtime(1.99), null)
    assert.equal(vuetify_rules.localtime(""), null)
    assert.equal(vuetify_rules.localtime(0), null)
    assert.equal(vuetify_rules.localtime(null, 2), null)
    assert.equal(vuetify_rules.localtime(NaN, 2), null)
    assert.equal(vuetify_rules.localtime(Date(2023,1,1,1,1, 2)), null)
    assert.equal(vuetify_rules.localtime("2016"), null)
    assert.equal(vuetify_rules.localtime("2016-10-10T15:35:52.764Z"), "2016-10-10 17:35:52")
    assert.equal(vuetify_rules.localtime("2023-12-10T15:35:52.764Z"), "2023-12-10 16:35:52")
})

});
