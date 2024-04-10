import { useState } from "react";

export const CitySearch = ({ allLocations }) => {
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
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false); // to hide the list
    };

    return <div id="city-search">
        <input type="text" className="city" placeholder="Search for a city"
            onFocus={() => setShowSuggestions(true)}
            value={query} onChange={handleInputChanged}
        />
        {!showSuggestions ? null : 
            <ul className="suggestions" style={{background:"lightgreen"}}>
                {suggestions.map((suggestion) => {
                    return <li key={suggestion} onClick={handleItemClicked}>{suggestion}</li>
                })}
                <li key='See all cities' onClick={handleItemClicked}>
                    <b>See all cities</b>
                </li>
            </ul>
        }
    </div>
}