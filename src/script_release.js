    console.log(`Release procedure:
    - Change version in package.json
    - npm run release
    - Create a new branch: git checkout -b vuetify_rules-${process.env.npm_package_version}
    - Edit Changelog in README.md
    - npm run start
    - npm run test
    - git commit -am vuetify_rules-${process.env.npm_package_version}
    - git push
    - Merge Pull request in github
    - New github release
    - git checkout main
    - Return to main branch: git checkout main
    - Update main branch: git pull
    - npm publish --access public
`)
