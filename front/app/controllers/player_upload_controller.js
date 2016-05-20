(function(){
	cricketApp.controller('TeamUploadController', ['$scope','$routeParams', 'teamProvider', function($scope, $routeParams, teamProvider){
		$scope.team_name = $routeParams.team_name;
		$scope.page_load_error = "";
		$scope.done_uploading = true;
		$scope.descriptions = {};
		$scope.player_Names = {};
		
		teamProvider.getPlayersByTeam($scope.team_name, function(err, players){
			if(err){
				if(err.code == "not_found")
					$scope.page_load_error = "No players associated to the team.";
				else
					$scope.page_load_error = "Unexpected error while loading the page : " + + err.code +" " + err.message;
			} else{
				$scope.players = players;
				$scope.uploader = teamProvider.getUploader($scope.team_name, $scope);	

				$scope.uploader.bind("completeall", function(err, items){
					$scope.done_uploading = true;
					teamProvider.teamChanged($scope.team_name);
				});

				$scope.uploader.bind("beforeupload", function(err, item){
					var fn = _fix_filename(item.file.name);
					var d = item.file.lastModifiedDate;
					var dstr = d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate();

					item.formData = [{
		                filename: fn,		           
		                name: $scope.player_Names[item.file.name],
		                description: $scope.descriptions[item.file.name]
		            } ];
				});	
			}
		});

		function _fix_filename(fn) {
	        if (!fn || fn.length == 0)  return "unknown";

	        var r = new RegExp("^[a-zA-Z0-9\\-_.]+$");
	        var out = "";

	        for (var i = 0; i < fn.length; i++) {
	            if (r.exec(fn[i]) != null)
	                out += fn[i];
	        }

	        if (!out) out = "unknown_" + (new Date()).getTime();
	        return out;
	    }
	}]);
})();