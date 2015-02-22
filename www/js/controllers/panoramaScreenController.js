var panoramaScreenController = function ($scope, $rootScope, settingsService) {
    $scope.isImageLoading = true;
    $scope.picturePosition = 0;
    $scope.settingsService = settingsService;
    $scope.imageWidth = 0;

    $scope.$on("picturePositionChanged", function (sender, position) {
        $scope.$apply(function () {
            $scope.picturePosition = position;
        });
    });

    $scope.imageLoadCompleted = function () {
        $scope.isImageLoading = false;
    };

    $scope.panoramaStyle = function () {

        var image = new Image();
        image.onload = function () {
            $scope.imageWidth = image.width;
			$rootScope.imageWidth = image.width;
        };

        image.src = settingsService.panoramaImage;

        return {
            height: window.innerHeight + "px",
            backgroundPosition: "-" + $scope.picturePosition + 'px 490px',
            backgroundImage: "url(" + settingsService.panoramaImage + ")",
            backgroundSize: $scope.imageWidth + "px 774px",
            transition: getTransition(),
            transform: "translate3d(0, 0, 0)"
        };
    };

    function getTransition() {
        if ($scope.picturePosition <= 50 && $scope.picturePosition >= 0 ||
            $scope.picturePosition <= $scope.imageWidth && $scope.picturePosition >= ($scope.imageWidth - 50)) {
            return "none";
        } else {
            return settingsService.smoothAdjustment + "s linear";
        }
    }

    $scope.onScreenTouched = function () {
        $rootScope.$broadcast("panoramaScreenTouched", true);
    };

    $scope.$on("ownPictureChanged", function (value) {
        $scope.$apply();
    });
};

panoramaScreenController.$inject = ["$scope", "$rootScope", "settingsService"];
