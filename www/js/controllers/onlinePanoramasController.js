var onlinePanoramasController = function ($scope, $location, settingsService) {
    var domain = "http://pixeldraw.de/pano/";

    $scope.onLoadOnlineImageTouched = function (imageName) {
        settingsService.panoramaImage = domain + imageName;
        $location.path("/panoramaScreen");
    };
};

onlinePanoramasController.$inject = ["$scope", "$location", "settingsService"];
