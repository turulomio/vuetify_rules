# vuetify_rules

Librería de reglas de validación para formularios de Vuetify y funciones auxiliares de utilidad (cálculos numéricos, fechas ISO, manipulación de arrays y objetos).

## Arquitectura y Estructura del Proyecto

- **`index.js`**: Punto de entrada principal. Reexporta todas las reglas, funciones y la instancia `singleton`.
- **`src/rules.js`**: Reglas de validación para componentes de Vuetify. Cada regla retorna `true` si el valor es válido o un mensaje de error traducido si es inválido.
- **`src/functions.js`**: Funciones auxiliares puras (validaciones numéricas, cadenas, fechas en formato ISO, tratamiento de decimales, transformaciones `aoo_*`, etc.).
- **`src/singleton.js`**: Instancia Singleton que gestiona la configuración de idioma, interpolación de variables `{{var}}` y traducción dinámica (`t()`, `setLanguage()`, `getLanguage()`, `addTranslations()`).
- **`locales/`**: Catálogos de traducción.
  - `locales/es.json`: Catálogo de traducciones en español.
  - `locales/fr.json`: Catálogo de traducciones en francés.
  - `locales/index.js`: Punto de agregación de catálogos mediante imports ESM JSON (`with { type: "json" }`).
- **`index.d.ts`**: Definiciones de tipos TypeScript para reglas, funciones auxiliares y el singleton.
- **`test/`**: Suites de pruebas ejecutadas con el test runner nativo de Node.js (`node:test` y `node:assert`).

---

## Sistema de Internacionalización (i18n)

### Principios y Convenciones
1. **Inglés como idioma de desarrollo:**
   - En el código fuente (`src/rules.js`), los mensajes de error se escriben directamente en inglés como clave de traducción (ej. `i18n.t("Must be an integer number")`).
   - **No se requiere archivo `en.json`**: Si el idioma es inglés o no existe una traducción, el singleton utiliza directamente la propia clave en inglés como plantilla de desarrollo.
2. **Archivos planos en `locales/`:**
   - Las traducciones se organizan en archivos directos por código de idioma: `locales/es.json`, `locales/fr.json`, etc.
3. **Mecanismo de Fallback:**
   - Si una clave no existe en el idioma activo o su valor termina en `(NOT TRANSLATED)`, el método `t()` recurre automáticamente al texto original en inglés.
4. **Interpolación:**
   - La interpolación de variables se realiza con el formato `{{variable}}` (por ejemplo, `{{maxdigits}}`, `{{maxdecimals}}`).

### Extracción de Traducciones con `i18next-parser`
- Comando: `npm run i18n:extract`
- Configuración: `i18next-parser.config.js`
- Este comando analiza los archivos en `src/**/*.{js,vue}`, actualiza `locales/es.json` y `locales/fr.json` con nuevas claves (marcando las pendientes con `(NOT TRANSLATED)`) y elimina las claves que ya no estén en uso en el código.

### Procedimiento para Añadir un Nuevo Idioma
1. Añadir el código del idioma al array `locales` en `i18next-parser.config.js` (ej. `['es', 'fr', 'de']`).
2. Ejecutar `npm run i18n:extract` para generar automáticamente el nuevo archivo `locales/<código>.json`.
3. Traducir las cadenas en dicho archivo JSON.
4. Importar y exportar el nuevo JSON en `locales/index.js`.
5. Registrarlo en el objeto `resources` de `src/singleton.js`.

---

## Scripts Disponibles

- `npm test`: Ejecuta todos los tests con el test runner nativo de Node.js (`node --test test/*.test.js`).
- `npm run coverage`: Ejecuta los tests calculando la cobertura de código (`--experimental-test-coverage`).
- `npm run i18n:extract`: Extrae cadenas de `src/` a los catálogos en `locales/*.json`.
- `npm run docs:build`: Genera la web estática de documentación de la API con TypeDoc a partir de `index.d.ts` y las anotaciones JSDoc.
- `npm run release`: Genera una nueva versión y actualiza la documentación/etiquetas del proyecto.

---

## Generación y Publicación de Documentación

### Estándar JSDoc / TSDoc
- Todo el código en `src/functions.js`, `src/rules.js`, `src/singleton.js` y las definiciones en `index.d.ts` están documentados exhaustivamente con anotaciones JSDoc (`@param`, `@returns`, `@example`, `@template`, `@deprecated`).
- Esta documentación proporciona autocompletado y descripciones enriquecidas directamente en los editores de código (VS Code, WebStorm).

### Web de Documentación con TypeDoc
- Configuración: `typedoc.json`.
- Comando: `npm run docs:build`.
- Genera un sitio web estático responsivo en la carpeta `docs_html/` con buscador en tiempo real, índices de funciones y reglas, temas claro/oscuro e integración con el `README.md`.

### Despliegue Continuo con GitHub Action
- Workflow: `.github/workflows/documentation.yml`.
- Se ejecuta automáticamente ante cada `push` a la rama `main` o de forma manual (`workflow_dispatch`).
- Compila la documentación con TypeDoc y la despliega directamente en **GitHub Pages** utilizando las acciones oficiales `actions/upload-pages-artifact@v3` y `actions/deploy-pages@v4`.

