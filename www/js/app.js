var app = function () {
    var initialize = function () {

        var lsCA = 6;
        
        function loadSettings() {
            $("#tbCA").val(localStorage.getItem("ca"));
            $("#tbSA").val(localStorage.getItem("sa"));
            
            if($("#tbCA").val() == "")
                $("#tbCA").val(6);
            
            if($("#tbSA").val() == "")
                $("#tbSA").val(0.9);
            
            lsCA = parseInt($("#tbCA").val());
            $(".pano").css("transition", $("#tbSA").val() + "s ease");
        }
        
        function saveSettings() {
            localStorage.setItem("ca", $("#tbCA").val());
            localStorage.setItem("sa", $("#tbSA").val());
            
            lsCA = parseInt($("#tbCA").val());
            $(".pano").css("transition", $("#tbSA").val() + "s ease");
        }
        
        
        $("#fset").hide();
        loadSettings();

        $(document).on("click", "#btfsetsave", function(evt)
        {
            saveSettings();
            alert("Settings saved!");
            $("#fset").toggle("slide").css("visibility", "visible");
        });
        
        $(document).on("click", "#btfset", function(evt)
        {
            $("#fset").toggle("slide").css("visibility", "visible");
        });
        
        $(document).on("click", "#btchpano", function(evt)
        {
            intel.xdk.camera.importPicture();
        });
        
        
        $("#leftScreen").css("height", window.innerHeight - 20);
        $("#rightScreen").css("height", window.innerHeight - 20);

        var oldMH = 0;
        
        function onSuccess(heading) {
            var pictureWidth = 4625;
            
            var rest = heading.magneticHeading - oldMH;
            
            $("#output").html(heading.magneticHeading + " old: " + oldMH + " cs:" + lsCA);
            
            if(rest >= lsCA || rest <= -lsCA)
            {
                var picturePosition = Math.round(pictureWidth / 360 * heading.magneticHeading);

                $("#leftScreen").css("background-position", "-" + picturePosition + "px 470px");
                $("#rightScreen").css("background-position", "-" + picturePosition + "px 470px");
                
                oldMH = heading.magneticHeading;
                lastPicturePosition = picturePosition;
            }
        }

        function onError(compassError) {
            //alert('Compass error: ' + compassError.code);
        }

        var options = {
            frequency: 50
        };

        navigator.compass.watchHeading(onSuccess, onError, options);

        function onAccelerationSuccess(acceleration) {

            //            $("#output").text('Acceleration X: ' + acceleration.x + '\n' +
            //                'Acceleration Y: ' + acceleration.y.toFixed(2) + '\n' +
            //                'Acceleration Z: ' + acceleration.z + '\n' +
            //                'Timestamp: ' + acceleration.timestamp + '\n');
        }

        var optionsAcceleration = {
            frequency: 50
        };

        navigator.accelerometer.watchAcceleration(onAccelerationSuccess, onError, optionsAcceleration);
        
    };

    return {
        initialize: initialize
    };
};
