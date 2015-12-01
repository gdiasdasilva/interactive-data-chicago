<?php
include "connection.php";
$link = connectToDB();

$sample_query = "select * from view_total_incidents_per_ca;";
$result = mysqli_query($link, $sample_query);

$incidents = [];
$max = 0;
$min = PHP_INT_MAX;
foreach ($result as $q) {
	if ($q["total_incidents"] > $max)
		$max = $q["total_incidents"];
	if ($q["total_incidents"] < $min)
		$min = $q["total_incidents"];
    $incidents[$q["community_area"]] = $q["total_incidents"];
}

echo json_encode(['incidents'=>$incidents, 'max'=>$max, 'min'=>$min]);
?>