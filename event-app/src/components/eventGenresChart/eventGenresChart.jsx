import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([
        {lang: 'React', count: 0},
        {lang: 'JavaScript', count: 0},
        {lang: 'Node', count: 0},
        {lang: 'jQuery', count: 0},
        {lang: 'Angular', count: 0}
    ]);
    function getData() {
        let temp = data;
        temp.forEach(item => item.count = 0);
        events.forEach(event => {
            temp.forEach(item => {
                if (event.summary.includes(item.lang)) {
                    item.count++;
                }
            })
        })
        return temp;
    }

    useEffect(() => {
        setData(getData());
    }, [data, `${events}`]);

    // https://recharts.org/en-US/api/PieChart
    const COLORS = ['#DD0000', '#00DD00', '#0000DD', '#DDDD00', '#DD00DD'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        let px = x > cx ? x + outerRadius/2 : x - outerRadius/2;
        let py = y > cy ? y + outerRadius/2 : y - outerRadius/2;
        return (
        <text x={px} y={py}
        fill={COLORS[(index) % COLORS.length]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {data[index].count != 0 ? `${data[index].lang} - ${(percent * 100).toFixed(0)}%` : ''}
        </text>
        );
    };

    return <ResponsiveContainer width="99%" height={400}>
        <PieChart>
            <Pie data={data} cx="50%" cy="50%"
            labelLine={false} label={renderCustomizedLabel}
            outerRadius={80} fill="#8884d8" dataKey="count">
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}
                    name={`${data[index].lang}`}/>
                ))}
            </Pie>
            <Legend />
            <Tooltip />
        </PieChart>
    </ResponsiveContainer>
}