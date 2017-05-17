app.service('SearchModel', ['$http', function ($http) {
    let service = this;
    service.getResults = function (text) {
        return $http({
            method: 'GET',
            url: 'http://localhost:63342/voice-search/response.json'
        }).then(successCallback, errorCallback);
    };
    function successCallback(data) { return data.data; }
    function errorCallback(error) { console.log(error); service.results = []; }
}]);