//Controller represents SearchBooking page
var app = angular.module('hazmatApp', []);

app.config(['$httpProvider','$locationProvider', function($httpProvider, $locationProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $locationProvider.html5Mode(true);
}]);

app.controller(	'SearchCtrl',function($scope, $http, $location, $window) {

					$scope.button = "REGISTER";
					
					
					/*$scope.init = function () {
						var bookingNum = $location.search().bookingNumber;
						console.log(bookingNum);
						if(bookingNum != null){
							$scope.bookingNumber = bookingNum;
							$scope.fetchContainer();
						}
					};*/
					
					/**
					 * Do nothing if backspace is pressed accidently on page body
					 * but allow backspace to work if backspace pressed on Input field
					 */
					document.body.addEventListener("keydown", function()
							{
									    var doPrevent = false;
									    if (event.keyCode === 8) {
									        var d = event.srcElement || event.target;
									        if ((d.tagName.toUpperCase() === 'INPUT' && 
									             (
									                 d.type.toUpperCase() === 'TEXT' ||
									                 d.type.toUpperCase() === 'PASSWORD' || 
									                 d.type.toUpperCase() === 'FILE' || 
									                 d.type.toUpperCase() === 'SEARCH' || 
									                 d.type.toUpperCase() === 'EMAIL' || 
									                 d.type.toUpperCase() === 'NUMBER' || 
									                 d.type.toUpperCase() === 'DATE' )
									             ) || 
									             d.tagName.toUpperCase() === 'TEXTAREA') {
									            doPrevent = d.readOnly || d.disabled;
									        }
									        else {
									            doPrevent = true;
									        }
									    }

									    if (doPrevent) {
									        event.preventDefault();
									    }
							});

					/**
					 * Search logic
					 */
					$scope.search = function() {
						/*$('.spinner').show();
						$("#pb").empty();
						var hasFocus = $('input#inputcontainer').is(':focus');

						if ((typeof ($scope.bookingNumber) === "undefined")
								&& typeof ($scope.containerNumber === "undefined")) {
							$scope.error("Booking Number Cannot Be Empty!!");
						}
						if ((typeof ($scope.bookingNumber) != "undefined")
								&& typeof ($scope.containerNumber == "undefined")) {
							this.fetchContainer();
						}
						if(typeof ($scope.containerNumber) === "undefined" && hasFocus)
						{
							$scope.error("Container number is required to search");
							$('.spinner').hide();
							return false;
						}
						if((typeof ($scope.bookingNumber) != "undefined") && typeof ($scope.containerNumber) != "undefined")
						{
							this.fetchAssociation();

						}*/
						this.register();
					};
					
					/* Register Logic*/
					$scope.register = function() {
						
						if ((typeof ($scope.firstName) === "undefined")){
								$scope.error("First Name Cannot Be Empty!!");
						}
						if ((typeof ($scope.lastName) === "undefined")){
							$scope.error("Last Name Cannot Be Empty!!");
						}
						if ((typeof ($scope.userName) === "undefined")){
							$scope.error("User Name Cannot Be Empty!!");
						}
						if ((typeof ($scope.email) === "undefined")){
							$scope.error("Email Name Cannot Be Empty!!");
						}
						if ((typeof ($scope.password) === "undefined")){
							$scope.error("Password Cannot Be Empty!!");
						}
						if ((typeof ($scope.confirmPassword) === "undefined")){
							$scope.error("Confirm Password Cannot Be Empty!!");
						}
						
						
					};

					/**
					 * Fetch the association.
					 */
					$scope.fetchAssociation = function()
					{
						if ((typeof ($scope.bookingNumber) != "undefined")
								&& (typeof ($scope.containerNumber) != "undefined"))
						{

							$scope.containerNumber = $scope.containerNumber.toUpperCase();
							if($scope.containerNumber.length == 6 || $scope.containerNumber.length == 7)
							{
								if(!isNaN($scope.containerNumber))
								{
									$scope.containerNumber = "MATU"+($scope.containerNumber);
								}
							}
							if($scope.containerNumber.length == 11 ){
								$scope.containerNumber = $scope.containerNumber.substr(0,10);
							}

							//$('.spinner').show();
							$http(
									{
										method : 'GET',
										url : 'search/association/'
												+ $scope.bookingNumber + "/"
												+ $scope.containerNumber,
										dataType : "json",
										headers : {
											"Content-Type" : "application/json"
										}
									})
									.success(
											function(data) {
												$scope.gridRefresh();
												$('.spinner').hide();
											}).error(function(response) {
												console.log(response);
												if( response.toString().indexOf("SESSION_TIMED_OUT") > -1){
													$window.location.href = 'login?invalid=true';
												}
												$('.spinner').hide();
												
												if(response.message === "Container does not exist in GEMS"){
													$scope.clientcontainer = true;
													$("#associationModal").modal('show');
													var message = "<b>Container #"+$scope.containerNumber+" does not exist in GEMS. " +
															"Continue as a client container and create association with Booking #"+$scope.bookingNumber+" ?</b>"
													document.getElementById('displayMessage').innerHTML = message;
												}
												else if(response.message === "Association Not Found"){
													$scope.clientcontainer = false;
													$("#associationModal").modal('show');
													var message = "<b>There is no association between Container#"+$scope.containerNumber+" and Booking#"+$scope.bookingNumber+". Would you like to create that association now?</b> "
													document.getElementById('displayMessage').innerHTML = message;
												}
												else{
													$scope.error(response.message);
												}
									});
						}
					};

					/**
					 * On entering BookingNumber fetch respective container numbers
					 */
					$scope.fetchContainer = function() {
						$scope.button = "PLEASE WAIT....";
						$http({
							method : 'GET',
							url : 'search/booking/' + $scope.bookingNumber,
							dataType : "json",
							headers : {
								"Content-Type" : "application/json"
							}
						})
							.success(function(data) {
								var ic = $('#inputcontainer');
									$('.spinner').hide();
									if(data.length > 0) {
										for(var i=0; i < data.length; i++ ) {
											$scope.containers.push(data[i].containerNumber)
										}
										ic.css('background-color', '#ccffff').focus();
									}
									$scope.button = "SEARCH";
							})
							.error(
										function(response) {
											console.log(response);
											if( response.toString().indexOf("SESSION_TIMED_OUT") > -1){
												$window.location.href = 'login?invalid=true';
											}

											if(typeof (response.errorStackTrace)!="undefined")
											{
												if(response.errorStackTrace.indexOf("DB Unreachable") > 0)
												{
													$scope.error("Databae Unreachable, Please contact system administrator");
												}
											}
											$scope.error(response.message);
											
											$('.spinner').hide();
											$scope.button = "SEARCH";
										});
					};

					/**
					 * Refresh
					 */
					$scope.gridRefresh = function() {
						$http.get(
								'search/association/' + $scope.bookingNumber
										+ "/" + $scope.containerNumber)
								.success(function(data) {
									if(data.length == 0)
									{
										$scope.error("No Records Found!!!");
									}
									else
									{
										window.localStorage.setItem('object',JSON.stringify(data));
										$window.location.href = 'freightDetails';
										$scope.button = "SEARCH";
									}
								}).error(function(data) {
									if( data.toString().indexOf("SESSION_TIMED_OUT") > -1){
										$window.location.href = 'login?invalid=true';
									}

					          });
					};


					/**
					 * Create association in db as both not exists
					 */
					$scope.createAssociation = function()
					{
						console.log('Client Container : ');
						console.log($scope.clientcontainer);
						$('.spinner').show();
						$http.post('booking/'+ $scope.bookingNumber + "/"	+ $scope.containerNumber+ "/" + $scope.clientcontainer)
						.success(
								function(data) {
									window.localStorage.setItem('object',JSON.stringify(data));
									$window.location.href = 'freightDetails';
									$('.spinner').hide();
							}).error(function(data) {
								if( data.toString().indexOf("SESSION_TIMED_OUT") > -1){
									$window.location.href = 'login?invalid=true';
								}
								$('.spinner').hide();
								$("#associationModal").modal('toggle');
								$scope.error(data.message);

									console.log('Error: ' + data);
							});
					}

					/**
					 * Common error block
					 */
					$scope.error = function(message)
					{
						var iDiv = document.getElementById('associationNotFound');
						if (!iDiv) {
								var iDiv = document	.createElement('div');
								iDiv.style.display = 'block';
								iDiv.style.height = '50px';
								iDiv.style.width = '490px';
								iDiv.className = 'alert alert-danger alert-dismissable';
								iDiv.innerHTML = "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>";
								iDiv.innerHTML += message;
								$("#pb").prepend(iDiv);
						} else {
							iDiv.style.display = 'block';
							iDiv.style.height = '50px';
							iDiv.style.width = '490px';
							iDiv.className = 'alert alert-danger alert-dismissable';
							iDiv.innerHTML = "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>";
							iDiv.innerHTML += message;
							iDiv.style.display = 'block';
				   }
						$scope.button = "SEARCH";
						$('.spinner').hide();
					};

				});
