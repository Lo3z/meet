Feature: Specify number of events
  Scenario: User should see 32 events listed by default.
    Given the user hasn't specified a number of events to display
    When the user loads a list of events
    Then 32 events will be shown to the user by default.
  
  Scenario: User should be able to change the number of events being displayed.
    Given the user changes how many events to display (e.g., 12 events)
    When the user loads/reloads the list of events
    Then the specified number of events will be shown to the user.