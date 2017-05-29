(function() {
  var app = angular.module('invoicesSystem', ['invoice-directives']);

	app.controller('invoicesController', ['$http', '$scope', '$compile', function ($http, $scope, $compile) {
		var invoices = this;
		invoices.details = [];
		invoices.invoice = [];	
		
		invoices.details = [{"invoiceId": 1,"name": "AbbVie France","invoiceDate": "1288323623006"},
							{"invoiceId": 2,"name": "Ablynx NV","invoiceDate": "1288323623006"},
							{"invoiceId": 3,"name": "Astellas Pharma Europe BV","invoiceDate": "1288323623006"}
						   ];	
		invoices.invoice = [{"invoiceId": 1,"name": "AbbVie France","invoiceDate": "1288323623006","products": [{"product": "Computer screen 27inch","price": "279.95","date": "1288323623006"},{"product": "Heart Sensor","price": "1199.95","date": "1288323623003"}]},{"invoiceId": 2,"name": "Ablynx NV","invoiceDate": "1288323623006","products": [{"product": "10 pack needles","price": "23.99","date": "1288323623003"},{"product": "2x 13mm fans","price": "26.98","date": "1288323623003"}]},{"invoiceId": 3,"name": "Astellas Pharma Europe BV","invoiceDate": "1288323623006","products": [{"product": "10 pack needles","price": "23.99","date": "1288323623003"},{"product": "10 pack needles","price": "23.99","date": "1288323623003"},{"product": "10 pack needles","price": "23.99","date": "1288323623003"},{"product": "2x 13mm fans","price": "26.98","date": "1288323623003"}]}];
		
		$scope.invoices = invoices.invoice;
		
		/* Click button "View invoices" */
		$scope.getData = function(order, $index){
			var colSpan = $('table.invoices > thead > tr > th').length;
			
			/* Nice toggling between customers invoices */
			var openedRow = $("table.invoices #invoicesTbody").find('#orderwrap[data-id='+$index+']').length;
			if(openedRow == 1){
				$("table.invoices #invoicesTbody").find('#orderwrap[data-id='+$index+']').remove();
				return;
			} else {
				$("table.invoices #invoicesTbody").find('#orderwrap').remove();
			}
			/* // Nice toggling between customers invoices */
			
				var tbody = document.getElementById('invoicesTbody');	// Get tbody.
				
				/* Make new row */
				var row = tbody.insertRow($index + 1);
				row.setAttribute('id', 'orderwrap');
				row.setAttribute('data-id', $index);

				/* Make new cell into the row */
				var cell = row.insertCell(0);
				cell.colSpan = colSpan;

				/* Parse the variable to the invoice-rows element */
				$scope.invoiceDetails = invoices.invoice[$index];
				//console.log($scope.invoiceDetails);
			
				/* Append the directive into the cell and compile it */
				$(cell).append($compile('<invoice-rows details="invoiceDetails"></invoice-rows>')($scope));
			
			
		} /* // getData function */
		

		
		
	}]); // invoicesController	
})();
