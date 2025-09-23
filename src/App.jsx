// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents } from './api';

function App() {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchEvents = async() => {
      const data = await getEvents();
      console.log("fetched events:", data);
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
      <div className="App">
        <CitySearch allLocations={locations}/>
        <EventList events={events}/>
        <NumberOfEvents/>
      </div>
  );
}

export default App;