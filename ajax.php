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
if ($action == 'incidents_per_ca_table') {
    $year = $_POST['year'];
    $q = "select area_code, area, total, (white+hispanic+asian+black) as population from (select area_code, sum(total) as total from view_incidents_year_com_type where year=$year group by area_code) t1 join census on t1.area_code=census.community_area join area_codes on t1.area_code=code";
    $result = mysqli_query($link, $q);
    $ca_incidents = [];
    foreach ($result as $r) {
        $ca_code = $r['area_code'];
        $ca_name = $r['area'];
        $total = $r['total'];
        $pop = $r['population'];
        $ratio = $total/$pop;
        $ca_incidents[] = ['code' => $ca_code, 'crimeRatio' => $ratio ,'communityArea' => $ca_name, 'totalIncidents' => $total, 'population' => $pop];
    }
    echo json_encode(['data'=>$ca_incidents]);
}
if ($action == 'chart_ca_incidents') {
    $area_code = $_POST['area_code'];
    $q = "select total_incidents, year from view_total_incidents_per_year where area_code = $area_code and year > 2001";
    $result = mysqli_query($link, $q);
    $resPerYear = [];
    foreach ($result as $r) {              
        $resPerYear[$r['year']] = $r['total_incidents'];  
    }

    $q = "select total_incidents, year from view_total_incidents_per_year_global";
    $result = mysqli_query($link, $q);
    foreach ($result as $r) {              
        $resPerYearGlobal[$r['year']] = $r['total_incidents'];  
    }
    
    echo json_encode([$resPerYear, $resPerYearGlobal]);
}
if ($action == 'scatter_poverty_incidents') {
    $q = "select area_code, area_name, houses_below_poverty, unemployed, total_incidents, (white+black+asian+hispanic) as population from education e join census c join view_total_incidents_per_ca v where e.area_code = c.community_area and e.area_code = v.community_area";
    $result = mysqli_query($link, $q);
    $final = [];
    foreach ($result as $r)
    {  
      $ratio = round((($r['total_incidents']/$r['population']))*100);
      $poverty_percentage = floatval($r['houses_below_poverty']);
      $unemployed = floatval($r['unemployed']);
      $final[$r['area_code']] = ['ratio' => $ratio, 'poverty' => $poverty_percentage, 'unemployed' => $unemployed];
    }
    
    echo json_encode($final);
}
if ($action == 'tree_crimes_type') {
    $q = "select * from view_total_incidents_per_type";
    $result = mysqli_query($link, $q);
    foreach ($result as $r)
    {  
      $final[$r['primary_type']] = intval($r['total_incidents']);
    }
    
    echo json_encode($final);
}
?>
