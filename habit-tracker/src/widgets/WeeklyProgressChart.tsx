import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { format, subDays, isSameDay } from 'date-fns';
import { Habit } from '../types';

interface WeeklyProgressChartProps {
  habits: Habit[];
}

const WeeklyProgressChart: React.FC<WeeklyProgressChartProps> = ({ habits }) => {
  const data = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    const completedCount = habits.filter(h => h.completedDates.includes(dateStr)).length;
    const totalCount = habits.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return {
      name: format(date, 'EEE'),
      percentage,
      fullDate: dateStr,
    };
  });

  return (
    <div className="glass-card p-6 mb-8">
      <h3 className="text-sm font-semibold mb-6 text-[var(--text-secondary)] uppercase tracking-widest">
        Weekly Activity
      </h3>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              dy={10}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass-card px-3 py-2 text-xs">
                      {payload[0].value}% Done
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="percentage" radius={[4, 4, 4, 4]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.percentage === 100 ? '#10b981' : '#3b82f6'} 
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyProgressChart;
