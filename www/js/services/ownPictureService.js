var ownPictureService = function($rootScope, $location, settingsService) {
	
	var getOwnPicture = function() {
		intel.xdk.camera.importPicture();
	};
	
	var onCamSuccess = function (evt) {
    	if (evt.success == true) {
			settingsService.panoramaImage = intel.xdk.camera.getPictureURL(evt.filename);
			$rootScope.$broadcast("ownPictureChanged", true);
       	}
    };

	document.addEventListener("intel.xdk.camera.picture.add", onCamSuccess);
    document.addEventListener("intel.xdk.camera.picture.busy", onCamSuccess);
    document.addEventListener("intel.xdk.camera.picture.cancel", onCamSuccess);
	
	return {
		getOwnPicture : getOwnPicture
	};
};

ownPictureService.$inject = ["$rootScope", "$location", "settingsService"];