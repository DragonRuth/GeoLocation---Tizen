window.onload = function() {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });

    var indicator = document.getElementById("indicator");
	indicator.style.visibility = "hidden";
	

	
		
};



function RegGame() {
	
	 $(document).ready(function () {
	    $.ajax({
	        type: "POST",
	        url: REG_URL,
	        dataType: "json",
	      // datatype: "json",
	        success: jsonParserR
	    });
	});

	function jsonParserR(json) {
		console.log(json);
		//var json = JSON.parse(data);
		//indicator.style.display = "none";
	 //   $(xml).find("item").each(function () {
	    var game_id = json.game_id ;
	    var stat = json.status;
	    	  
	    var gameidText = document.querySelector('#game_id-text').innerHTML = "Game id: " + game_id ;
	    var statText = document.querySelector('#statusgame-text').innerHTML = "Status: " + stat;
	    	 
	     //   $("#rssContent").append('<div class="feed"><div class="image"><img src=' + url + ' width=' + width + 'px /><div class="title"> Title:' + $(this).find("title").text() 
	      //  		+ '</div><br><div class="description">Desc: ' + $(this).find("description").text() + '</div></div>');
	       

	    

	}
	
}


var lat;
var lon;
// Sample code
//  var mainPage = document.querySelector('#main');

//  mainPage.addEventListener("click", function() {
//      var contentText = document.querySelector('#content-text');

//     contentText.innerHTML = (contentText.innerHTML === "Basic") ? "Tizen" : "Basic";
//   });

var REG_URL = "http:/83.69.213.178:8081/init?device_id=16";
var CHECK_URL = "http:/83.69.213.178:8081/check_point?game_id=16&latitude=";





function  CheckGame(){
	
	
	
	
	 $(document).ready(function () {
		    $.ajax({
		        type: "POST",
		        url: CHECK_URL+lat +"&longitude="+lon,
		        dataType: "json",
		      //  data: {game_id: "16", latitude: lat, longitude: lon},
		        success: jsonParserC
		    });
		});

		function jsonParserC(json) {
			
			console.log(json);
			indicator.style.display = "none";
		//	var json = JSON.parse(data);
			//indicator.style.display = "none";
		 //   $(xml).find("item").each(function () {
		    var distance = json.distance ;
		    var stat = json.status;
		    var rem_p =json.remained_points;
		    var current_p = json.current_point;
		    var desc = json.description;
		    	  
		    var distanceText = document.querySelector('#distance-text').innerHTML = "Distance: " + distance ;
		    var statText = document.querySelector('#status-text').innerHTML = "Status " + stat;
		    var rempText = document.querySelector('#points-text').innerHTML = "Points left: " + rem_p;
		    var currpText = document.querySelector('#curpoints-text').innerHTML = "Cur point: " + stat;
		    var descText = document.querySelector('#desc-text').innerHTML = "Desc: " + stat;
		    	 
		     //   $("#rssContent").append('<div class="feed"><div class="image"><img src=' + url + ' width=' + width + 'px /><div class="title"> Title:' + $(this).find("title").text() 
		      //  		+ '</div><br><div class="description">Desc: ' + $(this).find("description").text() + '</div></div>');
		       

		    

		}
		
	
	
}


function successCallback(position) {
	
	
	lat = position.coords.latitude ;
	lon = position.coords.longitude;
    document.getElementById('locationInfo').innerHTML = 'Latitude: ' + position.coords.latitude +
                                                        '<br/>Longitude: ' + position.coords.longitude;
    
    CheckGame();
}

function errorCallback(error) {
    var errorInfo = document.getElementById('locationInfo');

    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorInfo.innerHTML = 'User denied the request for Geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorInfo.innerHTML = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            errorInfo.innerHTML = 'The request to get user location timed out.';
            break;
        case error.UNKNOWN_ERROR:
            errorInfo.innerHTML = 'An unknown error occurred.';
            break;
    }
}

function oneShotFunc() {
	indicator.style.visibility = "visible";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback,
                                                 {maximumAge: 3000});
    } else {
        document.getElementById('locationInfo').innerHTML = 'Geolocation is not supported.';
    }
}
 