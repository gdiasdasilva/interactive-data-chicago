CREATE TABLE view_total_incidents_per_ca
(
    community_area VARCHAR(100) NOT NULL PRIMARY KEY,
    total_incidents INT NOT NULL
);

INSERT INTO view_total_incidents_per_ca
SELECT community_area, count(*)
FROM crimes
WHERE community_area <> '' and community_area <> '0'
GROUP BY community_area;

CREATE TABLE view_total_incidents_per_type (
    primary_type VARCHAR(100) NOT NULL PRIMARY KEY,
    total_incidents INT NOT NULL
);

INSERT INTO view_total_incidents_per_type
SELECT primary_type, count(*)
FROM crimes
GROUP BY primary_type;