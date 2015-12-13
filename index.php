<!DOCTYPE html>
<html style="height: 100%">
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8">
        <title>Crimes visualization in Chicago</title>
        <script type="text/javascript" src="js/community_areas.js"></script>
        <script src="js/jquery.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
        <script src="js/map.js"></script>
        <link rel="stylesheet" type="text/css" href="css/styles.css"/>
        <link rel="stylesheet" type="text/css" href="https://bootswatch.com/paper/bootstrap.min.css"/>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <link rel="stylesheet" type="text/css" href="css/jquery.dynatable.css"/>
        <script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerwithlabel/1.1.5/src/markerwithlabel_packed.js"></script>
        <script type="text/javascript" src="js/jquery.dynatable.js"></script>       
        <!--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>-->
        <!-- USING MODIFIED VERSION OF CHART JS -->
        <script type="text/javascript" src="js/chartjs.js"></script>    
        <script type="text/javascript" src="js/d3plus.full.min.js"></script>
    </head>
    <body style="height: 100%">
        <div class="row">
            <div class="text-center jumbotron">
                <h1>Data Visualization</h1>
                <p>Understanding crime in Chicago and its community areas.</p>
            </div>
        </div>
        <div class="row">
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel"></h4>
              </div>
              <div class="modal-body">                
                    <p id="modal-ca-info"></p>  
                    <hr>
                    <b>Crimes evolution over time</b>
                    <canvas id="myChart" width="570" height="400"></canvas>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>                
              </div>
            </div>
          </div>
        </div>
            <div class="col-md-7 col-md-offset-1 well" id="map" style="height: 500px">
            </div>
            <div class="col-md-3">
                <div class="filters">
                    <h3 class="text-center">Info</h3>
                    <hr> 
                    <div class="panel">
                    <div class="panel-body">
                        <p id="ca-info"></p>
                    </div>
                    </div>                   
                    <label>Year</label>
                    <select id="year-filter" class="form-control">
                        <? foreach (range(2003, 2014) as $y):?>
                        <option value="<?=$y?>"><?=$y?></option>
                        <? endforeach ?>
                    </select>
                </div>
                <div class="panel">
                    <div class="panel-body">
                        <p id="year-info">lorem ipsum dolor sit amet consetetur sadipscing elitr sed diam nonumy
                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat sed diam</p>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-10 col-md-offset-1 well">
                <div class="text-center"><h3>Crimes per community area table</h3></div>
                <table id="my-table" class="table table-bordered">
                    <tr>
                        <thead>
                            <th>Code</th>                    
                            <th>Community Area</th>
                            <th>Crime Ratio</th>
                            <th>Total Incidents</th>
                            <th>Population</th>                       
                        </thead>
                    </tr>
                    <tr>
                        <tbody id="table-content"></tbody>
                    </tr>
                </table>
            </div>
            <hr>
        </div>
        <div class="row scatter">
            <div class="text-center"><h3>Scatter Plot</h3></div>
            <div id="vizScatter">
                
            </div>
            
            <div class="text-center"><h3>Tree Map</h3></div>
            <div id="vizTree">
                
            </div>
        </div>
    </body>
</html>