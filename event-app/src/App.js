import React from 'react';
import './App.css';
import { EventList } from "./components/eventList/eventList"
import { CitySearch } from './components/citySearch/citySearch.jsx';

function App() {
  return (
    <div className="App">
      <CitySearch />
      <EventList />
    </div>
  );
}

export default App;
