Feature: Show/hide event details
  Scenario: The user should see a list of events by name, with details hidden by default.
    Given the main page is open
    When the event list populates
    Then the user should see events by name, with any details about the event hidden by default.
  
  Scenario: User should be able to click 'Show Details' to see expanded details about a given event.
    Given the user has found an event they are interested in
    When they click on the event/button
    Then the user should be able to see expanded details about the event (date, time, location, etc.)

  Scenario: User should be able to collapse event details.
    Given the user has an expanded event view open
    When they click on the event/button again
    Then the user should be able to collapse the event view to hide the details.