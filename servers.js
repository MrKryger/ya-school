$http.get('error.json').success(function(data) {
    $scope.countries = data;
});