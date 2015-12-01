CREATE TABLE view_total_incidents_per_ca
(
    community_area VARCHAR(100) NOT NULL PRIMARY KEY,
    total_incidents INT NOT NULL
);

INSERT INTO view_total_incidents_per_ca
SELECT community_area, count(*)
FROM crimes
WHERE community_area <> '' and community_area <> '0' and year = 2014
GROUP BY community_area;

CREATE TABLE view_total_incidents_per_type (
    primary_type VARCHAR(100) NOT NULL PRIMARY KEY,
    total_incidents INT NOT NULL
);

INSERT INTO view_total_incidents_per_type
SELECT primary_type, count(*)
FROM crimes
GROUP BY primary_type;


CREATE TABLE view_incidents_year_com_type
(
    year INT NOT NULL,
    area_code INT NOT NULL,
    type VARCHAR(100) NOT NULL,
    total INT NOT NULL
);

INSERT INTO view_incidents_year_com_type
SELECT year, CAST(community_area as UNSIGNED) as area_code, crimes.primary_type, count(*) as total
FROM crimes WHERE community_area NOT IN ('','0') GROUP BY year, community_area, crimes.primary_type ORDER BY year ASC, area_code ASC, total DESC;
