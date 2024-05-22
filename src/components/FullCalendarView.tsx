// src/components/FullCalendarView.tsx
import React from 'react';
import { Week } from '../types';

interface FullCalendarViewProps {
    weeks: Week[];
}

const FullCalendarView: React.FC<FullCalendarViewProps> = ({ weeks }) => {

    return (
        <div>
            <h1>Full Calendar View</h1>
            {weeks.map((week, index) => (
                <div key={index} className="week">
                    <div className="summary">Week {index + 1}: {week.startDate} to {week.endDate}</div>
                    {week.events.map((event, idx) => (
                        <div key={idx} className="event">
                            {event.name} - {event.date} ({event.eventType}, {event.eventDistance})
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FullCalendarView;
