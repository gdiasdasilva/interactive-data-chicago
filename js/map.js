$(document).ready(function() {
    updateMap(2003);
    generateTable();

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        generateScatter();  
        generateTreeMap();
    });



    $('#myModal').on('hidden.bs.modal', function() {
        myNewChart.destroy();
    })
    $('#myModal').on('shown.bs.modal', function(event) {
        $.ajax({
            url: 'ajax.php',
            type: 'post',
            dataType: 'json',
            data: {
                action: 'chart_ca_incidents',
                area_code: $('#myModal').attr('name')
            },
        }).done(function(res) {
            var tmpData = [];
            var tmpDataGlobal = [];
            for (key in res[0]) {
                tmpData.push(parseInt(res[0][key]));
                tmpDataGlobal.push(parseInt(res[1][key]));
            }
            var data = {
                labels: Object.keys(res[0]),
                datasets: [{
                    label: "Total crimes in this C.A.",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: tmpData
                }, {
                    label: "Total crimes in Chicago",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: tmpDataGlobal
                }]
            };
            var ctx = document.getElementById("myChart").getContext("2d");
            window.myNewChart = new Chart(ctx).Line(data, {
                responsive: false,
                scaleUse2Y: true,
                animation: true,
                showScale: true,
                multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
            });
        });
    });
});

function addListeners(poly, marker) {
    google.maps.event.addListener(poly, 'mouseover', function(event) {
        this.setOptions({
            strokeColor: 'black',
            strokeWeight: 2,
            fillOpacity: 1
        });
        $("#ca-info").html(marker.labelContent);
    });
    google.maps.event.addListener(poly, 'mouseout', function(event) {
        this.setOptions({
            strokeColor: 'black',
            strokeWeight: 0.4,
            fillOpacity: 0.7
        });
        marker.setVisible(false);
    });
    google.maps.event.addListener(poly, 'dblclick', function(event) {
        showCommunityInfo(marker.areaNumber, $('#year-filter').val());
        $('#myModalLabel').html(marker.labelContent);
        $('#myModal').attr('name', marker.areaNumber);
        $('#myModal').modal('show');
    });
    google.maps.event.addListener(poly, 'click', function(event) {
        var tmpObj = $('#' + marker.areaNumber);
        if (tmpObj.hasClass('rowSelected')) tmpObj.removeClass('rowSelected');
        else tmpObj.addClass('rowSelected');
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
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        streetViewControl: false,
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
            labelContent: updateCommunityInfo(name, area_number),
            labelAnchor: new google.maps.Point(30, 20),
            labelClass: "labels", // the CSS class for the label
            labelStyle: {
                opacity: 1.0
            },
            areaNumber: area_number,
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
    var info = '<b>' + city + '</b> had ' + incidents + ' crimes commited in ' + year + ', making it the most dangerous city in Chicago. With a population of ' + population + ', this yields a crime rate of ' + ((incidents / population * 100) | 0) + ' crimes per 100 people. Mouseover the other areas to see some details!';
    $('#year-info').html(info);
}

function getAreaName(area_code) {
    for (var g in geolocation) {
        if (geolocation[g].metadata.AREA_NUMBE == area_code) return geolocation[g].name;
    }
}

function updateCommunityInfo(name, area_number) {
    var info = "<h4>" + name + " <small>(" + area_number + ")</small></h4>";
    return info;
}

function showCommunityInfo(area_number, year) {
    $.ajax({
        url: 'ajax.php',
        type: 'post',
        dataType: 'json',
        data: {
            action: 'incidents_per_ca_info',
            year: year,
            number: parseInt(area_number)
        },
    }).done(function(res) {
        writeCommunityInfo(getAreaName(area_number), res[0], res[1], res[2], year, res[3], res[4], res[5], res[6]);
    })
}

function writeCommunityInfo(city, incidents, ratio, population, year, white, hispanic, asian, black) {
    var general_info = "<p><b>" + city + "</b> had " + incidents + " criminal incidents in " + year + ", with a population of " + population + ". " + "This means a crime rate of " + ((ratio * 100) | 0) + " crimes per 100 people. " + "In <b>" + city + "</b>:</p><ul><li>" + Math.round(white / population * 100) + "% of the population is <b>white</b>.</li><li>" + Math.round(hispanic / population * 100) + "% of the population is <b>hispanic</b>.</li><li>" + Math.round(asian / population * 100) + "% of the population is <b>asian</b>,</li><li>" + Math.round(black / population * 100) + "% of the population is <b>black</b>.</li></ul>";
    $('#modal-ca-info').html(general_info);
}

function generateScatter() {
    $.ajax({
        url: 'ajax.php',
        type: 'post',
        dataType: 'json',
        data: {
            action: 'scatter_poverty_incidents'
        },
    }).done(function(res) {
        var dataScatter = [];
        for (x in res) {
            dataScatter.push({
                "crime ratio": res[x].ratio,
                "poverty level": res[x].poverty,
                "unemployed": res[x].unemployed,
                "area code": getAreaName(x)
            });
        }
        var visualization = d3plus.viz().container("#vizScatter")
            .data(dataScatter)
            .type("scatter")
            .id("area code")
            .x("crime ratio")
            .y("poverty level")
            .width(1000).height(500).size(7).ui([
            {
                "method": "y",                
                "value"  : [{"Poverty rate": "poverty level"}, {"Unemployment rate": "unemployed"}]
            }]).title("Crime ratio, % of households below poverty level and unemployment in the city of Chicago").draw();
    });
}

function generateTable() {
    $.ajax({
        url: 'ajax.php',
        type: 'post',
        dataType: 'json',
        data: {
            action: 'incidents_per_ca_table',
            year: 2013,
        },
    }).done(function(res) {
        var dataTable = res.data;
        for (x in dataTable) {
            dataTable[x].code = parseInt(dataTable[x].code);
            dataTable[x].population = parseInt(dataTable[x].population);
            dataTable[x].totalIncidents = parseInt(dataTable[x].totalIncidents);
            dataTable[x].crimeRatio = parseInt((dataTable[x].crimeRatio * 100) | 0);
        }
        $('#my-table').dynatable({
            features: {
                paginate: false,
                sort: true,
                pushState: true,
                search: true,
                recordCount: false,
                perPageSelect: false
            },
            dataset: {
                sorts: {
                    'crimeRatio': -1
                },
                records: dataTable
            }
        });
        $('#my-table tr').each(function() {
            $(this).attr('id', $(this).find('td').eq(0).html());
        })
        $('#my-table').dynatable().on('click', 'tr', function() {
            if ($(this).hasClass('rowSelected')) $(this).removeClass('rowSelected');
            else $(this).addClass('rowSelected');
        });
    })
}

function generateTreeMap() {
    $.ajax({
        url: 'ajax.php',
        type: 'post',
        dataType: 'json',
        data: {
            action: 'tree_crimes_type'
        },
    }).done(function(res) {
        var dataTree = [];
        for (x in res) {            
            dataTree.push({                
                "crime type": x,
                "total crimes": res[x] 
            });
        }
        
        var visualization2 = d3plus.viz().container("#vizTree")
            .data(dataTree)
            .type("tree_map")
            .id("crime type")
            .size("total crimes")
            .width(1000).height(500).title("Distribution of type of crimes in the city of Chicago")
            .draw();
    });
}