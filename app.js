(function() {
  var app = angular.module('invoicesSystem', ['invoice-directives']);

	app.controller('invoicesController', ['$http', '$scope', '$compile', function ($http, $scope, $compile) {
		var invoices = this;
		invoices.details = [];
		var invoicesData = null;
		
		$http.get('./static/json/invoices_dummy.json').success(function (data) {
			invoices.details = data;
		});
		
		/* Click button "View invoices" */
		$scope.getData = function(order, $index){			
			/* If opened close first. */
			var openedRow = $("table.invoices #invoicesTbody").find('#orderwrap').length;

			if (openedRow > 0){	
				$("table.invoices #invoicesTbody").find('#orderwrap').remove(); 
			} else {
				$http.get('./static/json/invoice_'+order.invoiceId+'.json').success(function (data) {
					var tbody = document.getElementById('invoicesTbody');	// Get tbody.

					/* Make new row */
					var row = tbody.insertRow($index + 1);
					row.setAttribute('id', 'orderwrap');
					row.setAttribute('class', 'nohover');

					/* Make new cell into the row */
					var cell = row.insertCell(0);
					cell.colSpan = "4";					// < variable would be nice.. for.. 4.

					/* Parse the variable to the invoice-rows element */
					$scope.invoiceDetails = data;

					/* Append the directive into the cell and compile it */
					$(cell).append($compile('<invoice-rows details="invoiceDetails"></invoice-rows>')($scope));
				});
		}
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
