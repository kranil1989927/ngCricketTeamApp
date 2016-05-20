(function(){
	cricketApp.controller('CricketTeamController',['$scope','$location', 'teamProvider', '$uibModal', function($scope, $location, teamProvider, $uibModal){
		$scope.page_load_error = "";
		$scope.loading_done = false;

		teamProvider.getTeams(function(err, teams){
			if(err){
				$scope.page_load_error = "unexpected error while loading teams : " + err.message;
			} else{
				$scope.loading_done = true;
				$scope.teams = teams;
			}
		});

		$scope.openAddTeamDialog = function(){
			console.log("Is it opening the openAddTeamDialog");
			var addTeamDialog = $uibModal.open({
			    size: "lg",
			    templateUrl: 'myModalContent.html',
			    controller: "AddTeamDialogController",
			    resolve: {
			    }
			});

			addTeamDialog.result.then(function (team_name) {
			    $location.path("/teams/" + team_name)
			}, function () {
			    console.info('Modal dismissed at: ' + new Date());
			});
		};	
	}]);

	cricketApp.controller('AddTeamDialogController',['$scope', '$location', 'teamProvider', function($scope, $location, teamProvider){
		$scope.adding_team = {};
		$scope.add_team_error ="";

		$scope.addTeam = function(new_team){
			teamProvider.addTeam(new_team, function(err, team){
				if(err){
					if(err.code=="missing_team_title")
						$scope.add_team_error ="Please enter team title";
					else if(err.code=="missing_team_country")
						$scope.add_team_error ="Please enter team country";
					else if(err.code=="missing_team_description")
						$scope.add_team_error ="Please enter team description";
					else if(err.code=="missing_team_name")
						$scope.add_team_error ="Please enter team name";
					else if(err.code=="duplicate_team")
						$scope.add_team_error ="Team already exist";
					else
						$scope.add_team_error ="Unexpected error while adding team : "+ err.code +" " + err.message;
				} else{					
					//$location.path("/teams/" + new_team.name);
					//$uibModalInstance.close($scope.adding_team.name);
				}
			});
		};

		$scope.ok = function () {
        	$scope.addTeam($scope.adding_team);
    	};

    	$scope.cancel = function () {
        	//$uibModalInstance.dismiss('cancel');
   		};
	}]);
})();