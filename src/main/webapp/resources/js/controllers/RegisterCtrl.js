/*//Controller represents SearchBooking page
var myApp = angular.module('solasVGMiapp', []);

myApp.config(['$httpProvider','$locationProvider', function($httpProvider, $locationProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $locationProvider.html5Mode(true);
}]);

myApp.controller(	'RegisterCtrl',function($scope, $http, $location, $window) {

					$scope.button = "SEARCH";
					$scope.containers = [];
					$scope.clientcontainer = false;
					//Search criteria
					$scope.searchCriteria = {
						bookingNumber : '',
						containerNumber : '',
						containers : ''
					};
					
					$scope.init = function () {
						var bookingNum = $location.search().bookingNumber;
						console.log(bookingNum);
						if(bookingNum != null){
							$scope.bookingNumber = bookingNum;
							$scope.fetchContainer();
						}
					};
					
					*//**
					 * Do nothing if backspace is pressed accidently on page body
					 * but allow backspace to work if backspace pressed on Input field
					 *//*
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

					*//**
					 * Search logic
					 *//*
					$scope.search = function() {
						$('.spinner').show();
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

						}
					};

					*//**
					 * Fetch the association.
					 *//*
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

					*//**
					 * On entering BookingNumber fetch respective container numbers
					 *//*
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

					*//**
					 * Refresh
					 *//*
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


					*//**
					 * Create association in db as both not exists
					 *//*
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

					*//**
					 * Common error block
					 *//*
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
*/




/**
 * 
 */

var module = angular.module('SolasVGMiapp', []);

module.controller('RegisterCtrl', function($scope, $http) {
	
	$('#solas-registration').css('display','block');
	$scope.isLogin = true;
	$scope.isRegistration = false;
	$scope.registration ={};
	$scope.isError = false;
	$scope.isEmailSent = false;
	
	$scope.showRegistration = function() {
		$scope.isLogin = false;
		$scope.isRegistration = true;
		$scope.isEmailSent = false;
		
	}

	$scope.validateRegistrationForm = function(registration){
		
		var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
		
		if (registration.firstname == undefined || registration.firstname.length == 0) {
			$scope.isError = true;
			$scope.message = "Please enter a value in the First Name field";
			return;
		}
		else if (registration.lastname == undefined || registration.lastname.length == 0) {
			$scope.isError = true;
			$scope.message = "Please enter a value in the Last Name field";
			return;
		} else if (registration.phone == undefined || registration.phone.length == 0) {
			$scope.isError = true;
			$scope.message = "Please enter a value in the Phone field";
			return;
		} else if (registration.email == undefined || registration.email.length == 0) {
			$scope.isError = true;
			$scope.message = "Please enter a value in the Email field";
			return;
		} else if (registration.email == '' || !re.test(registration.email)) {
			    $scope.isError = true;
				$scope.message = "Please enter a valid email address.";
			    return;
		} 
		//Removing user id as per GH issue #239
		/*else if (registration.userid == undefined || registration.userid.length == 0) {
			$scope.isError = true;
			$scope.message = "Please enter a value in the Userid field";
			return;
		}*/ else if (registration.password == undefined || registration.password.length == 0) {
			$scope.isError = true;
			$scope.message = "Please enter a value in the Password field";
			return;
		} else if (registration.verifypassword == undefined || registration.verifypassword.length == 0) {
			$scope.isError = true;
			$scope.message = "Please enter a value in the Verify Password field";
			return;
		}else if (!(registration.password  === registration.verifypassword)) {
			$scope.isError = true;
			$scope.message = "Passwords did not match";
			return;
		} else if (registration.company == undefined || registration.company.length == 0) {
			$scope.isError = true;
			$scope.message = "Please enter a value in the Company field";
			return;
		} else if (registration.address == undefined || registration.address.length == 0) {
			$scope.isError = true;
			$scope.message = "Please enter a value in the Address field";
			return;
		} else if (registration.city == undefined || registration.city.length == 0) {
			$scope.isError = true;
			$scope.message = "Please enter a value in the City field";
			return;
		} else if (registration.state == undefined || registration.state.length == 0) {
			$scope.isError = true;
			$scope.message = "Please enter a value in the State field";
			return;
		} else if (registration.zip == undefined || registration.zip.length == 0) {
			$scope.isError = true;
			$scope.message = "Please enter a value in the Zip field";
			return;
		} else if (registration.country == undefined || registration.country.length == 0) {
			$scope.isError = true;
			$scope.message = "Please enter a value in the Country field";
			return;
		}
	}
	
	$scope.saveRegistration = function(registration){
		$scope.isError = false;
		$scope.validateRegistrationForm(registration);
		
		if($scope.isError){
			return;
		}
		
		$http.post("saveregistration/", registration).success(function(res) {
			$scope.clearRegistration();
			$scope.isEmailSent = true;
			$scope.isRegistration = false;
			$scope.isLogin =false;
			//alert("You request was successfully submitted. You will receive an email when your login id is created.");
			
		});	
	
};

	$scope.clearRegistration = function(){
		$scope.isError = false;
		$scope.registration ={};
		$scope.registration.firstname ="";
		$scope.registration.lastname ="";
		$scope.registration.phone ="";
		$scope.registration.email ="";
		$scope.registration.userid ="";
		$scope.registration.password ="";
		$scope.registration.verifypassword ="";
		$scope.registration.company ="";
		$scope.registration.address ="";
		$scope.registration.city ="";
		$scope.registration.state ="";
		$scope.registration.zip ="";
		$scope.registration.country ="";
	};

});