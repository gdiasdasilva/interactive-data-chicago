<?php
include "connection.php";
$link = connectToDB();

$action = $_POST['action'];
if ($action == 'incidents_per_ca') {
    $year = $_POST['year'];
    $sample_query = "select area_code, total, (white+hispanic+asian+black) as population from (select area_code, sum(total) as total from view_incidents_year_com_type where year=$year group by area_code) t1 join census on t1.area_code=census.community_area";
    $result = mysqli_query($link, $sample_query);
    $incidents = [];
    $maxRatio = 0;
    $minRatio = PHP_INT_MAX;
    foreach ($result as $q) {
        $ratio = $q['total']/$q['population'];
       if ($ratio > $maxRatio) {
          $max = $q;
          $maxRatio = $ratio;
       }
      if ($ratio < $minRatio) {
          $min = $q;
          $minRatio = $ratio;
      }
      $incidents[$q["area_code"]] = $ratio;
  }

  echo json_encode(['incidents'=>$incidents, 'max'=>$max, 'min'=>$min]);
}
if ($action == 'incidents_per_ca_info') {
    $year = $_POST['year'];
    $area_number = $_POST['number'];
    $sample_query = "select area_code, total, (white+hispanic+asian+black) as population, white, black, asian, hispanic from (select area_code, sum(total) as total from view_incidents_year_com_type where year=$year and area_code = $area_number group by area_code) t1 join census on t1.area_code=census.community_area";
    $result = mysqli_query($link, $sample_query);

    foreach ($result as $q)
    {
      $white = $q['white'];
      $hispanic = $q['hispanic'];
      $asian = $q['asian'];
      $black = $q['black'];
      $population = $q['population'];
      $ratio = $q['total']/$q['population'];
      $incidents = $q["total"];
    }

    echo json_encode([$incidents, $ratio, $population, $white, $hispanic, $asian, $black]);
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
