(function() {
  var app = angular.module('invoicesSystem', ['invoice-directives']);

	app.controller('invoicesController', ['$http', '$scope', '$compile', function ($http, $scope, $compile) {
		var invoices = this;
		invoices.details = [];
		var invoice = [];
		var invoicesData = null;
		
		
		invoices.details = [{"invoiceId": 1,"name": "AbbVie France","invoiceDate": "1288323623006"},
							{"invoiceId": 2,"name": "Ablynx NV","invoiceDate": "1288323623006"},
							{"invoiceId": 3,"name": "Astellas Pharma Europe BV","invoiceDate": "1288323623006"}
						   ];	
		invoice		 	 = [{"invoiceId": 1,"name": "AbbVie France","invoiceDate": "1288323623006","invoices": [{"product": "Computer screen 27inch","price": "279.95","date": "1288323623006"},{"product": "Heart Sensor","price": "1199.95","date": "1288323623003"}]},{"invoiceId": 2,"name": "Ablynx NV","invoiceDate": "1288323623006","invoices": [{"product": "10 pack needles","price": "23.99","date": "1288323623003"},{"product": "2x 13mm fans","price": "26.98","date": "1288323623003"}]},{"invoiceId": 3,"name": "Astellas Pharma Europe BV","invoiceDate": "1288323623006","invoices": [{"product": "10 pack needles","price": "23.99","date": "1288323623003"},{"product": "10 pack needles","price": "23.99","date": "1288323623003"},{"product": "10 pack needles","price": "23.99","date": "1288323623003"},{"product": "2x 13mm fans","price": "26.98","date": "1288323623003"}]}]
		
		console.log(invoice);
		
		
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
				$scope.invoiceDetails = invoice[$index];

				/* Append the directive into the cell and compile it */
				$(cell).append($compile('<invoice-rows details="invoiceDetails"></invoice-rows>')($scope));
			
			
		} /* // getData function */
		
		
		/*
		
		$scope.newInvoice = function(orderId){		
			// Make the form
			var form = "<form><div class=\"form-group\"><label for=\"description\" class=\"col-sm-12 control-label text-left\">Description:</label><div class=\"col-sm-12\"><input type=\"text\" class=\"form-control\" id=\"description\" value=\"\"></div></div><br class=\"clearfix\" clear=\"all\" /><br class=\"clearfix\" clear=\"all\" /><div class=\"form-group\"><label for=\"quantity\" class=\"col-sm-12 control-label\">Quantity</label><div class=\"col-sm-12\"><input class=\"form-control\" id=\"quantity\" value=\"\"></div></div><br class=\"clearfix\" clear=\"all\" /><br class=\"clearfix\" clear=\"all\" /><div class=\"form-group\"><label for=\"amount\" class=\"col-sm-12 control-label\">Amount</label><div class=\"col-sm-12\"><input class=\"form-control\" id=\"amount\" value=\"\"></div></div><br class=\"clearfix\" clear=\"all\" /><br class=\"clearfix\" clear=\"all\" /><div class=\"form-group\"><div class=\"col-sm-12 text-right\"><button type=\"submit\" class=\"btn btn-success\">Add transaction</button></div></div></form>";
			
			// Empty the div.
			$("#addInvoice .modal-body .appendHere").empty();
			// Append it to the modal.
			$("#addInvoice .modal-body .appendHere").append(form);
			
			// Last but not least, open the modal.
			$("#addInvoice").modal();
		} 
		*/
		//#addInvoice .modal-body .appendHere
		
		
	}]); // invoicesController	
})();
