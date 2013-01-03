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
var map;
var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // This is an event handler function, which means the scope is the event.
        // So, we must explicitly called `app.report()` instead of `this.report()`.
        app.report('deviceready');
    },
    report: function(id) {
        // Report the event in the console
        console.log("Report: " + id);

        // Toggle the state from "pending" to "complete" for the reported ID.
        // Accomplished by adding .hide to the pending element and removing
        // .hide from the complete element.
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
        
    }
};


$(document).ready(function() {
	initMap();
}

function initMap(){
    var center = new google.maps.LatLng(49.2807,-123.1040);
	var myOptions = {
	    zoom: 15,
	    center: center,
	    mapTypeControlOptions: {
	    	mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID]
	    },
	    zIndex: 0,
	    disableDoubleClickZoom:true
	  };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    resizeMap();
}

function resizeMap(){
	//Resize the map to be the height of the map container minus the buttons
	var height = $(window).height() - $('#map_container').position().top - 170 - $("#footernav").height();
	if(height >= 350){
		$('#map_canvas').css('height', height);
		$('#map_container').css('height', height);
	}
	google.maps.event.trigger(map, "resize");
}
