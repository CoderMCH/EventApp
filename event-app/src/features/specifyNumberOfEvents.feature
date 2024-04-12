Feature: Specify Number of Events
    # Scenario 1
    Scenario: When user hasn’t specified a number, 32 events are shown by default.
        Given "Number of Events" textbox is 32 by default
        When user hasn't specified a number in "Number of Events" textbox
        Then user receives a list of upcoming events up to 32.

    # Scenario 2
    Scenario: When user type 12 in "Number of Events" textbox
        Given user change the number of events to 12 in "Number of events" textbox.
        When user hasn't specified 12 in "Number of Events" textbox
        Then the user should receive a list of up to 12 upcoming events.