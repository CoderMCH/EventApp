Feature: Show/Hide Event Details
    # Scenario 1
    Scenario: An event element is collapsed by default.
        Given the main page is opened
        When user doesn't change anything
        Then event details is collapsed by default

    # Scenario 2
    Scenario: User can expand an event to see details.
        Given user clicked the "show details" button in an event card
        When default
        Then the event details is shown in the event card
        And "show details" button changes to "hide details"

    # Scenario 3
    Scenario: User can collapse an event to hide details.
        Given all event details are shown
        When user clicks the "hide details" button
        Then the event details is hidden in the event card
        And "hide details" button changes to "show details"