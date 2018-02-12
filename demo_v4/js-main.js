var map,infoWindow; //map + infoWindow for map
var personMarker; //holds hotspot that shows user pos

var userAddress; //holds user adress entered in input field
var hotspotWindow; //holds infowindow for hotspot 

var srcImage = 'overlay_img.jpg';
var overlay = document.getElementById('overlay'); 
//creates map
//is called when page loads
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
            	position: results[0].geometry.location			
			});
			 
			marker.setIcon('../img/hotspot.png');
			
			marker.addListener('click', function(){
                overlay.classList.remove("off");
                overlay.classList.add("on");
                
			});
			
			console.log(results[0].geometry.location.lat());
			
			
			userPos(function(id){       
                var lat = id.coords.latitude;
                var lng = id.coords.longitude;
                var temp = .0008;

                
                var newLat = rangeChecker(lat, results[0].geometry.location.lat(), temp );
                console.log(newLat);
                
                var newLng = rangeChecker(lng,results[0].geometry.location.lng(), temp );
                console.log(newLng);
                
                //rangeChecker==bool
                //
                
                if(newLat == true && newLng == true){
                    console.log("HELLO");
                    
                } else{
                    console.log("GOODBYE");
                }
            });
			
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

//testing: if user is in range or not
function rangeChecker(op, target, range){
    return op < target + range && op > target - range;
}

function closeOverlay(){
    console.log("closeOverlay called");
    
    overlay.classList.remove("on");
    overlay.classList.add("off");
}