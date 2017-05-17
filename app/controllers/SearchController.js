app.controller('SearchController', function (SearchModel, $http) {
    let searchCtrl = this;
    searchCtrl.textRequest = '';
    searchCtrl.validResultsReceived = false;
    searchCtrl.noValidResultsReceived = false;
    searchCtrl.searchResults = [];

    searchCtrl.getResults = function () {
        clearSearchResults();
        return $http({
            method: 'GET',
            url: 'http://192.168.0.103:8080/v1/search?query=' + searchCtrl.textRequest
        }).then(successCallback, errorCallback);
    };
    function successCallback(data) {
        searchCtrl.searchResults = data.data;
        if (searchCtrl.searchResults.length === 0) {
            searchCtrl.noValidResultsReceived = true;
            searchCtrl.validResultsReceived = false;
        } else {
            searchCtrl.noValidResultsReceived = false;
            searchCtrl.validResultsReceived = true;
        }
    }
    function errorCallback(error) {
        console.log(error);
        searchCtrl.validResultsReceived = false;
        searchCtrl.results = [];
        searchCtrl.noValidResultsReceived = true;
    }
    function clearSearchResults() {
        searchCtrl.searchResults.length = 0;
        searchCtrl.noValidResultsReceived = false;
        searchCtrl.validResultsReceived = false;
    }
});