// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
import PropTypes from "prop-types";


const NumberOfEvents = ({ numEvents, onNumEventsChanged }) => {
  const handleInputChange = (event) => {
  const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      onNumEventsChanged(value);
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="event-count">Number of events: </label>
      <input 
      type="number" 
      min={1}
      id="event-count" 
      value={numEvents}
      onChange={handleInputChange}/>
    </div>
  );
};

NumberOfEvents.defaultProps = {
  numEvents: 32,
};

NumberOfEvents.propTypes = {
  numEvents: PropTypes.number,
  onNumEventsChanged: PropTypes.func.isRequired,
};

export default NumberOfEvents;