# leaflet-challenge
Module 15 Challenge

# Author
Emily L Sims

# Instructions
The instructions for this activity are broken into two parts:
Part 1: Create the Earthquake Visualization
Part 2: Gather and Plot More Data (Optional with no extra points earning)

## Part 1: Create the Earthquake Visualization
Your first task is to visualize an earthquake dataset. Complete the following steps:
1. Get your dataset. To do so, follow these steps:
- The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed Links to an external site. page and choose a dataset to visualize. 
- When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization.
2. Import and visualize the data by doing the following:
- Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
  - Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
  - Include popups that provide additional information about the earthquake when its associated marker is clicked.
  - Create a legend that will provide context for your map data.
  - Your visualization should look something like the preceding map.

# Requirements
These requirements apply only to "Part 1: Create the Earthquake Visualization" as "Part 2" is optional with no extra points earning.

##  Map (60 points)
- TileLayer loads without error (20 points)
- Connects to geojson API using D3 without error (20 points)
- Markers with size corresponding to earthquake magnitude (10 points)
- A legend showing the depth and their corresponding color (10 points)

## Data Points (40 points)
- Data points scale with magnitude level (10 points)
- Data points colors change with depth level (10 points)
  <img src="https://github.com/emilys28/leaflet-challenge/blob/dc07f9e5e57a08d1b3ff7601cd887d0fb9d01680/Images/map.png" alt="map with data points that scale with magnitude level and colors change with depth level">
- Each point has a tooltip with the Magnitude, the location and depth (10 points)
 <img src="https://github.com/emilys28/leaflet-challenge/blob/dc07f9e5e57a08d1b3ff7601cd887d0fb9d01680/Images/tooltip.png" alt="tooltip showing magnitude, the location and depth">
- All data points load in the correct locations (10 points)

# References
Dataset created by the United States Geological Survey https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

