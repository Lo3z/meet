// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'

const NumberOfEvents = () => {
  const [number, setNumber] = useState(32);
  return (
    <div id="number-of-events">
      <label htmlFor="event-count">Number of events: </label>
      <input 
      type="number" 
      id="event-count" 
      min="1"
      value={number}
      onChange={(e) => setNumber(e.target.value)}/>
    </div>
  );
};

export default NumberOfEvents;