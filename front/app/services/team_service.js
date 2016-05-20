(function(){

cricketApp.service('teamProvider', ['$http', '$fileUploader',function($http, $fileUploader){
	
	var team_cache = {};

	this.getUploader = function(team_name, scope){
		return $fileUploader.create({
			scope: scope,
            method: "PUT",
            url: "/v1/teams/" + team_name + "/players.json"
		});
	};

	this.teamChanged = function (name) {
        if (team_cache[name]) delete team_cache[name];
    };

	this.getTeams = function(callback){
		$http.get("/v1/teams.json")
		.success(function(data, status, headers,conf){			
			callback(null, data);
		})
		.error(function(data, status, headers,conf){
			callback(data);
		});	
	};

	this.getTeam = function (name, callback) {
	    if (team_cache[name]) return callback(null, team_cache[name]);

	    $http.get("/v1/teams/" + name + ".json")
	        .success(function (data, status, headers, conf) {
	            team_cache[name] = data;
	            callback(null, data);
	        })
	        .error(function (data, status, headers, conf) {
	            callback(data);
	     	});
	};

	this.getPlayersByTeam = function(team_name, callback){	
		if (team_cache[team_name]) return callback(null, team_cache[team_name].players);

		$http.get("/v1/teams/"+ team_name +"/players.json")
		.success(function(data, status, headers,conf){
			team_cache[team_name] = data;
			callback(null, data);
		})
		.error(function(data, status, headers,conf){
			callback(data);
		});	
	};

	this.addTeam = function(team_data, callback){
		if(!team_data.title) return callback({ code: "missing_team_title" });
		if(!team_data.country) return callback({ code: "missing_team_country" });
		if(!team_data.description) return callback({ code: "missing_team_description" });
		if(!team_data.name) return callback({ code: "missing_team_name" });

		$http.put("/v1/teams.json", team_data)
		.success(function(data, status, headers,conf){
			callback(null, data);
		})
		.error(function(data, status, headers,conf){
			callback(data);
		});
	};

}]);

})();