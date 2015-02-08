var app = function () {
    var initialize = function () {
        $("#leftScreen").css("height", window.innerHeight - 20);
        $("#rightScreen").css("height", window.innerHeight - 20);

        function onSuccess(heading) {
            var pictureWidth = 4625;
            var picturePosition = Math.round(pictureWidth / 360 * heading.magneticHeading);

            $("#leftScreen").css("background-position", "-" + picturePosition + "px 470px");
            $("#rightScreen").css("background-position", "-" + picturePosition + "px 470px");

            lastPicturePosition = picturePosition;
        }

        function onError(compassError) {
            alert('Compass error: ' + compassError.code);
        }

        var options = {
            frequency: 500
        };

        navigator.compass.watchHeading(onSuccess, onError, options);

        function onAccelerationSuccess(acceleration) {

            //            $("#output").text('Acceleration X: ' + acceleration.x + '\n' +
            //                'Acceleration Y: ' + acceleration.y.toFixed(2) + '\n' +
            //                'Acceleration Z: ' + acceleration.z + '\n' +
            //                'Timestamp: ' + acceleration.timestamp + '\n');
        }

        var optionsAcceleration = {
            frequency: 350
        };

        navigator.accelerometer.watchAcceleration(onAccelerationSuccess, onError, optionsAcceleration);
    };

    return {
        initialize: initialize
    };
};
