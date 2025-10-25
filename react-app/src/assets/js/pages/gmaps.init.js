/*
Template Name: Upcube -  Admin & Dashboard Template
Author: Themesdesign
Contact: themesdesign.in@gmail.com
File: gmaps init Js File
*/

var map;
$(document).ready(function () {
  // Markers
  // map = new GMaps({
  //   div: '#gmaps-markers',
  //   lat: -12.043333,
  //   lng: -77.028333
  // });
  // map.addMarker({
  //   lat: -12.043333,
  //   lng: -77.03,
  //   title: 'Lima',
  //   details: {
  //     database_id: 42,
  //     author: 'HPNeo'
  //   },
  //   click: function(e){
  //     if(console.log)
  //       console.log(e);
  //     alert('You clicked in this marker');
  //   }
  // });

  // Overlays
  // map = new GMaps({
  //   div: '#gmaps-overlay',
  //   lat: -12.043333,
  //   lng: -77.028333
  // });
  // map.drawOverlay({
  //   lat: map.getCenter().lat(),
  //   lng: map.getCenter().lng(),
  //   content: '<div class="gmaps-overlay">Lima<div class="gmaps-overlay_arrow above"></div></div>',
  //   verticalAlign: 'top',
  //   horizontalAlign: 'center'
  // });

  //panorama
  // map = GMaps.createPanorama({
  //   el: '#panorama',
  //   lat : 42.3455,
  //   lng : -71.0983
  // });

  //Map type
  map = new GMaps({
    div: '#gmaps-types',
    lat: 24.438902,
    lng: 54.394597,
    mapTypeControlOptions: {
      mapTypeIds: ["hybrid", "roadmap", "satellite", "terrain", "osm"]
    }
  });
  map.addMarkers([{
    lat: 24.438902,
    lng: 54.394597,
    title: 'Route 1',
    details: {
      id: 42,
      author: 'John Smith'
    },
    infoWindow: {
      content: '<h5>Route 1</h5><h6>John Smith</h6>',
      maxWidth: 100
    }
  },
  {
    lat: 24.416033,
    lng: 54.445696,
    title: 'Route 2',
    details: {
      id: 43,
      author: 'Jane Doe'
    },
    infoWindow: {
      content: '<h5>Route 2</h5><h6>Jane Doe</h6>',
      maxWidth: 100
    }
  }
  ]);
  // map.drawRoute({
  //   origin: [24.438902, 54.394597],
  //   destination: [24.416033, 54.445696],
  //   travelMode: 'driving',
  //   strokeColor: '#131540',
  //   strokeOpacity: 0.6,
  //   strokeWeight: 6
  // });

  map.fitZoom();

  map.addMapType("osm", {
    getTileUrl: function (coord, zoom) {
      return "https://a.tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
    },
    tileSize: new google.maps.Size(256, 256),
    name: "OpenStreetMap",
    maxZoom: 18
  });
  map.setMapTypeId("osm");
});