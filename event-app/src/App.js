import React, { useState } from 'react';
import './App.css';
import { EventList } from "./components/eventList/eventList"
import { CitySearch } from './components/citySearch/citySearch.jsx';
import { getEvents, extractLocations } from './api.js';

function App() {
  const [events, setEvents] = useState([]);
  const [allLocations, setLocations] = useState([]);

  getEvents().then(events => {
    setEvents(events);
    setLocations(extractLocations(events));
  })

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} />
      <EventList events={events} />
    </div>
  );
}

export default App;
