/* eslint-env jest */
import { render, screen, within, waitFor } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import App from './../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

describe ('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App/>).container.firstChild;
  })

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render NumberOfEvents component', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
});

describe ('<App/> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render (<App/>);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, 'Berlin');
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
  });

  test('renders 32 events by default', async () => {
    render(<App/>);

    const eventList = await screen.findByRole("list", {name: /event list/i});

    const renderedEvents = within(eventList). getAllByRole("listitem");
    expect(renderedEvents).toHaveLength(32);
  });

  test('renders the number of events specified by the user', async () => {
    render(<App/>);
    
    const user = userEvent.setup();
    const input = screen.getByLabelText(/number of events/i);

    await user.click(input);
    await user.keyboard("{Control>}a{/Control}");
    await user.keyboard("10");
    expect(input.value).toBe("10");

    await waitFor(() => {
      const eventList = screen.getByRole("list", {name: /event list/i});
      const renderedEvents = within(eventList).getAllByRole("listitem");
      expect(renderedEvents).toHaveLength(10);
    });
  });
});