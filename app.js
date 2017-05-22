(function() {
  var app = angular.module('invoicesSystem', ['invoice-directives']);

	  app.controller('invoicesController', ['$http', function ($http) {
		var invoices = this;
		invoices.data = [];
		$http.get('./invoices_dummy.json').success(function (data) {
			invoices.data = data;
		});
	  }]);


	
})();