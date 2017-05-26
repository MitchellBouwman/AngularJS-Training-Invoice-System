(function(){
    var app = angular.module('invoice-directives', ['ngInputDate']);		
	
	app.directive('invoiceRows', function (){
		function controller($scope, $compile){
			$scope.dateBirth = new Date();			
			
			/* Edit product button */
			$scope.editProduct = function($index){
				$scope.productDetails = {};
				
				/* Create new one */
				if(!$index && $index != 0){
					$("#invoicemodal .modal-body").empty();
					
					// ProductID to "new" so a "save" is a new entry.
					$scope.productDetails['productId'] = 'new';
					$scope.productDetails['invoiceId'] = $scope.details['invoiceId'];
					
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
			$scope.deleteProduct = function($index){
				
				// Delete from JSON array.
				$scope.details.invoices.splice($index, 1);
			}
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
			
			console.log($scope);	
			
			
			$scope.submitProductForm = function($scope, invoices){
				var productForm = $("#invoicemodal .modal-body form");
				
				productForm.submit(function(e, $scope){
					e.preventDefault();
					var formdata =  $.deparam(productForm.serialize());
					console.log(formdata);
					
					
					if(formdata.productId == "new"){
						//alert("Save new product");
					} else {						
						//alert("Save existing product");
					}
					
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