import { useEffect, useState } from "react";

export const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().includes(value.toUpperCase());
        }) : [];

        setQuery(value);
        setSuggestions(filteredLocations);
        // setCurrentCity(value);

        let infoText;
        if (filteredLocations.length === 0) {
            infoText = "We can not find the city you are looking for. Please try another city";
        } else {
            infoText = "";
        }
        setInfoAlert(infoText);
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false); // to hide the list
        setCurrentCity(value);
        setInfoAlert("");
    };

    useEffect(() => {
        setSuggestions(allLocations ? allLocations : []);
      }, [`${allLocations}`]);

    return <div id="city-search">
        <input type="text" className="city" placeholder="Search for a city"
            role="textbox"
            onFocus={() => setShowSuggestions(true)}
            value={query} onChange={handleInputChanged}
        />
        {!showSuggestions ? null : 
            <ul className="suggestions" role="list" style={{background:"lightgreen"}}>
                {suggestions.map((suggestion) => {
                    return <li key={suggestion} role="listitem"
                        onClick={handleItemClicked}>{suggestion}</li>
                })}
                <li key='See all cities' role="listitem"
                    onClick={handleItemClicked}>
                    <b>See all cities</b>
                </li>
            </ul>
        }
    </div>
}