var languageService = function ($translate) {
    var onSuccess = function (language) {
        if (language.value.substring(0, 2) == "de") {
            $translate.use("de").then();
        }
    };

    var setGermanIfAvailable = function () {
        navigator.globalization.getPreferredLanguage(onSuccess);
    };

    return {
        setGermanIfAvailable: setGermanIfAvailable
    };
};

languageService.$inject = ["$translate"];
