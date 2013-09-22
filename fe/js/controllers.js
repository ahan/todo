'use strict';

/* Controllers */
angular.module('TD.controllers', [])
.controller('MainCtrl', ['$scope', '$location', '$http', '$window',
	function ($scope, $location, $http, $window){

		/*
		var route = Route,
			menus = [
				{
					text: '开发',
					id: 'coding'
				},
				{
					text: '测试',
					id: 'test'
				},
				{
					text: '常见误区',
					id: 'tip'
				}
				/*
				{
					text: '给设计师',
					id: 'design'
				}
				*./
			];

		for(i=0; i<menus.length; i++){
			item = menus[i];
			item['ctrl'] = Route[item.id].id;
			item['url'] = Route[item.id].url;
		}

		$scope.menus = menus;

		$scope.$on('$routeChangeSuccess', function(e, current, previous) { 
			var currentCtrl = current.$$route ? current.$$route.controller : Route.coding.id,
				 prevCtrl = previous && previous.$$route ? previous.$$route.controller : '';
			if(prevCtrl){
				angular.element(document.getElementById('route_' + prevCtrl)).removeClass('active');
			}
			angular.element(document.getElementById('route_' + currentCtrl)).addClass('active');
		});
		*/

	}
])
.controller('TasksCtrl', [ '$scope', '$http', 'log',
function ($scope, $http, log){

	var xhr = function(id, method, data, callback){

		$http({
			method: method || 'GET',
			url: 'be-api/tasks/' + (id || ''),
			data: data || ''
			// cache: false
		}).
		success(function(data, status) {
			callback(data, status);
			/*
			log('---   success   ----');
			log(data);
			log(status);
			/*
			$scope.status = status;
			$scope.data = data;
			*/
		}).
		error(function(data, status) {
			callback(data, status);
			/*
			log('---   error   ----');
			log(data);
			log(status);
			/*
			$scope.data = data || "Request failed";
			$scope.status = status;
			*/
		});
	};

	xhr('', 'GET', '', function(data, status){
		log(data);
		log(status);

		$scope.todos = data;
	});

	$scope.add = function(){
		var data = { text: $scope.todoText, done: false };
		xhr('', 'POST', data, function(data, status){
			log(data);
			log(status);

			$scope.todos.push(data);
			$scope.todoText = '';
		});
	};

	$scope.remaining = function(){
		var count = 0;

		angular.forEach($scope.todos, function(todo){
			count += todo.done ? 0 : 1;
		});

		return count;
	};

	$scope.archive = function(){
		var oldTodos = $scope.todos;

		$scope.todos = [];

		angular.forEach(oldTodos, function(todo){
			if( !todo.done ){
				$scope.todos.push(todo);
			}else{
				xhr(todo._id, 'DELETE', '', function(data, status){
					log(data);
					log(status);
				});
			}
		});
	};

}])
;
