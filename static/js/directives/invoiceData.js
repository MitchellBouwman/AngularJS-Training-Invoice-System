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
					$scope.productDetails = $scope.details.products[$index];
					// Add productId & invoiceId so it knows where to save.
					$scope.productDetails['productId'] = $index;
					$scope.productDetails['invoiceId'] = $scope.details['invoiceId'];
					
					// Append compiled data to InvoiceModal.
					$("#invoicemodal .modal-body").append($compile('<edit-product data="productDetails"></edit-product>')($scope));

					// Show modal.
					$("#invoicemodal").modal();
				}
			
			}/* // editProduct */
			
			// Delete row/product from invoice.
			$scope.deleteProduct = function($index){
				// Delete from JSON array.
				$scope.details.products.splice($index, 1);
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
			
			//console.log($scope);	
			
			$scope.submitProductForm = function($scope){
				var productForm = $("#invoicemodal .modal-body form");								// Get the form
				var invoicesJSON = $("#invoicemodal .modal-content pre.invoicesJSON").html();		// Get the product JSON
				invoicesJSON = $.parseJSON(invoicesJSON);


				productForm.submit(function(e, $scope){
					e.preventDefault();											// Prevent what you normally do with a form (post & refresh page).
					var formdata =  $.deparam(productForm.serialize());			// Get all data from the submitted form.
					var invoiceNo = formdata.invoiceId - 1;
					var productId = formdata.productId;
					//console.log(invoicesJSON.invoice[invoiceNo].products[productId]);
					
					if(formdata.productId == "new"){
						console.log("Creating a new product");
						
						invoicesJSON.invoice[invoiceNo].products.push({
							"date": formdata.date, 
							"product": formdata.product,
							"price": formdata.price
						});
						
						// Set the new json in the .pre element in the modal.
						$("#invoicemodal .modal-content pre.invoicesJSON").html(JSON.stringify(invoicesJSON));
						$("#invoicemodal").modal('hide');
						
					} else {						
						console.log("Saving existing product");
						$("#invoicemodal").modal('hide');
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