// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from "prop-types";
import { useState } from 'react';

const Event = ({event}) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails((prev) => !prev);

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      {showDetails && (
        <div data-testid="event-details">
          <p>{event.created}</p>
          <p>{event.location}</p>
          <p>{event.description}</p>
        </div>
      )}

      <button className="details-btn" onClick={toggleDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </li>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    summary: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default Event;