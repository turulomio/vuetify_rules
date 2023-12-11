    console.log(`Release procedure:
    - Create a new branch: git checkout -b vuetify_rules-${process.env.npm_package_version}
    - Change version in package.json
    - Edit Changelog in README.md
    - npm run start
    - npm run test
    - git commit -am vuetify_rules-${process.env.npm_package_version}
    - git push
    - New github tag
    - Return to main branch: git checkout main
    - Update main branch: git pull
    - npm publish --access public
`)
