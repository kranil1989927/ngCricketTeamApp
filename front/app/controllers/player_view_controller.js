(function(){
	cricketApp.controller('PlayerViewController', ['$scope', '$routeParams', '$location', '$rootScope', 'teamProvider', function($scope, $routeParams, $location, $rootScope, teamProvider){
		$scope.team_name = $routeParams.team_name ;
		$scope.player_name = $routeParams.player_name;
        $scope.page_load_error = "";
        $scope.team = null;       
        $scope.player_next_file = '';
        $scope.player_prev_file = '';
        $scope.done_loading = false;
        $scope.description = '';

        $rootScope.$on("keypress:39", function (e, ke) {
            if ($scope.player_next_file) {
                setTimeout(function () {
                    $scope.$apply(function () {$location.path("/teams/" + $scope.team_name + "/players/" + $scope.player_next_file); });
                }, 200);
            };
        });

        $rootScope.$on("keypress:37", function (e, ke) {
            if ($scope.player_prev_file) {
                setTimeout(function () {
                    $scope.$apply(function () {$location.path("/teams/" + $scope.team_name + "/players/" + $scope.player_prev_file); });
                }, 200);
            }
        });

        teamProvider.getTeam($scope.team_name, function (err, team) {
            if (err) {
                if (err.code == "not_found")
                    $scope.page_load_error = "No such team. Are you doing this right?";
                else
                    $scope.page_load_error = "Unexpected error loading page: " + err.code + " " + err.message;
            } else {
                $scope.team = team;
                for (var i = 0; i < team.players.length; i++) {
                    if (team.players[i].filename == $scope.player_name) {
                        $scope.description = team.players[i].description;
                        if (i) $scope.player_prev_file = team.players[i -1].filename;
                        if (i < team.players.length - 1)
                            $scope.player_next_file = team.players[i + 1].filename;
                        break;
                    }
                }

                if (i == team.players.length)
                    $scope.page_load_error = "This player does not appear to exist.";
                else
                    $scope.done_loading = true;
            }
        });
	}]);
})();