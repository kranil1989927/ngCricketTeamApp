var cricketApp = angular.module('cricketWikiApp', ['ngRoute','angularFileUpload', 'ngCookies', 'ui.bootstrap']);

cricketApp.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when("/teams",{controller:"CricketTeamController", templateUrl:"/app/partials/team_list_partial.html" })
		.when("/teams/:team_name",{controller:"CricketTeamViewController", templateUrl:"/app/partials/team_view_partial.html" })		
		.when("/teams/:team_name/players/:player_name",{controller:"PlayerViewController", templateUrl:"/app/partials/player_view_partial.html" })
		.when("/teams/:team_name/upload",  { controller: "TeamUploadController", templateUrl: "/app/partials/team_player_upload.html" })
		.when("/",{redirectTo:"/teams"})
		.when("/404_page",{controller:"Controller404", templateUrl:"/app/partials/404_page_partial.html" })
		.otherwise({redirectTo:"/404_page"});
}]);

cricketApp.directive('keypressEvents', ['$document', '$rootScope', function($document, $rootScope) {
    return {
      restrict: 'A',
      link: function() {
        $document.bind('keydown', function(e) {
          console.log('Got keypress:', e.which);
          $rootScope.$broadcast('keypress', e);
          $rootScope.$broadcast('keypress:' + e.which, e);
        });
      }
    };
  }
]);

cricketApp.filter("OLD_YELLER", function () {
    return function (str) {
        if (typeof str != 'string') return str;
        return str.toUpperCase();
    }
});


cricketApp.filter("pluralise", function () {
    return function (count, nouns) {
        if (count == 1) return count + " " + nouns.one;
        else return count + " " + nouns.more;
    }
});

cricketApp.filter("multifieldfilter", function () {
    return function (obj, params) {
        if (!Array.isArray(obj)) return obj;

        if (!params.findMe) return obj;
        if (!params.fields || !Array.isArray(params.fields)) return obj;

        var out = [];

        for (var i = 0; i < obj.length; i++) {
            for (var j = 0; j < params.fields.length; j++) {
                if (typeof obj[i][params.fields[j]] != 'string') break;
                if (obj[i][params.fields[j]].indexOf(params.findMe) != -1) {
                    out.push(obj[i]);
                    break;
                }
            }
        }

        return out;
    }
});

cricketApp.directive('ctAngry', [ function(){	
	return {		
		restrict: 'A',		
		link: function($scope, element, attrs) {
			element.css({
				"background-color" : "LightGreen",
				color: "red",
				padding: "10px",
				"font-weight": "bold"
			});
		}
	};
}]);

cricketApp.directive('ctAngryPlus', [ function(){	
	return {		
		restrict: 'A',	
		template:"Cicket Team : <span ng-transclude></span> !!!!",
		transclude : true,	
		link: function($scope, element, attrs) {
			element.css({
				"background-color" : "LightGreen",
				color: "red",
				padding: "10px",
				"font-weight": "bold"
			});
		}
	};
}]);

cricketApp.directive('ctTeams', [function(){
	// Runs during compile
	return {
			restrict: 'AE', 
			scope: {
				teamdata:"="
			},
			templateUrl: '/app/partials/team-list-directive.html',
			link: function($scope, element, attrs) {
				
			}
		};
}]);