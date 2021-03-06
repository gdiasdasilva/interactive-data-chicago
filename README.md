# Criminality in Chicago
Understanding criminality in Chicago through interactive data visualization.

This project is hosted on Heroku and you can visit it <a href="https://rocky-cliffs-5877.herokuapp.com">here</a>.

Data source: <a href="https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present/ijzp-q8t2">Crimes from 2001 to present (City of Chicago - Data Portal)</a>.

This project was developed by <a href="https://github.com/luisafonsocarvalho/">Luís</a> and me for Interactive Data Visualization course @ FCT-UNL.

### Basic usage
* Double-click on a community area will show its details and evolution over time.
* Single click on community areas will highlight them in the table for further analysis. This action is cumulative.
* Clicks on table entries will, as well, highlight community areas on the map.
* The **Charts** tab allows the user to compare data in different ways (scatter plot, treemap).

<hr>

### Data preparation for populating database

Python script to convert `.csv` file to SQL script with `INSERT` statements.
The database name should be `vid`.
The `crimes`table must exist.
The parser must be placed in the same directory as the `.csv` file.

**Usage:**

sed -i -e "1d" rows.csv -> **Remove first line from file. ~5min**

python parser.py > script.sql -> **Creates the script.sql file with all the INSERT statements**

mysql -h localhost -u "username" -p "password" < script.sql -> **Run script with INSERT statements. ~20min**

<hr>

### More images

**Main screen with year comparation**

<img src="http://imgur.com/Q3Y4Hsf.png"/>
<hr>

**Data scatter plot**

<img src="http://imgur.com/r6QfRQX.png"/>
<hr>

**Chicago community area detail and evolution**

<img src="http://imgur.com/xTQCzoT.png"/>
