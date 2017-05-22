(function() {
  var app = angular.module('invoicesSystem', ['invoice-directives']);

	app.controller('invoicesController', ['$http', '$scope', function ($http, $scope) {
		var invoices = this;
		invoices.data = [];
		$http.get('./invoices_dummy.json').success(function (data) {
			invoices.data = data;
		});
		
		
		$scope.test = function(orderId){
			
			console.log(invoices.data);
			return openDetails = true;
		}

		
	}]);	
	
	
	
	
})();