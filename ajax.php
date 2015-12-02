<?php
include "connection.php";
$link = connectToDB();

$action = $_POST['action'];
if ($action == 'incidents_per_ca') {
    $year = $_POST['year'];
    $sample_query = "select area_code, sum(total) as total from view_incidents_year_com_type where year=$year group by area_code";
    $result = mysqli_query($link, $sample_query);
    $incidents = [];
    $max = 0;
    $min = PHP_INT_MAX;
    foreach ($result as $q) {
       if ($q["total"] > $max)
          $max = $q["total"];
      if ($q["total"] < $min)
          $min = $q["total"];
      $incidents[$q["area_code"]] = $q["total"];
  }

  echo json_encode(['incidents'=>$incidents, 'max'=>$max, 'min'=>$min]);
}
if ($action == 'crime_types') {
    $year = $_POST['year'];
    $q = "select distinct(type) as pt from view_incidents_year_com_type where year = $year";
    $result = mysqli_query($link, $q);
    $types = [];
    foreach ($result as $r) {
        $types[] = $r['pt'];
    }
    echo json_encode($types);
}
?>
