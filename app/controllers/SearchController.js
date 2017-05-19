app.controller('SearchController', ['VideosModel', '$log', function (VideosModel, $log) {
    let searchCtrl = this;
    searchCtrl.textRequest = '';
    searchCtrl.validResultsReceived = false;
    searchCtrl.noValidResultsReceived = false;
    searchCtrl.searchResults = [];

    searchCtrl.getResults = function () {
        clearSearchResults();
        VideosModel.getSearchResults(searchCtrl.textRequest)
            .then(successCallback, errorCallback);
    };

    function clearSearchResults() {
        searchCtrl.searchResults.length = 0;
        searchCtrl.validResultsReceived = false;
        searchCtrl.noValidResultsReceived = false;
    }

    function successCallback(data) {
        searchCtrl.searchResults = data.data;
        if (searchCtrl.searchResults.length === 0) {
            searchCtrl.validResultsReceived = false;
            searchCtrl.noValidResultsReceived = true;
        } else {
            searchCtrl.validResultsReceived = true;
            searchCtrl.noValidResultsReceived = false;
        }
    }

    function errorCallback(error) {
        $log(error);
        searchCtrl.validResultsReceived = false;
        searchCtrl.noValidResultsReceived = false;
        searchCtrl.results = [];
    }
}]);