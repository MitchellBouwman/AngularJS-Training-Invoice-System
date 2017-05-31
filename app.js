(function() {
  var app = angular.module('invoicesSystem', ['ngSanitize', '720kb.datepicker', 'ng-currency', 'ui.bootstrap']);
	
	app.controller('invoicesController', ['$http', '$scope', '$rootScope', '$compile', function ($http, $scope, $rootScope, $compile) {
		var invoices = this;		
		invoices.details = [{"invoiceId": 1,"name": "AbbVie France","invoiceDate": "1288323623006"},
							{"invoiceId": 2,"name": "Ablynx NV","invoiceDate": "1288323623006"},
							{"invoiceId": 3,"name": "Astellas Pharma Europe BV","invoiceDate": "1288323623006"}
						   ];	
		invoices.invoice = [{"invoiceId": 1,"name": "AbbVie France","invoiceDate": "1288323623006","products": [{"product": "Computer screen 27inch","price": "279.95","date": "11/05/2017"}, {"product": "Heart Sensor","price": "1199.95","date": "10/05/2017"}]}, {"invoiceId": 2,"name": "Ablynx NV","invoiceDate": "1288323623006","products": [{"product": "10 pack needles","price": "23.99","date": "12/05/2017"}, {"product": "2x 13mm fans","price": "26.98","date": "14/05/2017"}]}, {"invoiceId": 3,"name": "Astellas Pharma Europe BV","invoiceDate": "1288323623006","products": [{"product": "10 pack needles","price": "23.99","date": "15/05/2017"}, {"product": "10 pack needles","price": "23.99","date": "15/05/2017"}, {"product": "10 pack needles","price": "23.99","date": "15/05/2017"}, {"product": "2x 13mm fans","price": "26.98","date": "16/05/2017"}]}];
		$rootScope.invoices = invoices.invoice;
	
		
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
	
		
	app.directive('invoiceRows', function (){
		function controller($scope, $compile){
			$scope.dateBirth = new Date();			
			
			/* Edit product button */
			$scope.editProduct = function($index){
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
	
	
	/***** MODAL *****/
	app.controller('modalController', function ($uibModal, $log, $document, $scope, $compile) {
		var $modal = this;
		$modal.open = function (size, parentSelector, index) {

			var parentElem = parentSelector ? angular.element($document[0].querySelector('.invoicemodal ' + parentSelector)) : undefined;
			var modalInstance = $uibModal.open({
					windowTopClass: 'invoicemodal',
					animation: true,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'myModalContent.html',
					controller: 'ModalInstanceCtrl',
					controllerAs: ' ',
					size: size,
					appendTo: parentElem
			});

			/** OLD FUNCTION  **/
			$scope.productDetails = {};
				// Empty first
				$(".invoicemodal .modal-body").empty();

				/* Create new one */
				if(!index && index != 0){
					// ProductID to "new" so a "save" is a new entry.
					$scope.productDetails['productId'] = 'new';
					$scope.productDetails['invoiceId'] = $scope.details['invoiceId'];

					// Append compiled data to InvoiceModal.
					$(".invoicemodal .modal-body").append($compile('<edit-product data="productDetails"></edit-product>')($scope));
				} else {
				/* Edit excisting one */
					// Make product object.
					$scope.productDetails = $scope.details.products[index];
					// Add productId & invoiceId so it knows where to save.
					$scope.productDetails['productId'] = index;
					$scope.productDetails['invoiceId'] = $scope.details['invoiceId'];
					
					// Append compiled data to InvoiceModal.
					$(".invoicemodal .modal-body").append($compile('<edit-product data="productDetails"></edit-product>')($scope));
				}
			/**  // OLD FUNCTION  **/
			
			console.log($scope.productDetails);
			

			modalInstance.result.then(function (selectedItem) {
				$modal.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
	});
	app.controller('ModalInstanceCtrl', function ($uibModalInstance, $rootScope) {
		var $modal = this;

		$modal.ok = function ($scope) {
			var productForm  = $(".invoicemodal .modal-body form");			// Get the form
			var invoicesJSON = $rootScope.invoices;							// Get the product JSON

			productForm.submit(function(e, $scope){
				e.preventDefault();											// Prevent what you normally do with a form (post & refresh page).
				var formdata =  $.deparam(productForm.serialize());			// Get all data from the submitted form.
				var invoiceNo = formdata.invoiceId - 1;
				var productId = formdata.productId;

				console.log(formdata.productId);
				
				if(formdata.productId == "new"){					
					invoicesJSON[invoiceNo].products.push({
						"date": formdata.date, 
						"product": formdata.product,
						"price": formdata.price
					});

					$(".invoicemodal").modal('hide');
				} else {						
					console.log("Saving existing product");
					$(".invoicemodal").modal('hide');
				}
			});

			console.log($rootScope.invoices);
			
			$rootScope.invoices = invoicesJSON; // Update the invoices rootscope.
			$(productForm).submit();	 		// Submit the form.. run above function - "productForm.submit".	
		};

		$modal.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});
	/***** // MODAL *****/
	
	
	app.directive('editProduct', ['$http', '$rootScope', '$compile', function ($http, $rootScope, $compile) {
		function controller($scope, $compile){
			
			$scope.submitProductForm = function($scope){
				var productForm = $(".invoicemodal .modal-body form");			// Get the form
				var invoicesJSON = $rootScope.invoices;			// Get the product JSON

				productForm.submit(function(e, $scope){
					e.preventDefault();											// Prevent what you normally do with a form (post & refresh page).
					var formdata =  $.deparam(productForm.serialize());			// Get all data from the submitted form.
					var invoiceNo = formdata.invoiceId - 1;
					var productId = formdata.productId;
					
					if(formdata.productId == "new"){						
						invoicesJSON[invoiceNo].products.push({
							"date": formdata.date, 
							"product": formdata.product,
							"price": formdata.price
						});

						$(".invoicemodal").modal('hide');
					} else {						
						console.log("Saving existing product");
						$(".invoicemodal").modal('hide');
					}
				});

				$rootScope.invoices = invoicesJSON; // Update the invoices rootscope.
				$(productForm).submit();	 		// Submit the form.. run above function - "productForm.submit".	
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
	}]);
	
	
	
})();
