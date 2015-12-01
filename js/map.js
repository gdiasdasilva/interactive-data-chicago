$(document).ready(function() {
    var incidents = [],
        max = 0,
        min = 0;
    $.ajax({
        url: 'ajax.php',
        type: 'GET',
        dataType: 'json',
        async: false
    }).done(function(res) {
        incidents = res.incidents;
        max = res.max;
        min = res.min;
    });
    var map, polys = [];
    var fColor;
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
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    for (var d in districts) {
        var name = districts[d].name,
            coord = districts[d].simple_shape.coordinates[0][0],
            area_number = districts[d].metadata.AREA_NUMBE;
        var sat = (incidents[area_number] - min) / ((max - min) * 1.0);
        var i = 0;
        var pts = [];
        for (var j = 0; j < coord.length; j++) {
            pts[i++] = new google.maps.LatLng(coord[j][1], coord[j][0]);
            bounds.extend(pts[i - 1]);
        }
        var poly = new google.maps.Polygon({
            paths: pts,
            strokeColor: 'black',
            strokeOpacity: 1,
            strokeWeight: 0.4,
            fillColor: rgbToHex(hsvToRgb(0, sat * 100, 100)),
            fillOpacity: 0.7,
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
