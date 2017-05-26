(function(){
    var app = angular.module('invoice-directives', []);		
	
	app.directive('invoiceRows', function (){
		function controller($scope, $compile){
			console.log($scope.details);			
			
			/* Edit product button */
			$scope.editProduct = function($index){
				$scope.productDetails = {};
				

				/* Create new one */
				if(!$index && $index != 0){
					$("#invoicemodal .modal-body").empty();
					
					// Append compiled data to InvoiceModal.
					$("#invoicemodal .modal-body").append($compile('<edit-product data="productDetails"></edit-product>')($scope));
					
					// Show modal.
					$("#invoicemodal").modal();
				} else {
				/* Edit excisting one */
					// Empty modal body first.
					$("#invoicemodal .modal-body").empty();
					
					// Make product object.
					$scope.productDetails = $scope.details.invoices[$index];
					// Add productId & invoiceId so it knows where to save.
					$scope.productDetails['productId'] = $index;
					$scope.productDetails['invoiceId'] = $scope.details['invoiceId'];
					
					// Append compiled data to InvoiceModal.
					$("#invoicemodal .modal-body").append($compile('<edit-product data="productDetails"></edit-product>')($scope));

					// Show modal.
					$("#invoicemodal").modal();
				}
			
			}/* // editProduct */
			
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
		function controller($scope, $compile){
			
			$scope.submitProductForm = function($index){
				var productForm = $("#invoicemodal .modal-body form");
				
				productForm.submit(function(e){
					e.preventDefault();
					
					var formdata = productForm.serialize();
					console.log(formdata);
					
				});
				$(productForm).submit();				
			}			
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

