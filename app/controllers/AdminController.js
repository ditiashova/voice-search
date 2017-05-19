app.controller('AdminPanelController', ['VideosModel', function (VideosModel, $http, $filter, $log)  {
    let adminCtrl = this;
    let emptyVideoDesc = {
        name: '',
        description: '',
        thumbnail: '',
        youtubeId: '',
        at: 0
    };
    let editedVideoId = null;

    adminCtrl.videosList = [];
    adminCtrl.showDetails = false;
    adminCtrl.tempVideoDesc = {};
    adminCtrl.allowToSave = false;
    adminCtrl.allowToUpdate = false;
    adminCtrl.showTextarea = false;
    adminCtrl.isAdding = false;
    adminCtrl.isEditing = false;
    adminCtrl.newUrl = '';
    adminCtrl.showProgressLoop = false;

    getVideos();

    adminCtrl.createVideo = function () {
        adminCtrl.showDetails = true;
        adminCtrl.allowToSave = true;
        adminCtrl.isAdding = true;
        adminCtrl.tempVideoDesc = angular.copy(emptyVideoDesc);
    };

    adminCtrl.editVideo = function (receivedVideo, id) {
        _.forEach(adminCtrl.videosList, function (video) {
            if (receivedVideo.id === video.id) {
                return adminCtrl.tempVideoDesc = angular.copy(video);
            }
        });
        editedVideoId = id;
        adminCtrl.showDetails = true;
        adminCtrl.allowToUpdate = true;
        adminCtrl.showTextarea = true;
        adminCtrl.isEditing = true;
    };

    adminCtrl.updateVideo = function () {
        VideosModel.updateVideoInfo(adminCtrl.tempVideoDesc)
            .then(adminCtrl.videosList[editedVideoId] = angular.copy(adminCtrl.tempVideoDesc));
        adminCtrl.closeDetails();
    };

    adminCtrl.deleteVideo = function (receivedVideo) {
        VideosModel.deleteVideo(receivedVideo)
            .then(function () {
                _.forEach(adminCtrl.videosList, function (video) {
                    if (adminCtrl.tempVideoDesc.id === video.id) {
                        adminCtrl.videosList.splice(video.id, 1);
                    }
                });
        });
    };

    adminCtrl.saveVideo = function () {
        adminCtrl.showProgressLoop = true;
        let path = $filter('bcEncode')(adminCtrl.newUrl); //encoding string
        VideosModel.addVideo(path)
            .then(function (data) {
                adminCtrl.videosList.push(data.data);
                adminCtrl.closeDetails();
            });
    };

    adminCtrl.closeDetails = function () {
        adminCtrl.showDetails = false;
        adminCtrl.allowToUpdate = false;
        adminCtrl.allowToSave = false;
        adminCtrl.showTextarea = false;
        adminCtrl.isAdding = false;
        adminCtrl.isEditing = false;
        adminCtrl.tempVideoDesc = {};
        adminCtrl.showProgressLoop = false;
        adminCtrl.newUrl = '';
    };

    function getVideos() {
        VideosModel.getVideos()
            .then(successCallback, errorCallback);
    }

    function successCallback(data) {
        adminCtrl.videosList = data.data;
    }

    function errorCallback(error) {
        $log(error);
        adminCtrl.videosList = [];
    }
}]);