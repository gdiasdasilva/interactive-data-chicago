$( document ).ready(function()
{
    var map, polys = [];
    var fColor;
    var bounds = new google.maps.LatLngBounds();

    var mapOptions = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable: false
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    for (var d in districts) {
      var
        name = districts[d].name,
        coord = districts[d].simple_shape.coordinates[0][0];
      ;
      var i = 0;
      var pts = [];
      for (var j = 0; j < coord.length; j++) {
        pts[i++] = new google.maps.LatLng(coord[j][1], coord[j][0]);
        bounds.extend(pts[i-1]);
      }
      var poly = new google.maps.Polygon({
        paths: pts,
        strokeColor: 'black',
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: '#3182bd',
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
