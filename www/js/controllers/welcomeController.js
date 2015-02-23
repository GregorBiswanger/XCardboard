var welcomeController = function ($scope, $location, $translate, settingsService) {

    $scope.settingsService = settingsService;

    if (settingsService.userHaveCardboard === "true") {
        $location.path("/panoramaScreen");
    }

    $scope.onGoAmazonTouched = function () {
        if ($translate.use() === "de") {
            intel.xdk.device.launchExternal("http://www.amazon.de/gp/product/B00NF8PO4G/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=B00NF8PO4G&linkCode=as2&tag=doblne-21&linkId=AJGHZL57FNTE6DMQ");
        } else {
            intel.xdk.device.launchExternal("http://www.amazon.com/gp/product/B00LZGBU3Y/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00LZGBU3Y&linkCode=as2&tag=xcamobapp-20&linkId=W2DTSR572B7NXXYX");
        }
    };

    $scope.$watch("settingsService.userHaveCardboard", function (newValue, oldValue) {
        if (newValue != oldValue) {
            settingsService.saveUserHaveCardboard(newValue);
        }
    });
};

welcomeController.$inject = ["$scope", "$location", "$translate", "settingsService"];
