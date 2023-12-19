

module.exports={
    debug: false,
    sort: true,
    // attr: {
    //     list: ['data-i18n'],
    //     extensions: ['.html', '.htm']
    // },
    func: {
        list: ['i18next.t', 'i18n.t'],
        extensions: ['.js', '.jsx']
    },
    lngs: ['en','es'],
    // ns: ['translation'],
    // defaultNs: 'translation',
    defaultValue: function(lng, ns, key) {
        return key + " (NOT TRANSLATED)"
    },
    resource: {
        loadPath: 'src/locale/{{lng}}.json',
        savePath: 'src/locale/{{lng}}.json',
    },
    nsSeparator: ':',
    keySeparator: '.',
    interpolation: {
        pefix: '{{',
        suffix: '}}'
    }
}