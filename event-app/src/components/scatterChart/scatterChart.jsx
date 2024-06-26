import { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
    // const demoUrl = 'https://codesandbox.io/s/simple-scatter-chart-edeu2s';

    const [data, setData] = useState([]);
    const getData = () => {
        const data = allLocations.map((location) => {
            const count = events.filter((event) => event.location === location).length;
            const city = location.split((/, | - /))[0];
            return { city, count };
        })
        return data;
    };
    useEffect(() => {
        setData(getData());
    }, [`${data}`, `${events}`]);

    return (
    <ResponsiveContainer width="99%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: -30,}}>
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="City" unit=""
            angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }} />
        <YAxis type="number" dataKey="count" name="Count" unit=" events" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
        </ScatterChart>
    </ResponsiveContainer>
    );
}

export default CityEventsChart