var map,infoWindow;
var personMarker;
//var pos;
var hotspotMarker;
var posLAT,posLNG;
//marker end
var temp;
var hotspot1;
var userCurrentPosition;
var hotspotLocationOne;
var userAddress;
var hotspotWindow;

//example from google
//find user location

// Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
     
	  //creates a new map

function userPOS(callback){ navigator.geolocation.getCurrentPosition(function(position) {
		pos = {
       		lat: position.coords.latitude,
			lng: position.coords.longitude							 
		};	
//	callback1(pos.lat);
//	callback2(pos.lng);
	
	
});
		  }

function userPOS(x){
	console.log('userPos called');
	console.log(x);
	
	return x;
}

function hotspotPOS(z,y){
	console.log('hotspotPOS called');
	var hotspotPOSITION = {
		lat: z,
		lng: y
	}
	console.log(hotspotPOSITION);
	
	return hotspotPOSITION;
}


var srcImage = 'overlay_img.jpg';

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
	    infoWindow = new google.maps.InfoWindow;
		
		if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
		  console.log("FIRE");
        	var pos = {
            	lat: position.coords.latitude,
             	lng: position.coords.longitude
		};
		  temp = pos;
		  userCurrentPosition = userPOS(temp);
//		   var pos = userPos();
		   
		  personMarker = new google.maps.Marker({
            	map: map,
				animation: google.maps.Animation.DROP,
            	position: pos
			});
		   personMarker.setIcon('../img/portfolio-hotspot.png');
           map.setCenter(pos);
		  	
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
	
      }

   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
	  
      }



//end of example/user location

//Entering a hotspot start

//takes user inputed adress and converts it

//var overlay;
//
//customOverlay.prototype = new google.maps.OverlayView();


function makeHotspot() {
	console.log('makeHotspot called');
	
	userAddress = document.getElementById('address').value;
	console.log(userAddress);
	
	geocoder = new google.maps.Geocoder();
	
	geocoder.geocode( { 'address': userAddress}, 
	function(results, status) {
      
		if (status == 'OK') {
        
		map.setCenter(results[0].geometry.location);
	
		var contentString = '<div id = "swapHotspot-container">'+'<div id="userProfile">'+'</div>'+'<div id="userBio">'+'</div>'+'<div id="swapSongs">'+'</div>'+'<div id="stickers">'+'</div>'+'</div>';
			
			
		hotspotWindow = new google.maps.InfoWindow({
			content: contentString
		});

			//puts the marker down at address
			var marker = new google.maps.Marker({
            	map: map,
				animation: google.maps.Animation.DROP,
            	position: results[0].geometry.location			
			});
			 
			marker.setIcon('../img/hotspot.png');
			
			marker.addListener('click', function(){
				hotspotWindow.open(map, marker);
			});
      		
//		  overlay = new customOverlay(marker.position, srcImage, map);
			
		} else {
        	alert('Geocode was not successful for the following reason: ' + status);
      }
    });
	
}

//function customOverlay(bounds, image, map){
//	
//	this.bounds_ = bounds;
//    this.image_ = image;
//    this.map_ = map;
//	
//	this.div_ = null;
//	this.setMap(map);
//}
//
//	customOverlay.prototype.onAdd = function() {
//		
//		var div = document.createElement('div');
//        div.style.borderStyle = 'none';
//        div.style.borderWidth = '0px';
//        div.style.position = 'absolute';
//		
//		var img = document.createElement('img');
//        img.src = this.image_;
//        img.style.width = '100%';
//        img.style.height = '100%';
//        img.style.position = 'absolute';
//        div.appendChild(img);
//		
//		this.div_ = div;
//		
//		var panes = this.getPanes();
//        panes.overlayLayer.appendChild(div);
//	};
//	
//	customOverlay.prototype.draw = function() {
//		
//	};
//	
//	 customOverlay.prototype.onRemove = function() {
//        this.div_.parentNode.removeChild(this.div_);
//      };
//	
//	customOverlay.prototype.hide = function() {
//		if (this.div_) {
//          // The visibility property must be a string enclosed in quotes.
//          this.div_.style.visibility = 'hidden';
//        }
//	};
//	
//	customOverlay.prototype.toggle = function(){
//		if (this.div_) {
//          if (this.div_.style.visibility === 'hidden') {
//            this.show();
//          } else {
//            this.hide();
//          }
//        }
//	};
//	
//console.log(personMarker.position);
//console.log(marker.position);


//checks user's location with marke location
//console.log(userCurrentPosition);
//console.log(hotspotLocationOne);
//function checkUser(){
//	 navigator.geolocation.getCurrentPosition(function(position) {
//		  console.log("FIRE");
//        	var pos = {
//            	lat: position.coords.latitude,
//             	lng: position.coords.longitude
//		};
//		
//		 userCurrentPosition = userPOS(pos);
//	 });
//	
//	geocoder = new google.maps.Geocoder();
//	
//	geocoder.geocode( { 'address': userAddress}, 
//	function(results, status) {
//      
//		if (status == 'OK') {
//        	map.setCenter(results[0].geometry.location);
//					  hotspotLocationOne = hotspotPOS(hLAT, hLNG);
//		}else {
//        	alert('Geocode was not successful for the following reason: ' + status);}
//		 
//		hotspotLocationOne = hotspotPOS(hLAT, hLNG);
//	});
//	
//	console.log(userCurrentPosition);
//	console.log(hotspotLocationOne);
//			
//}
//
//checkUser();