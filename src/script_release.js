    console.log(`Release procedure:
    - Change version in package.json
    - Edit Changelog in README.md
    - npm run start
    - npm run test
    - git commit -am vuetify_rules-${process.env.npm_package_version}
    - git push
    - New github tag
    - npm publish --access public
`)
