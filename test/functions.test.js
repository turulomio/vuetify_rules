import { vuetify_rules } from '../index.js';

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

});
