import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,Legend } from 'recharts';
export default function DashBoardCharts({chartData,taskNames}) {
  const COLORS = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00c49f',
    '#0088FE', '#FFBB28', '#FF8042', '#a83279', '#4f9da6',
    '#d8854f', '#a29bfe', '#6c5ce7', '#fd79a8', '#00b894'
  ]
  return(
    <LineChart width={730} height={250} data={chartData}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <Legend/>
    <XAxis dataKey="round" />
    <YAxis type="number" domain={[0, 1]} allowDataOverflow />
    <Tooltip />
    
    {taskNames.map((item,index)=>{
      return(
        <Line type="monotone" dataKey={item} stroke={COLORS[index % COLORS.length]}/>
      )
    }
    )}
  </LineChart>
  )
}
