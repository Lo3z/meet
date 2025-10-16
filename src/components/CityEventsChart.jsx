import {useState, useEffect} from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import PropTypes from 'prop-types';

const CityEventsChart = ({allLocations, events}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, allLocations]);

  const getData = () => {
    const data = allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length
      const city = location.split(', ')[0]
      return { city, count };
    })
    return data;
  };

  return (
    <ResponsiveContainer width="99%" height ={400}>
      <ScatterChart
        width={730}
        height={250}
        margin={{
          top: 20,
          right: 20,
          bottom: 10,
          left: 10
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" type="category" name="City"/>
        <YAxis dataKey="count" type="number" name="number of events"/>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
} 

CityEventsChart.propTypes = {
  allLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        location: PropTypes.string.isRequired,
      })
    ).isRequired,
};

export default CityEventsChart;