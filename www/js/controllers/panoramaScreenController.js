var panoramaScreenController = function ($scope, $rootScope, settingsService) {
    $scope.isImageLoading = true;
    $scope.picturePosition = 0;
    $scope.settingsService = settingsService;

    $scope.$on("picturePositionChanged", function (sender, position) {
        $scope.$apply(function () {
            $scope.picturePosition = position;
        });
    });

    $scope.imageLoadCompleted = function () {
        $scope.isImageLoading = false;
    };

    $scope.panoramaStyle = function () {
        return {
            height: window.innerHeight + "px",
            backgroundPosition: $scope.picturePosition + 'px 470px',
            backgroundImage: "url(" + settingsService.panoramaImage + ")",
            backgroundSize: "4625px 774px",
        };
    };

    $scope.onScreenTouched = function () {
        $rootScope.$broadcast("panoramaScreenTouched", true);
    };
	
	$scope.$on("ownPictureChanged", function(value) {
		$scope.$apply();
	});
};

panoramaScreenController.$inject = ["$scope", "$rootScope", "settingsService"];