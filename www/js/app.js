var app = function () {
    var initialize = function () {

        $("#tbCA").val(localStorage.getItem("ca"));
        $("#tbSA").val(localStorage.getItem("sa"));
        
        $("#fset").hide();
        var lsCA = parseInt(localStorage.getItem("ca"));
            
        if(lsCA === null || lsCA === "" || lsCA === undefined || lsCA === 0)
        {
            $("#tbCA").val(6);
            lsCA = 6;
        }
        
        var lsSA = localStorage.getItem("sa");
            
        if(lsSA === null || lsSA === "" || lsSA === undefined || lsSA === 0)
        {
            lsSA = 0.9;
            $("#tbSA").val(0.9);
        }
        
        $(".pano").css("transition", lsSA + "s ease");
        
        $(document).on("click", "#btfsetsave", function(evt)
        {
            var ca = $("#tbCA").val();
            var sa = $("#tbSA").val();
            localStorage.setItem("ca", ca);
            localStorage.setItem("sa", sa);
            
            lsCA = parseInt(ca);
            LsSA = sa;
            $(".pano").css("transition", sa + "s ease");
            
            alert("Settings saved!");
            $("#fset").toggle("slide").css("visibility", "visible");
        });
        
        $(document).on("click", "#btfset", function(evt)
        {
            $("#fset").toggle("slide").css("visibility", "visible");
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
