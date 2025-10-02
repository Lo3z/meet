// eslint-disable-next-line no-unused-vars
import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, screen } from '@testing-library/react';
import App from '../App';
import { expect } from '@jest/globals';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
// eslint-disable-next-line no-unused-vars
import EventList from '../components/EventList';

const feature = loadFeature ('./src/features/showHideAnEventsDetails.feature')

defineFeature(feature, test => {
  test('The user should see a list of events by name, with details hidden by default.', ({ given, when, then }) => {                                                                                                                                    
    let AppComponent;

    given('the main page is open', () => {
      AppComponent = render(<App/>);                                                                                                                                                                         
    });                                                                                                                                        
                                                                                                                                                   
    when('the event list populates', async () => {   
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });                                                                                                                                 
    });

    then('the user should see events by name, with any details about the event hidden by default.', async () => {
      let events;
      events = await getEvents();

      const {queryByText} = render(<Event event={events[0]}/>);

      expect(queryByText(events[0].location)).not.toBeInTheDocument();
      expect(queryByText(events[0].created)).not.toBeInTheDocument();
      expect(queryByText(events[0].description)).not.toBeInTheDocument();
    });
  });

  test("User should be able to click 'Show Details' to see expanded details about a given event.", ({ given, when, then }) => {
    let events;
    const user = userEvent.setup();

    given('the user has found an event they are interested in', async () => {
      events = await getEvents();
      render(<Event event={events[0]}/>);
      expect(screen.queryByTestId('event-details')).toBeNull();
    });

    when('they click on the event/button', async () => {
      const button = screen.getByRole('button', {name: /show details/i });
      await user.click(button);
    });

    then('the user should be able to see expanded details about the event (date, time, location, etc.)', () => {
      expect(screen.queryByTestId('event-details')).toBeInTheDocument();
    });
  });

  test('User should be able to collapse event details.', ({ given, when, then }) => {
    let events;
    const user = userEvent.setup();

    given('the user has an expanded event view open', async () => {
      events = await getEvents();
      render(<Event event={events[0]}/>);
      const button = screen.getByRole('button', {name: /show details/i});
      await user.click(button);
      expect(screen.queryByTestId('event-details')).toBeInTheDocument();
    });

    when('they click on the event/button again', async () => {
      const button = screen.getByRole('button', {name: /hide details/i});
      await user.click(button);
    });

    then('the user should be able to collapse the event view to hide the details.', () => {
      expect(screen.queryByTestId('event-details')).toBeNull();
    });
  });
});