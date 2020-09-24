## ploy-challenge

## Background & Objective
Ever thought of the belly button as a habitat for organisms? Scientists have [studied](http://robdunnlab.com/projects/belly-button-biodiversity/) the biodiversity of microbes in belly buttons to investigate factors that might influence the microscopic life and to inspire convesations about the beneficial roles microbes can play. 

This project aims to create a dashboard offering the following:
* Visualize the data collected from each of the 153 research participants with a series of charts.
* Allow user to select and view specific participant's data.
* Accessible on the Internet.

## Examine the Data 
* The dataset is stored in the JSON format containing three objects:
* "names": Contain an array of unique IDs of all participants.
* "metadata": Contain the demographic information of each participant such as gender, age, location etc.
* "samples": Contain the ID, name and sample value of each of the microbes identified in each participant.

## Determine User Flow
In order to build the dashboard, user flow was determined as follow:
1. User loads the dashboard webpage for the first time
2. Dashboard showcases charts with default sample values.
3. User uses dropdown menu to select research participant to view.
4. Dashboard updates charts with sample values of selected participant.
5. User can repeat step 3 as many times as desired.

## Building the dashboard
