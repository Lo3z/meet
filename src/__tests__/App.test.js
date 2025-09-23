/* eslint-env jest */
import { render } from '@testing-library/react';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import App from './../App';

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