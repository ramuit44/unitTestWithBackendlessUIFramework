// Karma configuration
// Generated on Tue Mar 29 2016 12:17:15 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    
        // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
	  {pattern: 'WebContent/app/scripts/core/angular.min.js', included: true},
	  {pattern: 'WebContent/app/scripts/core/angular-resource.js', included: true},
	  {pattern: 'WebContent/app/scripts/core/jquery.min.js', included: true},
	  {pattern: 'WebContent/app/scripts/core/moment.min.js', included: true},
	  {pattern: 'WebContent/app/scripts/core/*.js', included: true},
	  {pattern: 'WebContent/app/scripts/csrf/*.js', included: true},	  
	  {pattern: 'WebContent/Jasmine/angular-mocks.js', included: true},	
	  {pattern: 'WebContent/Jasmine/jasmine-jquery.js', included: true},	  
	  {pattern: 'WebContent/app/scripts/app.js', included: true},
	  {pattern: 'WebContent/app/scripts/app-test.js', included: true},
    {pattern: 'WebContent/app/scripts/services/*.js', included: true},
    {pattern: 'WebContent/app/scripts/mockServices/*.js', included: true},
    {pattern: 'WebContent/app/scripts/mockServices/**/*.js', included: true},
    {pattern: 'WebContent/app/scripts/mockServices/**/*.json', included: false},
	  {pattern: 'WebContent/app/scripts/services/uiRules/*.js', included: true},
	  {pattern: 'WebContent/app/scripts/mockServices/**/*.json', included: false},
	  {pattern: 'WebContent/app/scripts/controllers/common/commonCtrl.js', included: true},	  
	  {pattern: 'WebContent/app/scripts/filters/abbrcurrency.js', included: true},       
	  {pattern: 'WebContent/app/scripts/directives/commonDirectives.js', included: true},
	  {pattern: 'WebContent/app/scripts/controllers/deal/addNewSecurityCtrl.js', included: true},	
	  {pattern: 'WebContent/app/scripts/controllers/**/*.js', included: true},	  
	  {pattern: 'WebContent/app/scripts/**/*.specs.js', included: true},
	  {pattern: 'WebContent/app/scripts/directives/commonDirectives/lola-decimals.js', included: true},
	  {pattern: 'WebContent/app/scripts/directives/commonDirectives/lola-decimals.specs.js', included: true},
	  //{pattern: 'WebContent/Jasmine/*_test.js', included: true}      	  
    ],

   //{pattern: 'WebContent/app/scripts/mockServices/*.js', included: true},
	//  {pattern: 'WebContent/app/scripts/mockServices/**/*.js', included: true},
    // list of files to exclude
    exclude: [   
           'WebContent/app/scripts/mockServices/postMockDataRun.js'     
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
       'WebContent/app/scripts/controllers/**/*.js': ['coverage'],
       'WebContent/app/scripts/services/dealService.js': ['coverage'],
       'WebContent/app/scripts/directives/commonDirectives/lola-decimals.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ 'progress','html', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    //browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
   
     coverageReporter: {
      type : 'html',
      dir : 'C://coverage/'
    },

    // the default configuration
    htmlReporter: {
      outputDir: 'C://Karma_html_Reports', // where to put the reports 
      templatePath: null, // set if you moved jasmine_template.html
      focusOnFailures: false, // reports show failures on start
      namedFiles: true, // name files instead of creating sub-directories
      pageTitle: null, // page title for reports; browser info by default
      urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
      reportName: 'Karma_Test_Report', // report summary filename; browser info by default


      // experimental
      preserveDescribeNesting: false, // folded suites stay folded 
      foldAll: true, // reports start folded (only with preserveDescribeNesting)
    }
  })
}
