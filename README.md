# vuetify_rules

Rules to validate forms with vuetify

## Installation

```bash
npm install vuetify_rules
```

## Usage with Vuetify

```vue
<template>
  <v-form>
    <!-- Integer rule: max 6 digits, required -->
    <v-text-field
      v-model.number="age"
      label="Age"
      :rules="RulesInteger(6, true)"
    />

    <!-- Float rule: max 8 digits, required, max 2 decimals -->
    <v-text-field
      v-model.number="price"
      label="Price"
      :rules="RulesFloat(8, true, 2)"
    />

    <!-- String rule: max 50 characters, optional -->
    <v-text-field
      v-model="description"
      label="Description"
      :rules="RulesString(50, false)"
    />

    <!-- Date ISO string rule: required (YYYY-MM-DD) -->
    <v-text-field
      v-model="birthDate"
      label="Birth Date"
      :rules="RulesDateIsoString(true)"
    />
  </v-form>
</template>

<script setup>
import {
  RulesInteger,
  RulesFloat,
  RulesString,
  RulesDateIsoString,
  singleton
} from 'vuetify_rules';

// Change language dynamically at runtime
// await singleton.setLanguage('es');
</script>
```

## Links

- Project page: https://github.com/turulomio/vuetify_rules/
- NPM page: https://www.npmjs.com/package/vuetify_rules

## CHANGELOG

### 0.8.0 (Unreleased)
- Removed `moment-timezone` and `lodash-es` dependencies for ultra-lightweight bundle size with Vite.
- Added TypeScript declarations (`index.d.ts`) for full IDE autocompletion.
- Added package `"exports"` map and `"sideEffects": false` for optimal tree-shaking.
- Migrated test and coverage runners to Node.js native test runner (zero test dependencies).
- Fixed `aoo_sum` missing function bug (`listobjects_maxdecimals` -> `aoo_maxdecimals`).
- Fixed error messages in `RulesFloatGEZ` and `RulesFloatLEZ`.
- Made i18n rule message evaluation reactive to dynamic language changes.
- Modernized codebase to ES6+ with strict equality and native Date/Array methods.

### 0.7.0 (2024-06-20)
- I18N works with internal resources
- Added more tests

### 0.6.0 (2023-12-20)
- Removed await from root

### 0.5.0 (2023-12-20)
- Added i18n with i18next

### 0.4.0 (2023-12-10)
- Basic functionality