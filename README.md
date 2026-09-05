# vuetify_rules

[![npm version](https://img.shields.io/npm/v/vuetify_rules.svg)](https://www.npmjs.com/package/vuetify_rules)
[![npm downloads](https://img.shields.io/npm/dm/vuetify_rules.svg)](https://www.npmjs.com/package/vuetify_rules)
[![npm total downloads](https://img.shields.io/npm/dt/vuetify_rules.svg)](https://www.npmjs.com/package/vuetify_rules)
[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue.svg)](https://turulomio.github.io/vuetify_rules/)
[![Node.js CI](https://github.com/turulomio/vuetify_rules/actions/workflows/node.js.yml/badge.svg)](https://github.com/turulomio/vuetify_rules/actions/workflows/node.js.yml)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0--or--later-blue.svg)](https://github.com/turulomio/vuetify_rules/blob/main/LICENSE)

Validation rules and helper utility functions for Vuetify forms with dynamic internationalization (i18n) support and **zero runtime dependencies**.

📖 **[Full API Documentation & Examples](https://turulomio.github.io/vuetify_rules/)**

---

## Features

- ⚡ **Zero Runtime Dependencies**: Ultra-lightweight bundle size, ideal for Vite and modern web bundlers.
-  **Vuetify Ready**: Form validation rules designed for `v-text-field`, `v-select`, `v-file-input`, etc.
- 🌐 **Reactive Multi-Language (i18n)**: Switch languages dynamically at runtime (`en`, `es`, `fr` included, extensible with `addTranslations`).
- 🔷 **Full TypeScript Support**: Comprehensive type definitions (`index.d.ts`) with JSDoc descriptions and autocompletion for VS Code / WebStorm.
- 🛠️ **Rich Utility Library**: Helper functions for ISO date parsing, numeric rounding, decimal counting, Map conversions, and array-of-objects (`aoo_*`) calculations.

---

## Installation

```bash
npm install vuetify_rules
```

---

## Documentation

Full interactive API documentation generated with TypeDoc is available at:

👉 **[https://turulomio.github.io/vuetify_rules/](https://turulomio.github.io/vuetify_rules/)**

---

## Quick Start

### 1. Form Validation with Vuetify

```vue
<template>
  <v-form v-model="valid">
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

    <!-- Float Greater than Zero (> 0): max 8 digits, required, max 2 decimals -->
    <v-text-field
      v-model.number="amount"
      label="Positive Amount"
      :rules="RulesFloatGZ(8, true, 2)"
    />

    <!-- General String rule: max 50 characters, optional -->
    <v-text-field
      v-model="description"
      label="Description"
      :rules="RulesString(50, false)"
    />

    <!-- Date ISO string rule: YYYY-MM-DD, required -->
    <v-text-field
      v-model="birthDate"
      label="Birth Date"
      :rules="RulesDateIsoString(true)"
    />

    <!-- Email rule: required -->
    <v-text-field
      v-model="email"
      label="Email Address"
      :rules="RulesEmail(true)"
    />
  </v-form>
</template>

<script setup>
import { ref } from 'vue';
import {
  RulesInteger,
  RulesFloat,
  RulesFloatGZ,
  RulesString,
  RulesDateIsoString,
  RulesEmail,
  singleton
} from 'vuetify_rules';

const valid = ref(false);
const age = ref(null);
const price = ref(null);
const amount = ref(null);
const description = ref('');
const birthDate = ref('');
const email = ref('');
</script>
```

---

### 2. Changing Language Dynamically

Rules automatically re-evaluate with the active language without needing page reloads:

```javascript
import { singleton } from 'vuetify_rules';

// Switch to Spanish
await singleton.setLanguage('es');

// Switch to French
await singleton.setLanguage('fr');

// Switch back to English
await singleton.setLanguage('en');

// Check current language
console.log(singleton.getLanguage()); // "en"
```

#### Adding Custom Translations
You can register or override translation strings at runtime:

```javascript
singleton.addTranslations('de', {
  'Must be an integer number': 'Muss eine ganze Zahl sein',
  'Invalid Email address': 'Ungültige E-Mail-Adresse',
});

await singleton.setLanguage('de');
```

---

### 3. Utility Functions

`vuetify_rules` exports a suite of pure helper functions:

```javascript
import {
  round,
  localtime,
  parseNumber,
  isDateIsoString,
  isDatetimeAwareIsoString,
  aoo_sum,
  aoo_average_ponderated,
  percentage_generic_string
} from 'vuetify_rules';

// High-precision rounding
round(1.005, 2); // 1.01

// String / number parsing with comma support
parseNumber("12,34"); // 12.34

// ISO date and datetime validations
isDateIsoString("2026-09-05"); // true
isDatetimeAwareIsoString("2026-09-05T12:00:00Z"); // true

// Calculations on Arrays of Objects (aoo)
const items = [{ price: 10.5 }, { price: 20.25 }];
aoo_sum(items, 'price'); // 30.75

// Formatting percentages
percentage_generic_string(0.154, 'es-ES', 2); // "15,40 %"
```

---

## Available Rules Summary

| Rule Generator | Description |
| :--- | :--- |
| `RulesInteger(maxdigits, required)` | Validates integers with a maximum number of digits. |
| `RulesFloat(maxdigits, required, maxdecimals)` | Validates floating-point numbers with maximum digits and decimal places. |
| `RulesFloatGZ(maxdigits, required, maxdecimals)` | Floating-point number strictly greater than zero (`> 0`). |
| `RulesFloatGEZ(maxdigits, required, maxdecimals)` | Number greater than or equal to zero (`>= 0`). |
| `RulesFloatLEZ(maxdigits, required, maxdecimals)` | Number less than or equal to zero (`<= 0`). |
| `RulesDateIsoString(required)` | Validates calendar dates in ISO format (`YYYY-MM-DD`). |
| `RulesDatetimeAwareIsoString(required)` | Validates timezone-aware UTC ISO date-times (`YYYY-MM-DDTHH:mm:ssZ`). |
| `RulesString(maxdigits, required)` | Validates string length up to `maxdigits`. |
| `RulesPassword(maxdigits, required)` | Validates password string (between 8 and `maxdigits` characters). |
| `RulesSelection(required)` | Validates selection from dropdowns or select boxes. |
| `RulesEmail(required)` | Validates email address syntax. |

For detailed parameters and return types, see the [online API documentation](https://turulomio.github.io/vuetify_rules/).

---

## Links

- **Documentation**: [https://turulomio.github.io/vuetify_rules/](https://turulomio.github.io/vuetify_rules/)
- **GitHub Repository**: [https://github.com/turulomio/vuetify_rules](https://github.com/turulomio/vuetify_rules)
- **NPM Package**: [https://www.npmjs.com/package/vuetify_rules](https://www.npmjs.com/package/vuetify_rules)
- **Issue Tracker**: [https://github.com/turulomio/vuetify_rules/issues](https://github.com/turulomio/vuetify_rules/issues)

---

