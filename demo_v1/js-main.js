var map,infoWindow;
var personMarker;
var hotspotMarker;
//marker end

//example from google
//find user location

// Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
     
	  //creates a new map


function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
	    infoWindow = new google.maps.InfoWindow;
		
		if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
             lng: position.coords.longitude
		};
//		   var pos = userPos();
		   
		  personMarker = new google.maps.Marker({
            	map: map,
				animation: google.maps.Animation.DROP,
            	position: pos
			});
		   personMarker.setIcon('portfolio-hotspot.png');
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
function makeHotspot() {
	console.log('makeHotspot called');
	
	var userAddress = document.getElementById('address').value;
	console.log(userAddress);
	
	geocoder = new google.maps.Geocoder();
	
	geocoder.geocode( { 'address': userAddress}, 
	function(results, status) {
      
		if (status == 'OK') {
        	map.setCenter(results[0].geometry.location);
			
			//puts the marker down at address
			hotspotMarker = new google.maps.Marker({
            	map: map,
				animation: google.maps.Animation.DROP,
            	position: results[0].geometry.location
								
			});
			
	marker.setIcon('hotspot.png');
			
      
		} else {
        	alert('Geocode was not successful for the following reason: ' + status);
      }
    });
	
}

//checks user's location with marker location

function checkuser(){
	
}


