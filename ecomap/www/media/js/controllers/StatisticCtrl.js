app.controller('StatisticCtrl', ['$scope', '$http', '$state', '$cookies', '$window',
  function($scope, $http, $state, $cookies, $window) {
    $scope.period = 0;
    $scope.chartObject = {};
    $scope.chartObject.type = "PieChart";
    $scope.chartObject.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ]};
    
    $scope.loadStatisticPieChart = function() {
      $scope.$watch('period', function(newValue){
          $scope.chartObject.data["rows"] = [];
          $http({
            method: 'GET',
            url: '/api/statisticPieChar',
            params: {
                    date: newValue,
                  }
          }).then(function successCallback(data) {
            $scope.statistic = data.data;
            $scope.statistic.forEach(function(item){
              $scope.chartObject.data["rows"].push({c: [{v: item['type']},
                                                        {v: item['count']}]})
            });                                
          }, function errorCallback(response) {})
      })
    }
    $scope.loadStatisticPieChart()
    $scope.loadCountSubs = function() {
        $http({
            method: 'GET',
            url: '/api/countSubscriptions',
        }).then(function successCallback(response) {
            $scope.subscriptions = response.data[0];
        })
    };
    $scope.loadSeverityStat = function() {
        $http({
            method: 'GET',
            url: '/api/problems_severity_stats',
        }).then(function successCallback(response) {
            $scope.severities = response.data;
        })
    };
    $scope.triggerDetailModal = function(problem_id) {
      var url = '/#/detailedProblem/' + problem_id;
      window.open(url, '_blank');
    };
    $scope.loadCountSubs();
    $scope.loadSeverityStat();
}]);
    

