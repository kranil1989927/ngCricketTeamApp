(function(){
	cricketApp.controller('CricketTeamViewController', ['$scope','$routeParams', 'teamProvider', function($scope, $routeParams, teamProvider){
		$scope.load_error_text = "";
		$scope.team_name = $routeParams.team_name;
		$scope.page_load_error = "";
		$scope.team = null;
		
		teamProvider.getTeam($scope.team_name, function(err, team){
			if(err){
				if(err.code == "not_found")
					$scope.page_load_error = "No such team";
				else
					$scope.page_load_error = "Unexpected error while loading the page : " + + err.code +" " + err.message;
			} else{
				$scope.team = team;
			}
		});
	}]);
})();