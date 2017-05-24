(function(){
    var app = angular.module('invoice-directives', []);		
	
	app.directive('invoiceRows', function (){
		function controller($scope, $compile){
			console.log($scope.details);			
			
			/* Edit product button */
			$scope.editProduct = function($index){
				
				/* Create new one */
				if(!$index){
					$("#invoicemodal .modal-body").empty();
					
									
					// Append compiled data to InvoiceModal.
					$("#invoicemodal .modal-body").append($compile('<edit-product data="productDetails"></edit-product>')($scope));
					
					// Show modal.
					$("#invoicemodal").modal();
				} else {
				/* Edit excisting one */
					// Empty modal body first.
					$("#invoicemodal .modal-body").empty();

					// Set information.
					$scope.productDetails = $scope.details.invoices[$index];

					// Append compiled data to InvoiceModal.
					$("#invoicemodal .modal-body").append($compile('<edit-product data="productDetails"></edit-product>')($scope));

					// Show modal.
					$("#invoicemodal").modal();
				}
				
				
			}/* // editProduct */
			
			/* Close invoices table tab */
			$scope.closeInvoices = function(){
				$("table.invoices tr#orderwrap").remove();
			} /* // close invoices tab */
			
		}
		return {
			restrict: 'E',
			scope: {
				details: '='
			},
			templateUrl: 'invoiceRows.html',
			controller: controller
		}
	});
	
	
	app.directive('editProduct', function (){
		function controller($scope){
			//console.log($scope.data);	
		}
		
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			templateUrl: 'editProduct.html',
			controller: controller
		}
	});
	
	
	
	
})();

