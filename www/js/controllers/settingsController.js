var settingsController = function ($scope, settingsService, ownPictureService) {
    $scope.settingsService = settingsService;
    $scope.isSettingsPanelOpen = false;

    $scope.onOpenSettingsTouched = function () {
        $scope.isSettingsPanelOpen = true;
    };

    $scope.onGoAmazonTouched = function () {
        intel.xdk.device.launchExternal("http://www.amazon.de/gp/product/B00NF8PO4G/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=B00NF8PO4G&linkCode=as2&tag=doblne-21&linkId=AJGHZL57FNTE6DMQ");
    };
	
	$scope.onOwnPanoramaTouched = function() {
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

settingsController.$inject = ["$scope", "settingsService", "ownPictureService"];
