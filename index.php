<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
	<meta charset="utf-8">

	<title>Crimes visualization in Chicago</title>
	<script type="text/javascript" src="js/districts.js"></script>
	<script src="js/jquery.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
	<script src="js/map.js"></script>
	<link rel="stylesheet" type="text/css" href="css/styles.css"/>
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>

	<?php
		include "connection.php";
		$link = connectToDB();
	?>
</head>
<body>

	<!--<div id="map"></div>-->

	<?
		$sample_query = "select * from view_total_incidents_per_type;";
	    $result = mysqli_query($link, $sample_query);

	    foreach($result as $q)
	    {
	    	echo "<p class='text-lowercase'>" . $q["primary_type"] . " - " . $q["total_incidents"] . "</p>";
	    }
    ?>
</body>
</html>
