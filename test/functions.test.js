import { vuetify_rules } from '../index.js';
import assert from "assert"

describe("Functions", () => {
  it('isNullOrEmpty', () => {
    assert.equal(vuetify_rules.isNullOrEmpty( 5), false);
  });
});