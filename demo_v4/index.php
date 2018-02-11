<!DOCTYPE html>
<html>
<head>
	<title>Geolocation Testv3</title>
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
	<link rel="stylesheet" href="css/css-main.css">
    <link rel="stylesheet" href="css/css-nav.css">
		<link rel="stylesheet" href="css/css-infowindow.css">
    <link href="https://fonts.googleapis.com/css?family=Averia+Sans+Libre" rel="stylesheet">
	
</head>
<?php 
include 'nav.php';
?>
<body ng-app="myApp">
		
		
	  <div id="myModal" class="modal">
	  <div class="modal-content">
	  <div class="slider">
		  <span class="close">skip</span>
		<div class="slide_viewer">
		  <div class="slide_group">
			<div class="slide">
			  
			  <h1>say hello to your swapbox! 
			</h1>
			  
	  
			<p>the swapbox is a place where
	  you can simulatenously discover
	  new music, and make new 
	  friends.</p>
			</div>
			<div class="slide">
			  <h1>pin your favorite song to 
	  your profile. 
			</h1>
			<p>your pinned song is the one 
	  you love, and want others to
	  love as well. its available for
	  everyone at a hotspot event to 
	  pick up!</p>
			</div>
			
			<div class="slide">
			  <h1>collect new music in a
	  unique way.
			</h1>
	  
			<p>you’ll also be able to collect
	  others pinned songs at a 
	  hotspot event. simply tap the
	  + add button to pick it up.</p>
			  
			</div>
			
			<div class="slide">
			  <h1>discover
	  something new.</h1>
			  <p>tapping the swap button will 
	  randomly collect someone else's
	  pinned song at the event. they 
	  can accept or decline yours!  
	  </p>
			  <div class="bn-align">
			  <button type="button" id="my2Btn">got it!</button></div>
			</div> 
		  </div> 
	   
	  </div>
	  </div><!-- End // .slider -->
	  
	  <div class="slide_buttons">
	  </div>
		
	  </div>
	  
	  </div>
	<div id="wrapper">
		
		<!-- <div id="input-container">
			<input id="address" type="text">
			<button type="button" onclick="makeHotspot();">Enter</button>
		</div> -->
		
		<div id="map-container" ng-controller="MainController">
			<div id="map" style="position: inherit;" ></div>
		</div>
	</div>
	
	<script src="js-main.js"></script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDMTAmp7DTDCyx6gYt5vilMAdjudsL7z0I&callback=initMap">
	</script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	
    <script src="modal.js"></script>
    <script src="js-nav.js"></script>
  </body>
</html>