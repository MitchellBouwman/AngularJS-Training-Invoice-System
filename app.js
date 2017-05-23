(function() {
  var app = angular.module('invoicesSystem', ['invoice-directives']);

	app.controller('invoicesController', ['$http', '$scope', '$compile', function ($http, $scope, $compile) {
		var invoices = this;
		invoices.data = [];
		$http.get('./static/json/invoices_dummy.json').success(function (data) {
			invoices.data = data;
		});
		
		$scope.getData = function(orderId){
			/* Fetch data from "API". */
			$http.get('./static/json/invoice_'+orderId+'.json').success(function (data) {				
				if(data){
					// The template to show.
					var template = "<tr class=\"extraInfo inv"+data.invoiceId+"\">																\
										<td colspan=\"4\">																						\
											<h3>Invoices for order number: "+data.invoiceId+"</h3>												\
											<hr>																								\
											<div class=\"orders\"></div>																		\
											<hr>																								\
											<div class=\"bottom-bar text-right\">																\
												<a href=\"#\" class=\"btn btn-default btn-sm\">Cancel</a> 										\
												<a href=\"#\" class=\"btn btn-success btn-sm\" ng-click=\"newInvoice("+data.invoiceId+")\">Add invoice</a> \
											</div>																								\
										</td>																									\
									</tr>";
					
					// Compile the template to make the "newInvoice()" function working
					template = $compile(template)($scope);
					
					// If not opened show else remove/close element.
					if (!$("table.invoices tr.inv"+data.invoiceId).length){
						$(template).insertAfter($("table.invoices tr.invoiceRow.invoice"+data.invoiceId));
						
						if(data.invoices){
							$(data.invoices).each(function (){							
								var elem = "<div class=\"alert alert-info\">&euro;"+this.price+" | "+this.product+"</div>";
								$(elem).appendTo("table.invoices tr.inv"+data.invoiceId+" .orders");
							});
						} else {
							alert("No invoices found!")
						}
					} else {
						//console.log("Already opened lets destroy it!");
						$("table.invoices tr.inv"+data.invoiceId).remove();
					}
				} else {
					// Cant retreive data.. make an error.
				}	
			});
		} /* // getData function */
		
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
		
		
		
		
		
		//#addInvoice .modal-body .appendHere
		
		
	}]); // invoicesController	
})();
