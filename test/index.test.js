

import { isNullOrEmpty } from 'vuetify_rules';
console.log(isNullOrEmpty)

describe('isNullOrEmpty', () => {
  test('is null or empty', () => {
    expect(() => {isNullOrEmpty(null)}).tobe(true)})
  })