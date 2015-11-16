/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var redirecturl ; 
 var pictureSource; // picture source
var destinationType; // sets the format of returned value
// Wait for device API libraries to load

 function gotoserver() {
                sn = document.getElementById('server').value;
                redirecturl = 'http://'+sn;
				app.initialize();
                //document.location.href=redirecturl;
        };

		
var app = {
	
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		
        app.receivedEvent('deviceready');
		    redirecturl = document.getElementById('server').value;
			
		sessionStorage.openedIAB = 1;		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
		alert("hello");
		 pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
		var ref = cordova.InAppBrowser.open("browse.html", '_blank', 'location=no,hidden=yes,zoom=no');		  
		ref.addEventListener("loadstop", function() {
			ref.show();
				//alert("loading stop");
				 navigator.notification.activityStop();
		});
		

		ref.addEventListener("loadstart", function() {
			//alert("loading start");				 
			 navigator.notification.activityStart("", "");
		});
		
		ref.addEventListener("loaderror", function() {
			//alert("loading error");				 
			 navigator.notification.activityStop();
		})
		
		ref.addEventListener('exit', function(event) {			
			if (sessionStorage.openedIAB &&  sessionStorage.openedIAB == 1) {
				sessionStorage.openedIAB = 0;
				navigator.app.exitApp(); 
				}
			});
		
    }
	
};

function onPhotoDataSuccess(imageURI) {
	alert("fire");
    // Uncomment to view the base64-encoded image data
    console.log(imageURI);
    // Get image handle
    //
   // var cameraImage = document.getElementById('image');
    // Unhide image elements
    //
   // cameraImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
   // cameraImage.src = imageURI;
}
// Called when a photo is successfully retrieved
//

function onPhotoURISuccess(imageURI) {
	alert("fire");
    // Uncomment to view the image file URI
    console.log(imageURI);
    // Get image handle
    //
   // var galleryImage = document.getElementById('image');
    // Unhide image elements
    //
    //galleryImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    //galleryImage.src = imageURI;
}
// A button will call this function
//

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 30,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: true
    });
}
// A button will call this function
//

function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 30,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}
// Called if something bad happens.
//

function onFail(message) {
    //alert('Failed because: ' + message);
}