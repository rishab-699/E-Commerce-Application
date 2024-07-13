import React from 'react'
import './chart.css'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart({title, data, dataKey, grid}) {
    
  return (
    <div className='chart'>
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4/1}>
            <AreaChart width={730} height={250} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis dataKey={dataKey}/>
            {grid && < CartesianGrid strokeDasharray="3 3" />}
            <Tooltip />
            <Area type="monotone" dataKey={dataKey} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
    </ResponsiveContainer>
    </div>
  )
}
