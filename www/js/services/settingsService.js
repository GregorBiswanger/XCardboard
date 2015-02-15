var settingsService = function ($location) {

    var compassAdjustment = getCompassAdjustment();
    var smoothAdjustment = getSmoothAdjustment();
    var userHaveCardboard = getUserHaveCardboard();
    var panoramaImage = getPanoramaImage();

    function getCompassAdjustment() {
        var result = localStorage.getItem("CompassAdjustment");

        if (result === null) {
            return "6";
        }

        return result;
    }

    var saveCompassAdjustment = function (value) {
        localStorage.setItem("CompassAdjustment", value);
    };

    function getSmoothAdjustment() {
        var result = localStorage.getItem("SmoothAdjustment");

        if (result === null) {
            return "0.9";
        }

        return result;
    }

    var saveSmoothAdjustment = function (value) {
        localStorage.setItem("SmoothAdjustment", value);
    };

    function getUserHaveCardboard() {
        var result = localStorage.getItem("UserHaveCardboard");

        if (result === null) {
            return false;
        }

        return result;
    }

    var saveUserHaveCardboard = function (value) {
        localStorage.setItem("UserHaveCardboard", value);
    };

    function getPanoramaImage() {
        return "img/panorama.jpg";
    }
	
    return {
        compassAdjustment: compassAdjustment,
        smoothAdjustment: smoothAdjustment,
        userHaveCardboard: userHaveCardboard,
        panoramaImage: panoramaImage,
        saveCompassAdjustment: saveCompassAdjustment,
        saveSmoothAdjustment: saveSmoothAdjustment,
        saveUserHaveCardboard: saveUserHaveCardboard
    };
};
