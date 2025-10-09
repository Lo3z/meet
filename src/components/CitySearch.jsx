// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const CitySearch = ({ allLocations, onCitySelected, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  
  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    setQuery(value);
    setSuggestions(filteredLocations);

    let infoText;
    if (filteredLocations.length === 0) {
      infoText = "We cannot find the city you are looking for. Please try another city"
    } else {
      infoText = ""
    }
    setInfoAlert(infoText);
  };
  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    if(onCitySelected) {
      onCitySelected(value === "See all cities" ? "": value);
    }
    setInfoAlert("");
  }

  useEffect(() => { 
    setSuggestions(allLocations); 
  }, [allLocations]);

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ?
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          })}
          <li key='See all cities' onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul> 
        : null
      }
    </div>
  )
}

CitySearch.propTypes = {
  allLocations: PropTypes.arrayOf(PropTypes.string),
};

export default CitySearch;