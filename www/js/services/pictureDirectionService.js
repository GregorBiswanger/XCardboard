var pictureDirectionService = function ($rootScope, settingsService) {
    var lastMagneticHeading = 0;

    var onSuccess = function (heading) {
        var pictureWidth = 4625;
        var rest = heading.magneticHeading - lastMagneticHeading;

        if (rest >= settingsService.compassAdjustment || rest <= -settingsService.compassAdjustment) {
            var picturePosition = Math.abs(Math.round(pictureWidth / 360 * heading.magneticHeading));
            $rootScope.$broadcast("picturePositionChanged", picturePosition);

            lastMagneticHeading = heading.magneticHeading;
        }
    };

    var onError = function (compassError) {
        // TODO: Debug Mode and check of Sensor availible
        //alert('Compass error: ' + compassError.code);
    };

    var options = {
        frequency: 200
    };

    var initialize = function () {
        navigator.compass.watchHeading(onSuccess, onError, options);
    };

    return {
        initialize: initialize
    };
};

pictureDirectionService.$inject = ["$rootScope", "settingsService"];
