$(document).ready(function() {

	$(".file-dropzone").on('dragover', handleDragEnter);
	$(".file-dropzone").on('dragleave', handleDragLeave);
	$(".file-dropzone").on('drop', handleDragLeave);

	function handleDragEnter(e) {

		this.classList.add('drag-over');
	}

	function handleDragLeave(e) {

		this.classList.remove('drag-over');
	}

	// "dropzoneForm" is the camel-case version of the form id "dropzone-form"
	Dropzone.options.dropzoneForm = {

		url : "upload",
		autoProcessQueue : false,
		uploadMultiple : true,
		maxFilesize : 10, // MB
		parallelUploads : 6,
		maxFiles : 6,
		maxfilesexceeded: function(file) {
			this.removeFile(file);
	    },
	    acceptedFiles : ".pdf",
		addRemoveLinks : true,
		previewsContainer : ".dropzone-previews",

		// The setting up of the dropzone
		init : function() {
			
			var myDropzone = this;

			// first set autoProcessQueue = false
			$('#upload-button').on("click", function(e) {

				myDropzone.processQueue();
			});

			// customizing the default progress bar
			this.on("uploadprogress", function(file, progress) {

				progress = parseFloat(progress).toFixed(0);

				var progressBar = file.previewElement.getElementsByClassName("dz-upload")[0];
				progressBar.innerHTML = progress + "%";
			});

			// displaying the uploaded files information in a Bootstrap dialog
			this.on("successmultiple", function(files, serverResponse) {
				//showInformationDialog(files, serverResponse);
				setTimeout(function(){ $("#download-button").show(); }, 9000);
				$('#alfrescoModal').modal('hide'); 
				//$('#alfrescoModal').remove();
			});
		}
	}

	function showInformationDialog(files, objectArray) {

		var responseContent = "";

		for (var i = 0; i < objectArray.length; i++) {

			var infoObject = objectArray[i];

			for ( var infoKey in infoObject) {
				if (infoObject.hasOwnProperty(infoKey)) {
					responseContent = responseContent + " " + infoKey + " -> " + infoObject[infoKey] + "<br>";
				}
			}
			responseContent = responseContent + "<hr>";
		    //$('#alfrescoModal').modal('hide');
		    //$("#alfrescoModal").html("");
			/*$("#alfrescoModal").on("hidden", function() {  // remove the actual elements from the DOM when fully hidden
		        $("#alfrescoModal").remove();
		        $('#alfrescoModal').modal('hide');
		    });*/

		}

		// from the library bootstrap-dialog.min.js
		/*BootstrapDialog.show({
			title : '<b>Server Response</b>',
			message : responseContent
		});*/
	}

});