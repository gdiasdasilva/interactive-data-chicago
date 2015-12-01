$( document ).ready(function()
{
    var map, polys = [];
    var fColor;
    var bounds = new google.maps.LatLngBounds();
    
    var mapOptions = {
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var index = 0;

    for (var d in districts) {
      
      if(index % 2 == 0)
        fColor = '#FF0000';
      else
        fColor = '#00b33c';

      index++;

      var i = 0;
      var pts = [];

      for (var j = 0; j < districts[d].length; j++) {
        pts[i++] = new google.maps.LatLng(districts[d][j][1], districts[d][j][0]);
        bounds.extend(pts[i-1]);
      }

      var poly = new google.maps.Polygon({
        paths: pts,
        strokeColor: 'black',
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: fColor,
        fillOpacity: 0.3,
      });

      polys.push(poly);
    };

    for (var i = 0; i < polys.length; i++) {
      polys[i].setMap(map);
    };

    // Set the center of the map
    map.center = bounds.getCenter();
    // Make the map fit all markers
    map.fitBounds(bounds); 
});