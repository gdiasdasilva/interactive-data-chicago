$(document).ready(function() {
    updateMap(2003);
});

function addListeners(poly, marker) {
    google.maps.event.addListener(poly, 'mouseover', function(event) {
        this.setOptions({
            strokeColor: 'black',
            strokeWeight: 2,
            fillOpacity: 1
        });
        marker.setPosition(event.latLng);
        marker.setVisible(true);
    });
    google.maps.event.addListener(poly, 'mouseout', function(event) {
        this.setOptions({
            strokeColor: 'black',
            strokeWeight: 0.4,
            fillOpacity: 0.7
        });
        marker.setVisible(false);
    });
}

function rgbToHex(rgb) {
    return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
}

function componentToHex(comp) {
    var hex = comp.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function hsvToRgb(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;
    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;
    if (s == 0) {
        // Achromatic (grey)
        r = g = b = v;
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default: // case 5:
            r = v;
            g = p;
            b = q;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function drawIncidentsPerCommunityAreaMap(incidents, min, max) {
    $('#map').empty();
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
            featureType: 'all',
            elementType: 'labels',
            stylers: [{
                visibility: 'off'
            }],
        }]
    };
    var polys = [];
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    for (var d in geolocation) {
        var name = geolocation[d].name,
            coord = geolocation[d].simple_shape.coordinates[0][0],
            area_number = geolocation[d].metadata.AREA_NUMBE,
            sat = (incidents[area_number] - min) / ((max - min) * 1.0),
            pts = [];
        for (var j = 0; j < coord.length; j++) {
            pts[j] = new google.maps.LatLng(coord[j][1], coord[j][0]);
            bounds.extend(pts[j]);
        }
        var marker = new MarkerWithLabel({
            position: new google.maps.LatLng(0, 0),
            draggable: false,
            raiseOnDrag: false,
            map: map,
            labelContent: area_number,
            labelAnchor: new google.maps.Point(30, 20),
            labelClass: "labels", // the CSS class for the label
            labelStyle: {
                opacity: 1.0
            },
            icon: "http://placehold.it/1x1",
            visible: false
        });
        var poly = new google.maps.Polygon({
            paths: pts,
            strokeColor: 'black',
            strokeOpacity: 1,
            strokeWeight: 0.4,
            fillColor: rgbToHex(hsvToRgb(0, sat * 100, 100)),
            fillOpacity: 0.7
        });
        addListeners(poly, marker);
        polys.push(poly);
    };
    for (var i = 0; i < polys.length; i++) {
        polys[i].setMap(map);
    };
    map.center = bounds.getCenter();
    map.fitBounds(bounds);
}
// Handle year change
$(document).ready(function($) {
    $('#year-filter').on('change', function(event) {
        var year = $(this).val();
        updateMap(year);
    });
});

function updateMap(year) {
    $.ajax({
        url: 'ajax.php',
        type: 'post',
        dataType: 'json',
        data: {
            action: 'incidents_per_ca',
            year: year
        },
    }).done(function(res) {
        var incidents = res.incidents,
            max = res.max.total / res.max.population,
            min = res.min.total / res.min.population;
        drawIncidentsPerCommunityAreaMap(incidents, min, max);
        writeStats(getAreaName(res.max.area_code), res.max.total, year, res.max.population);
    })
}
// Writes stats next to the map
function writeStats(city, incidents, year, population) {
    var info = '<b>' + city + '</b> had ' + incidents + ' crimes commited in ' + year + ', making it the most dangerous city in Chicago. With a population of ' + population + ', this yields a crime rate of ' + (incidents/population * 100)+ ' crimes per 100 people. Mouseover the other areas to see some details!';
    console.log(info);
    $('#year-info').html(info);
}

function getAreaName(area_code) {
  for (var g in geolocation) {
    if (geolocation[g].metadata.AREA_NUMBE == area_code)
      return geolocation[g].name;
  }
}
