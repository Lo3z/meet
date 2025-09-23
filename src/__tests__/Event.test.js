/* eslint-env jest */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

let events;

beforeAll (async () => {
  events = await getEvents();
});

describe ("Event component-details toggle", () => {
  test("by default, event details should be hidden", () => {
    const {queryByText} = render(<Event event={events[0]}/>);

    // Check that details are not visible
    expect(queryByText(events[0].location)).not.toBeInTheDocument();
    expect(queryByText(events[0].created)).not.toBeInTheDocument();
    expect(queryByText(events[0].description)).not.toBeInTheDocument();
  });

  test("show details section when user clicks 'Show Details' button", async () => {
    const user = userEvent.setup();
    const {queryByTestId, getByText} = render(<Event event={events[0]}/>);
    
    const button = getByText(/show details/i);
    await user.click(button);

    expect(queryByTestId("event-details")).toBeInTheDocument();
  });

  test("hides details section when user clicks 'Hide Details' button", async () => {
    const user = userEvent.setup();
    const {queryByTestId, getByText} = render(<Event event={events[0]}/>);
    
    const button = getByText(/show details/i);
    await user.click(button);

    const hideButton = getByText(/hide details/i);
    await user.click(hideButton);

    expect(queryByTestId("event-details")).not.toBeInTheDocument();
  });
});