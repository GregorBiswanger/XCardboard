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
            DESCRIPTION: "Das Google Cardboard ist eine Virtuell Reality–Brille aus Pappe. In Kombination mit einem Smartphone wird das Cardboard zur ultimativen Virtuell Reality Expierience. Durch die von Google genutzten bikonvexe – Linsen und der Nutzung spezieller Apps, wird der Bildschirm des Phones zu einem faszinierenden, dreidimensionalen VR-Display.",
            AMAZONBUTTON: "Cardboard auf Amazon"
        },
		ABOUT: {
			DESCRIPTION: "XCardboard ist ein kleines Projekt für die Google Virtuell Reality Brille Cardboard. Entwickelt wurde diese App mit dem Intel XDK, AngularJS sowie Twitter Bootstrap 3. Anreit war es eine Cross Plattform App zu entwickeln die auf jedem modernen Smartphone funktioniert. Leider bietet Google im Augenblick nur Apps für Android an, da wir jedoch so fasziniert von dem Google Cardboard sind, mussten wir einfach eine App für alle Entwickeln! Diese App ist OpenSource und wird über Github veröffentlicht und gepflegt.",
			"MADEBY": "Entwickelt mit viel ♥ und JavaScript von:",
			"LOGOSTITLE": "Eingesetzte Technologien:",
			"GITHUB": "Dokumentation und Sourcecode auf Github:"
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
