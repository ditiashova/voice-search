app.service('VideosModel', ['$http', function ($http) {
    let service = this;
    service.getSearchResults = function (request) {
        return $http({
            method: 'GET',
            url: 'http://192.168.0.103:8080/v1/search?query=' + request
        });
    };
    service.getVideos = function () {
        return $http({
            method: 'GET',
            url: 'http://192.168.0.103:8080/v1/videos'
        });
    };
    service.addVideo = function (path) {
        return $http({
            method: 'POST',
            url: 'http://192.168.0.103:8080/v1/videos?url=' + path
        })
    };
    service.updateVideoInfo = function (video) {
        $http({
            method: 'PUT',
            url: 'http://192.168.0.103:8080/v1/videos/' + video.id, //change JSON
            data: video
        });
    };
    service.deleteVideo = function (video) {
        $http({
            method: 'DELETE',
            url: 'http://192.168.0.101:8080/v1/videos/' + video.id
        });
    };

}]);