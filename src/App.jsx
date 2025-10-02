// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';

import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [numEvents, setNumEvents] = useState(32);

  useEffect(() => {
    const fetchEvents = async() => {
      const data = await getEvents();
      setEvents(data);
      setLocations(extractLocations(data));
    };
    fetchEvents();
  }, []);

  const filteredEvents = selectedCity 
    ? events.filter(event => event.location === selectedCity) 
    : events;

  const uniqueEvents = Array.from(
    new Map(filteredEvents.map(event => [String(event.id), event])).values()
  );

  const eventsToDisplay = uniqueEvents.slice(0, numEvents);
  // console.log('unique events - ',uniqueEvents )

  return (
      <div className="App">
        <CitySearch allLocations={locations} onCitySelected={setSelectedCity}/>
        <NumberOfEvents numEvents={numEvents} onNumEventsChanged={setNumEvents}/>
        <EventList events={eventsToDisplay}/>
      </div>
  );
}

export default App;