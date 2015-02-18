var app = angular.module("app", ["ngRoute", "ngAnimate", "pascalprecht.translate"]);

app.controller("welcomeController", welcomeController);
app.controller("panoramaScreenController", panoramaScreenController);
app.controller("settingsController", settingsController);
app.controller("onlinePanoramasController", onlinePanoramasController);
app.factory("pictureDirectionService", pictureDirectionService);
app.factory("settingsService", settingsService);
app.factory("ownPictureService", ownPictureService);
app.factory("languageService", languageService);
app.directive('ngLoad', ngLoad);

app.config(function ($routeProvider, $compileProvider) {
    $routeProvider.when("/", {
        controller: welcomeController,
        templateUrl: "views/welcome.html"
    }).when("/panoramaScreen", {
        controller: panoramaScreenController,
        templateUrl: "views/panoramaScreen.html"
    }).when("/onlinePanoramas", {
        controller: onlinePanoramasController,
        templateUrl: "views/onlinePanoramas.html"
    }).when("/about", {
        templateUrl: "views/about.html"
    }).otherwise({
        redirectTo: "views/welcome.html"
    });

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});

app.config(function ($translateProvider) {

    $translateProvider.translations("en", {
        WELCOME: {
            DESCRIPTION: "The Google Cardboard are virtual reality glasses made of? Exactly, it’s made of cardboard. The box is easy to build and a magnetic ring provides the necessary stability. In combination with a Smartphone, the Cardboard is offering you the ultimate virtual reality expierience. The box is designed in a way, so the Smartphone can be placed in it without falling out. A Velcro closure, as well as an ordinary rubber band provides a firm hold. With biconvex-lenses by Google and by using special apps, you can transform the screen of your phone to a fascinating, 3D VR display.",
            AMAZONBUTTON: "Cardboard on Amazon",
            NEXTBUTTON: "Next",
            USERHAVECARDBOARDBUTTON: "I already own a Cardboard."
        },
        PANORAMASCREEN: {
            WAITDIALOG: "Please wait..."
        },
        SETTINGS: {
            SMOOTHADJUSTMENT: "Smooth Settings",
            COMPASSADJUSTMENT: "Compass Settings",
            OWNPANORAMABUTTON: "Choose own panorama",
            ONLINEPANORAMASBUTTON: "Download online",
            AMAZONBUTTON: "Cardboard on Amazon",
            ABOUTBUTTON: "About XCardboard"
        },
        ONLINEPANORAMA: {
            PICTUREONETITLE: "Golden Gate Bridge",
            PICTUREONESUBTITLE: "San Francisco",
            PICTURETWOTITLE: "Europe Bridge",
            PICTURETWOSUBTITLE: "Germany",
            PICTURETHREETITLE: "In Game",
            PICTURETHREESUBTITLE: "Panorama",
            PICTUREFOURTITLE: "Dusseldorf Bilk",
            PICTUREFOURSUBTITLE: "Germany",
            PICTUREFIVETITLE: "Wildkogel",
            PICTUREFIVESUBTITLE: "Kitzbuheler Alps",
            PICTURESIXTITLE: "Skyline",
            PICTURESIXSUBTITLE: "Munich",
            BACKBUTTON: "Back"
        },
        ABOUT: {
            DESCRIPTION: "XCardboard is a small project for the Google virtual reality glasses named Cardboard. This app has been developed with the Intel XDK, AngularJS as well as Twitter bootstrap 3.  We wanted to develop cross platform application which is running on any modern Smartphone. Unfortunately, Google only offers apps for Android right now. Because we are so fascinated by the Google Cardboard, so we had the idea to develop an app for all platforms! This app is open source and is released and maintained on Github. ",

            MADEBY: "Developed with ♥ and JavaScript by:",
            LOGOSTITLE: "Used technologies:",
            GITHUB: "Documentation and sourcecode on Github:",
            DONATE: "Support the XCardboard:",
            DONATEINFO: " Donations will go directly into store fees and programming. Thus, we can bring more features to all users and distribute the finished app in the stores. We need your help to make the project unique. Be a part of it!",
            BACKBUTTON: "Back"
        }
    });

    $translateProvider.useStaticFilesLoader({
        prefix: '/translations/lang-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage("en");
});

app.run(function ($document, $rootScope, pictureDirectionService, languageService) {
    $document.on("deviceready", function () {
        FastClick.attach(document.body);

        if (intel.xdk.isxdk !== true) {
            languageService.setGermanIfAvailable();
            pictureDirectionService.initialize();
        }
    });
});
