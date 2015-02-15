var welcomeController = function ($scope, $location, settingsService) {

    $scope.settingsService = settingsService;

    if (settingsService.userHaveCardboard === "true") {
        $location.path("/panoramaScreen");
    }

    $scope.onGoAmazonTouched = function () {
        intel.xdk.device.launchExternal("http://www.amazon.de/gp/product/B00NF8PO4G/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=B00NF8PO4G&linkCode=as2&tag=doblne-21&linkId=AJGHZL57FNTE6DMQ");
    };

    $scope.$watch("settingsService.userHaveCardboard", function (newValue, oldValue) {
        if (newValue != oldValue) {
            settingsService.saveUserHaveCardboard(newValue);
        }
    });
};

welcomeController.$inject = ["$scope", "$location", "settingsService"];
