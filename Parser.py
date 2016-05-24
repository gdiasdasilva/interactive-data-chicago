import csv
from datetime import datetime
def getData(filename):
    with open(filename, 'r') as csvfile:
        datareader = csv.reader(csvfile)
        for row in datareader:
            yield row

date_format = "%m/%d/%Y %I:%M:%S %p"

for row in getData('Census_Data_-_Selected_socioeconomic_indicators_in_Chicago__2008___2012.csv'):      
    print "INSERT INTO education VALUES %s;" % (tuple(row[:-1]),)
