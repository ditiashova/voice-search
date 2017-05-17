app.controller('AdminPanelController', function ($http, $filter) {
    let adminCtrl = this;
    getResults();

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
    adminCtrl.progressLoop = false;


    adminCtrl.selectRow = function (index, receivedVideo) {

    }; //rewrite this function
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
    adminCtrl.deleteVideo = function (receivedVideo) {
        $http({
            method: 'DELETE',
            url: 'http://192.168.0.101:8080/v1/videos/' + receivedVideo.id //change JSON
        }).then(function () {
            _.forEach(adminCtrl.videosList, function (video) {
                if (adminCtrl.tempVideoDesc.id === video.id) {
                    adminCtrl.videosList.splice(video.id, 1);
                }
            });
        });
    };
    adminCtrl.createVideo = function () {
        adminCtrl.showDetails = true;
        adminCtrl.allowToSave = true;
        adminCtrl.isAdding = true;

        adminCtrl.tempVideoDesc = angular.copy(emptyVideoDesc);
    };
    adminCtrl.closeDetails = function () {
        adminCtrl.showDetails = false;
        adminCtrl.allowToUpdate = false;
        adminCtrl.allowToSave = false;
        adminCtrl.showTextarea = false;
        adminCtrl.isAdding = false;
        adminCtrl.isEditing = false;
        adminCtrl.tempVideoDesc = {};
        adminCtrl.progressLoop = false;
        adminCtrl.newUrl = '';
        /*adminCtrl.newUrl = '';*/
    };
    adminCtrl.saveNewVideo = function () {
        adminCtrl.progressLoop = true;
        let encodedString = $filter('bcEncode')(adminCtrl.newUrl);
        console.log(encodedString);
        $http({
            method: 'POST',
            url: 'http://192.168.0.103:8080/v1/videos?url=' + encodedString //add URL param

        }).then(function (data) {
            adminCtrl.videosList.push(data.data);
            adminCtrl.closeDetails();
        });
    };
    adminCtrl.updateVideo = function () {
        $http({
            method: 'PUT',
            url: 'http://192.168.0.103:8080/v1/videos/' + adminCtrl.tempVideoDesc.id, //change JSON
            data: adminCtrl.tempVideoDesc
        }).then(adminCtrl.videosList[editedVideoId] = angular.copy(adminCtrl.tempVideoDesc));
        adminCtrl.closeDetails();
    };
    function getResults() {
        return $http({
            method: 'GET',
            url: 'http://192.168.0.103:8080/v1/videos'
        }).then(successCallback, errorCallback);
    }
    function successCallback(data) {
        console.log(data);
        console.log(data.data);
        adminCtrl.videosList = data.data;
    }
    function errorCallback(error) {
        console.log(error);
        adminCtrl.videosList = [];
    }
});