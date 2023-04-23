# install packages
# pip install geopy pandas

# load libraries
from geopy.geocoders import Nominatim
import pandas as pd

# read CSV file
namus_missing_persons = pd.read_csv("https://drive.google.com/uc?id=1REy4mu9tIWyA9ltQOAf7tkuZAPxAxIba")

# create geocoder
geolocator = Nominatim(user_agent="my_app")

# create empty geocoded dataframe
geocoded = pd.DataFrame(columns=["latitude", "longitude"])

# loop through each row and geocode address
for index, row in namus_missing_persons.iterrows():
    address = row["city"] + ", " + row["county"] + ", " + row["state"]
    location = geolocator.geocode(address)
    if location:
        geocoded = pd.concat([geocoded, pd.DataFrame({"latitude": [location.latitude], "longitude": [location.longitude]})])
    else:
        geocoded = pd.concat([geocoded, pd.DataFrame({"latitude": [None], "longitude": [None]})])

# reset index of geocoded dataframe
geocoded.reset_index(drop=True, inplace=True)

# combine original dataframe with geocoded data
namus_missing_persons = pd.concat([namus_missing_persons, geocoded], axis=1)

# write CSV file
namus_missing_persons.to_csv("namus_missing_persons_geocoded.csv", index=False)
