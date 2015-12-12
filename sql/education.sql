CREATE TABLE education (
area_code INT,
area_name VARCHAR(30),
houses_crowded DOUBLE,
houses_below_poverty DOUBLE,
unemployed DOUBLE,
without_hsdiploma DOUBLE,
aged_adults DOUBLE,
income_per_capita INT
);

INSERT INTO education VALUES ('1', 'Rogers Park', '7.7', '23.6', '8.7', '18.2', '27.5', '23939');
INSERT INTO education VALUES ('2', 'West Ridge', '7.8', '17.2', '8.8', '20.8', '38.5', '23040');
INSERT INTO education VALUES ('3', 'Uptown', '3.8', '24', '8.9', '11.8', '22.2', '35787');
INSERT INTO education VALUES ('4', 'Lincoln Square', '3.4', '10.9', '8.2', '13.4', '25.5', '37524');
INSERT INTO education VALUES ('5', 'North Center', '0.3', '7.5', '5.2', '4.5', '26.2', '57123');
INSERT INTO education VALUES ('6', 'Lake View', '1.1', '11.4', '4.7', '2.6', '17', '60058');
INSERT INTO education VALUES ('7', 'Lincoln Park', '0.8', '12.3', '5.1', '3.6', '21.5', '71551');
INSERT INTO education VALUES ('8', 'Near North Side', '1.9', '12.9', '7', '2.5', '22.6', '88669');
INSERT INTO education VALUES ('9', 'Edison Park', '1.1', '3.3', '6.5', '7.4', '35.3', '40959');
INSERT INTO education VALUES ('10', 'Norwood Park', '2', '5.4', '9', '11.5', '39.5', '32875');
INSERT INTO education VALUES ('11', 'Jefferson Park', '2.7', '8.6', '12.4', '13.4', '35.5', '27751');
INSERT INTO education VALUES ('12', 'Forest Glen', '1.1', '7.5', '6.8', '4.9', '40.5', '44164');
INSERT INTO education VALUES ('13', 'North Park', '3.9', '13.2', '9.9', '14.4', '39', '26576');
INSERT INTO education VALUES ('14', 'Albany Park', '11.3', '19.2', '10', '32.9', '32', '21323');
INSERT INTO education VALUES ('15', 'Portage Park', '4.1', '11.6', '12.6', '19.3', '34', '24336');
INSERT INTO education VALUES ('16', 'Irving Park', '6.3', '13.1', '10', '22.4', '31.6', '27249');
INSERT INTO education VALUES ('17', 'Dunning', '5.2', '10.6', '10', '16.2', '33.6', '26282');
INSERT INTO education VALUES ('18', 'Montclaire', '8.1', '15.3', '13.8', '23.5', '38.6', '22014');
INSERT INTO education VALUES ('19', 'Belmont Cragin', '10.8', '18.7', '14.6', '37.3', '37.3', '15461');
INSERT INTO education VALUES ('20', 'Hermosa', '6.9', '20.5', '13.1', '41.6', '36.4', '15089');
INSERT INTO education VALUES ('21', 'Avondale', '6', '15.3', '9.2', '24.7', '31', '20039');
INSERT INTO education VALUES ('22', 'Logan Square', '3.2', '16.8', '8.2', '14.8', '26.2', '31908');
INSERT INTO education VALUES ('23', 'Humboldt park', '14.8', '33.9', '17.3', '35.4', '38', '13781');
INSERT INTO education VALUES ('24', 'West Town', '2.3', '14.7', '6.6', '12.9', '21.7', '43198');
INSERT INTO education VALUES ('25', 'Austin', '6.3', '28.6', '22.6', '24.4', '37.9', '15957');
INSERT INTO education VALUES ('26', 'West Garfield Park', '9.4', '41.7', '25.8', '24.5', '43.6', '10934');
INSERT INTO education VALUES ('27', 'East Garfield Park', '8.2', '42.4', '19.6', '21.3', '43.2', '12961');
INSERT INTO education VALUES ('28', 'Near West Side', '3.8', '20.6', '10.7', '9.6', '22.2', '44689');
INSERT INTO education VALUES ('29', 'North Lawndale', '7.4', '43.1', '21.2', '27.6', '42.7', '12034');
INSERT INTO education VALUES ('30', 'South Lawndale', '15.2', '30.7', '15.8', '54.8', '33.8', '10402');
INSERT INTO education VALUES ('31', 'Lower West Side', '9.6', '25.8', '15.8', '40.7', '32.6', '16444');
INSERT INTO education VALUES ('32', 'Loop', '1.5', '14.7', '5.7', '3.1', '13.5', '65526');
INSERT INTO education VALUES ('33', 'Near South Side', '1.3', '13.8', '4.9', '7.4', '21.8', '59077');
INSERT INTO education VALUES ('34', 'Armour Square', '5.7', '40.1', '16.7', '34.5', '38.3', '16148');
INSERT INTO education VALUES ('35', 'Douglas', '1.8', '29.6', '18.2', '14.3', '30.7', '23791');
INSERT INTO education VALUES ('36', 'Oakland', '1.3', '39.7', '28.7', '18.4', '40.4', '19252');
INSERT INTO education VALUES ('37', 'Fuller Park', '3.2', '51.2', '33.9', '26.6', '44.9', '10432');
INSERT INTO education VALUES ('38', 'Grand Boulevard', '3.3', '29.3', '24.3', '15.9', '39.5', '23472');
INSERT INTO education VALUES ('39', 'Kenwood', '2.4', '21.7', '15.7', '11.3', '35.4', '35911');
INSERT INTO education VALUES ('40', 'Washington Park', '5.6', '42.1', '28.6', '25.4', '42.8', '13785');
INSERT INTO education VALUES ('41', 'Hyde Park', '1.5', '18.4', '8.4', '4.3', '26.2', '39056');
INSERT INTO education VALUES ('42', 'Woodlawn', '2.9', '30.7', '23.4', '16.5', '36.1', '18672');
INSERT INTO education VALUES ('43', 'South Shore', '2.8', '31.1', '20', '14', '35.7', '19398');
INSERT INTO education VALUES ('44', 'Chatham', '3.3', '27.8', '24', '14.5', '40.3', '18881');
INSERT INTO education VALUES ('45', 'Avalon Park', '1.4', '17.2', '21.1', '10.6', '39.3', '24454');
INSERT INTO education VALUES ('46', 'South Chicago', '4.7', '29.8', '19.7', '26.6', '41.1', '16579');
INSERT INTO education VALUES ('47', 'Burnside', '6.8', '33', '18.6', '19.3', '42.7', '12515');
INSERT INTO education VALUES ('48', 'Calumet Heights', '2.1', '11.5', '20', '11', '44', '28887');
INSERT INTO education VALUES ('49', 'Roseland', '2.5', '19.8', '20.3', '16.9', '41.2', '17949');
INSERT INTO education VALUES ('50', 'Pullman', '1.5', '21.6', '22.8', '13.1', '38.6', '20588');
INSERT INTO education VALUES ('51', 'South Deering', '4', '29.2', '16.3', '21', '39.5', '14685');
INSERT INTO education VALUES ('52', 'East Side', '6.8', '19.2', '12.1', '31.9', '42.8', '17104');
INSERT INTO education VALUES ('53', 'West Pullman', '3.3', '25.9', '19.4', '20.5', '42.1', '16563');
INSERT INTO education VALUES ('54', 'Riverdale', '5.8', '56.5', '34.6', '27.5', '51.5', '8201');
INSERT INTO education VALUES ('55', 'Hegewisch', '3.3', '17.1', '9.6', '19.2', '42.9', '22677');
INSERT INTO education VALUES ('56', 'Garfield Ridge', '2.6', '8.8', '11.3', '19.3', '38.1', '26353');
INSERT INTO education VALUES ('57', 'Archer Heights', '8.5', '14.1', '16.5', '35.9', '39.2', '16134');
INSERT INTO education VALUES ('58', 'Brighton Park', '14.4', '23.6', '13.9', '45.1', '39.3', '13089');
INSERT INTO education VALUES ('59', 'McKinley Park', '7.2', '18.7', '13.4', '32.9', '35.6', '16954');
INSERT INTO education VALUES ('60', 'Bridgeport', '4.5', '18.9', '13.7', '22.2', '31.3', '22694');
INSERT INTO education VALUES ('61', 'New City', '11.9', '29', '23', '41.5', '38.9', '12765');
INSERT INTO education VALUES ('62', 'West Elsdon', '11.1', '15.6', '16.7', '37', '37.7', '15754');
INSERT INTO education VALUES ('63', 'Gage Park', '15.8', '23.4', '18.2', '51.5', '38.8', '12171');
INSERT INTO education VALUES ('64', 'Clearing', '2.7', '8.9', '9.5', '18.8', '37.6', '25113');
INSERT INTO education VALUES ('65', 'West Lawn', '5.8', '14.9', '9.6', '33.6', '39.6', '16907');
INSERT INTO education VALUES ('66', 'Chicago Lawn', '7.6', '27.9', '17.1', '31.2', '40.6', '13231');
INSERT INTO education VALUES ('67', 'West Englewood', '4.8', '34.4', '35.9', '26.3', '40.7', '11317');
INSERT INTO education VALUES ('68', 'Englewood', '3.8', '46.6', '28', '28.5', '42.5', '11888');
INSERT INTO education VALUES ('69', 'Greater Grand Crossing', '3.6', '29.6', '23', '16.5', '41', '17285');
INSERT INTO education VALUES ('70', 'Ashburn', '4', '10.4', '11.7', '17.7', '36.9', '23482');
INSERT INTO education VALUES ('71', 'Auburn Gresham', '4', '27.6', '28.3', '18.5', '41.9', '15528');
INSERT INTO education VALUES ('72', 'Beverly', '0.9', '5.1', '8', '3.7', '40.5', '39523');
INSERT INTO education VALUES ('73', 'Washington Height', '1.1', '16.9', '20.8', '13.7', '42.6', '19713');
INSERT INTO education VALUES ('74', 'Mount Greenwood', '1', '3.4', '8.7', '4.3', '36.8', '34381');
INSERT INTO education VALUES ('75', 'Morgan Park', '0.8', '13.2', '15', '10.8', '40.3', '27149');
INSERT INTO education VALUES ('76', "O'Hare", '3.6', '15.4', '7.1', '10.9', '30.3', '25828');
INSERT INTO education VALUES ('77', 'Edgewater', '4.1', '18.2', '9.2', '9.7', '23.8', '33385');
