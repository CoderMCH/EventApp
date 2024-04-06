# EventApp

# Details
This is a React application built with TDD technique. This app will use Google Calendar API, OAuth2 authorization flow and AWS serverless functions.

# User Stories
1. As a user, I should be able to filter events by city, so that I can see a list of events taking place in that city.
2. As a user, I should be able to show/hide event details, so that I can see the details of events and hide it after read.
3. As a user, I should be able to specify number of events, so that there would be too much event in the screen.
4. As a user, I should be able to use the app when offline, so that I can access the events when I can't connect to internet.
5. As a user, I should be able to add an app shortcut to the home screen, so that I can find it more easily.
6. As a user, I should be able to display charts visualizing event details, so that I can relate the details more easily.

# Test Scenarios
## Filter Events By City
Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
- Given user hasn’t searched for any city
- When the user opens the app
- Then the user should see a list of upcoming events

Scenario 2: User should see a list of suggestions when they search for a city.
- Given the main page is opened
- When user starts typing in the city textbox
- Then the user should receive a list of cities (suggestions) that match what they’ve typed

Scenario 3: User can select a city from the suggested list.
- Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
- When the user selects a city (e.g., “Berlin, Germany”) from the list;
- Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.

## Show/Hide Event Details
Scenario 1: An event element is collapsed by default.
- Given the main page is opened
- When user doesn't change anything
- Then event details is collapsed by default

Scenario 2: User can expand an event to see details.
- Given user clicked the "Show Details" button in an event card
- When default
- Then the event details is shown in the event card and "Show Details" button changes to "Hide Details"

Scenario 3: User can collapse an event to hide details.
- Given user clicked the "Hide Details" button in an event card
- When the event card is showing details
- Then the event details is hidden in the event card and "Hide Details" button changes to "Show Details"

## Specify Number of Events
Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
- Given "Number of Events" textbox is empty
- When user hasn't specified a number in "Number of Events" textbox
- Then user receives a list of upcoming events up to 32.

Scenario 2: 
- Given user change the number of events to 12 in "Number of events" textbox.
- When user hasn't specified 12 in "Number of Events" textbox
- Then the user should receive a list of up to 12 upcoming events.

## Use the App When Offline
Scenario 1: Show cached data when there’s no internet connection.
- Given user can't connect to internet
- When user opens the application
- Then the application shows the cached data

Scenario 2: Show error when user changes search settings (city, number of events).
- Given the user changes search settings (city, number of events)
- When the application can't connect to internet
- Then the application shows an error message to the user

##  Add an App Shortcut to the Home Screen
Scenario 1: User can install the event app as a shortcut on their device home screen.
- Given user install the app
- When user using a device
- Then a shortcut of the app appears on their device home screen

## Display Charts Visualizing Event Details
Scenario 1: Show a chart with the number of upcoming events in each city.
- Given user chooses to visulize data
- When user visualizes events
- Then user receives a pie chart and a point plot
