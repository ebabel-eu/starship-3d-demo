module.exports = {
    'dependencies': [
        // Libraries managed with Bower.
        './bower_components/three.js/build/three.js',
        './bower_components/three.js/examples/js/loaders/ColladaLoader.js'
    ],
    'scripts': [
        './src/js/scripts/main/*.js',
        './src/js/scripts/app.js'
    ],
    'jshint': {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
            THREE: true,
            ebg: true,
            console: true
        }
    }
};