// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
import PropTypes from "prop-types";


const NumberOfEvents = ({ numEvents =32, onNumEventsChanged, setErrorAlert }) => {
  const [inputValue, setInputValue] = useState(numEvents.toString());
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const numberValue = parseInt(value, 10);
    let errorText;

    if (value.trim() === "") {
      errorText = "Number of events is required.";
    } else if (isNaN(numberValue)) {
      errorText = "Please enter a valid number.";
    } else if (value <= 0) {
      errorText = "Number of events cannot be negative or 0.";
    } else {
      errorText = ""
    }

    setErrorAlert(errorText);

    if (!errorText) {
      onNumEventsChanged(numberValue);
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="event-count">Number of events: </label>
      <input 
      type="text" 
      id="event-count" 
      value={inputValue}
      onChange={handleInputChange}/>
    </div>
  );
};

NumberOfEvents.propTypes = {
  numEvents: PropTypes.number,
  onNumEventsChanged: PropTypes.func.isRequired,
  setErrorAlert: PropTypes.func.isRequired,
};

export default NumberOfEvents;