var map,infoWindow; //map + infoWindow for map
var personMarker; //holds hotspot that shows user pos

var userAddress; //holds user adress entered in input field
var hotspotWindow; //holds infowindow for hotspot 

var srcImage = 'overlay_img.jpg';
var i;
//creates map
//is called when page loads
function initMap() {
	//INITIALIZE MAP
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.952583, lng: -75.165222},
          zoom: 12
        });
	    infoWindow = new google.maps.InfoWindow;
	//FIND USERS LOCATION	
		if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
		  console.log("FIRE");
	//RECORDS POSITION OF USER
        	var pos = {
            	lat: position.coords.latitude,
             	lng: position.coords.longitude
		};
	//DATA OF HOTSPOT LOCATIONS
			var locations = [
				['FILLMORE', 39.9658, -75.1347, 4],
				['WORLD CAFE LIVE', 39.9521, -75.1851, 5],
				['ELECTRIC FACTORY', 39.9594, -75.1496, 3],
				['TLA', 39.9413, -75.1487, 2],
				['UNION TRANSFER', 39.9614, -75.1553, 1]
			];
		
	//CREATES USER MARKER
		  personMarker = new google.maps.Marker({
            	map: map,
				animation: google.maps.Animation.DROP,
				icon: {url:'img/user3.png', scaledSize: new google.maps.Size(35, 35)},
            	position: pos
			});
		
		   map.setCenter(pos);
	
	//CREATES INDIVIDUAL MARKERS FOR VENUES
			for (i = 0; i < locations.length; i++) {  
				marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				icon: {url:'img/hotspot.png', scaledSize: new google.maps.Size(47, 50)},
				map: map
				});
		  
		  // Add circle overlay and bind to marker
		  var circle = new google.maps.Circle({
			map: map,
			radius: 50,    // 10 miles in metres
			fillColor: '#45C6C5',
			strokeColor: '#45C6C5'
		  });
		  circle.bindTo('center', marker, 'position');
		  console.log(circle.radius);
		  console.log(locations[i][0]);
		  	
		  }}, function isMarkerInRadius(personMarker, circle) {
			//return google.maps.geometry.spherical.computeDistanceBetween(pos, circle.getCenter()) <= circle.getRadius();
		  },
		  function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
	
      }
	//handles error if geolocation fails
   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
	  
      }

//end of map creating and location

//Function to convert hotspot and drop marker
//takes user inputed adress and converts it
//drops a marker down at that point

function makeHotspot() {
	console.log('makeHotspot called');
	var position = "";
	
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
				position: results[0].geometry.location,
				icon: {url:'img/hotspot.png', scaledSize: new google.maps.Size(47, 50)},			
			});
			 
			// marker.setIcon('img/hotspot.png');
			
			marker.addListener('click', function(){
				hotspotWindow.open(map, marker);
			});
			
			console.log(results[0].geometry.location.lat());
			
			
			userPos(function(id){
				console.log(id.coords.latitude);
				
				if((id.coords.latitude = results[0].geometry.location.lat()) && (id.coords.longitude = results[0].geometry.location.lng())) {
					console.log('HELLO');	
				}else{
					console.log('GOODBYE');
					return
				}
			})
			
			
			
		} else {
        	alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}


//end of entering hotspot

//pulling user location data
function userPos(callback) {
	navigator.geolocation.getCurrentPosition(function(position) {
		  console.log("FIRE");
        	var tempPos = {
            	lat: position.coords.latitude,
             	lng: position.coords.longitude
		};
	
	return callback(position,tempPos)
});

}
			 