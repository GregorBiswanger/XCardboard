var settingsController = function ($scope, $translate, settingsService, ownPictureService) {
    $scope.settingsService = settingsService;
    $scope.isSettingsPanelOpen = false;

    $scope.onOpenSettingsTouched = function () {
        $scope.isSettingsPanelOpen = true;
    };

    $scope.onGoAmazonTouched = function () {
        if ($translate.use() === "de") {
            intel.xdk.device.launchExternal("http://www.amazon.de/gp/product/B00NF8PO4G/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=B00NF8PO4G&linkCode=as2&tag=doblne-21&linkId=AJGHZL57FNTE6DMQ");
        } else {
            intel.xdk.device.launchExternal("http://www.amazon.com/gp/product/B00LZGBU3Y/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B00LZGBU3Y&linkCode=as2&tag=xcamobapp-20&linkId=W2DTSR572B7NXXYX");
        }
    };

    $scope.onNavigateExternURLTouched = function (url) {
        intel.xdk.device.launchExternal(url);
    };

    $scope.onOwnPanoramaTouched = function () {
        ownPictureService.getOwnPicture();
        $scope.isSettingsPanelOpen = false;
    };

    $scope.$on("panoramaScreenTouched", function (sender, eventArgs) {
        $scope.isSettingsPanelOpen = false;
    });

    $scope.$watch("settingsService.compassAdjustment", function (newValue, oldValue) {
        if (newValue !== undefined) {
            settingsService.saveCompassAdjustment(newValue);
        }
    });

    $scope.$watch("settingsService.smoothAdjustment", function (newValue, oldValue) {
        if (newValue !== undefined) {
            settingsService.saveSmoothAdjustment(newValue);
        }
    });
};

settingsController.$inject = ["$scope", "$translate", "settingsService", "ownPictureService"];
