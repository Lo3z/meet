// eslint-disable-next-line no-unused-vars
import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, screen } from '@testing-library/react';
import App from '../App';
import { expect } from '@jest/globals';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line no-unused-vars
import EventList from '../components/EventList';

const feature = loadFeature ('./src/features/specifyNumberOfEvents.feature')

defineFeature(feature, test => {
  test('User should see 32 events listed by default.', ({ given, when, then }) => {
    let AppComponent;

    given("the user hasn't specified a number of events to display", () => {
      AppComponent = render(<App/>);
    });

    when('the user loads a list of events', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then('32 events will be shown to the user by default.', () => {
      const EventListDOM = AppComponent.container.querySelector('#event-list');
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    });
  });

  test('User should be able to change the number of events being displayed.', ({ given, when, then }) => {
    let AppComponent;
    const user = userEvent.setup();

    given('the user changes how many events to display (e.g., 12 events)', async () => {
      AppComponent = render(<App/>);
      const input = screen.getByLabelText(/number of events/i);
      
      await user.click(input);
      await user.keyboard("{Control>}a{/Control}");
      await user.keyboard("12");
    });

    when('the user loads/reloads the list of events', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      
      await waitFor (() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then('the specified number of events will be shown to the user.', () => {
      const EventListDOM = AppComponent.container.querySelector('#event-list');
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(12);
    });
  });
});