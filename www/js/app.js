var app = angular.module("app", ["ngRoute", "ngAnimate", "pascalprecht.translate"]);

app.controller("welcomeController", welcomeController);
app.controller("panoramaScreenController", panoramaScreenController);
app.controller("settingsController", settingsController);
app.controller("onlinePanoramasController", onlinePanoramasController);
app.factory("pictureDirectionService", pictureDirectionService);
app.factory("settingsService", settingsService);
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
    }).otherwise({
        redirectTo: "views/welcome.html"
    });

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});

app.config(function ($translateProvider) {

    $translateProvider.translations("en", {
        WELCOME: {
            DESCRIPTION: "Das Google Cardboard ist eine Virtuell Reality–Brille aus Pappe. In Kombination mit einem Smartphone wird das Cardboard zur ultimativen Virtuell Reality Expierience. Durch die von Google genutzten bikonvexe – Linsen und der Nutzung spezieller Apps, wird der Bildschirm des Phones zu einem faszinierenden, dreidimensionalen VR-Display.",
            AMAZONBUTTON: "Cardboard auf Amazon"
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
        //languageService.setGermanIfAvailable();
        pictureDirectionService.initialize();
    });
});
