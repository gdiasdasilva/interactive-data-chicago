# Criminality in Chicago
Understanding criminality in Chicago through interactive data visualization.

Data source: <a href="https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present/ijzp-q8t2">Crimes from 2001 to present (City of Chicago - Data Portal)</a>

## Data preparation for populating database

### Details
Python script to convert `.csv` file to SQL script with `INSERT` statements.
The database name should be `vid`.
The `crimes`table must exist.
The parser must be placed in the same directory as the `.csv` file.

**Usage:**

sed -i -e "1d" rows.csv -> **Remove first line from file. ~5min**

python parser.py > script.sql -> **Creates the script.sql file with all the INSERT statements**

mysql -h localhost -u "username" -p "password" < script.sql -> **Run script with INSERT statements. ~20min**
