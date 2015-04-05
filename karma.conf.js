module.exports = function(config) {

    config.set({
        autoWatch : false,

        frameworks: ['jasmine'],

        files: [
            'src/**/*.js',
            'test/**/*.js'
        ],

        browsers : ['PhantomJS'],

        plugins : [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],
        reporters: ['dots', 'junit'],
        junitReporter: {
            outputFile: 'test-results.xml'
        }
    });
};
