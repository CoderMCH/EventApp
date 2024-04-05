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
SCENARIO 1
- Given user hasn’t searched for any city;
- When the user opens the app;
- Then the user should see a list of upcoming events.

SCENARIO 2
- Given the main page is open;
- When user starts typing in the city textbox;
- Then the user should receive a list of cities (suggestions) that match what they’ve typed.

SCENARIO 3
- Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
- When the user selects a city (e.g., “Berlin, Germany”) from the list;
- Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.

SCENARIO 4
- Given user input 32 in the "Number of Events:" textbox
- When user search events
- Then the user should receive a list of up to 32 events, sorted by closest date

SCENARIO 5
- Given user didn't input in the "Number of Events:" textbox
- When user search events
- Then the user should receive a list of up to 10 events, sorted by closest date

SCENARIO 6
- Given user input "Berlin" in the city textbox and 12 in the number of events textbox
- When user clicked show details of event card
- Then the app should redirect to event view with selected event
