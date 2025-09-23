// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import Event from './Event';

// eslint-disable-next-line react/prop-types
const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {events? events.map(event => <Event key={event.id} event={event} />): null}
    </ul>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  )
};

export default EventList;