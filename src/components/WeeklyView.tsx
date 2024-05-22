import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'; // This plugin allows for custom date formats
import advancedFormat from 'dayjs/plugin/advancedFormat'; // Extends formatting options
import trainingData from '../data/training.json'; // Ensure correct path


import {Week} from "../types.ts";
// Extend dayjs with necessary plugins
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

interface WeekViewProps {
    week: Week;
    weekNumber: number;
}

const WeekView: React.FC<WeekViewProps> = ({ week, weekNumber }) => {
    const days = [];
    for (let d = dayjs(week.startDate); d.isBefore(dayjs(week.endDate).add(1, 'day')); d = d.add(1, 'day')) {
        days.push(d.format('YYYY-MM-DD'));  // Ensure each day is formatted to match the event.date format
    }

    const startDate = dayjs(week.startDate);
    const endDate = dayjs(week.endDate);

    const startDateFormatted = startDate.format('MMM D');
    const endDateFormatted = startDate.month() === endDate.month()
        ? endDate.format('D')
        : endDate.format('MMM D');

    const weekTitle = `Week ${weekNumber}: ${startDateFormatted}-${endDateFormatted}`;
    // Generate event details
    const eventDetails = week.events.map(event =>
        `${event.name}, ${dayjs(event.date).format('MMM D')}, Priority: ${event.priority}`
    ).join('; ');


    return (
        <div style={{ margin: '20px'}}>
            <h2>{weekTitle}</h2>
            {week.events.length > 0 && (
                <h3 style={{ marginTop: '3px' }}>
                    <strong>Events:</strong> {eventDetails}
                </h3>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {days.map((day, index) => (
                    <div key={index} style={{
                        width: '100px',
                        minHeight: '100px',
                        height: 'auto',
                        border: '1px solid black',
                        position: 'relative',
                        padding: '10px'
                    }}>


                        <div style={{
                            position: 'absolute',
                            top: '5px',
                            left: '5px',
                            color: '#4A90E2',
                            fontWeight: 'bold'
                        }}>
                            {dayjs(day).format('ddd MMM D')}
                        </div>

                        <div style={{marginTop: '20px'}}>
                            {week.events.filter(event => dayjs(event.date).format('YYYY-MM-DD') === day).map((event, idx) => (
                                <span key={idx}>{event.name}</span>
                            ))}
                        </div>

                        {/* Render Training Sessions */}
                        <div>
                            {trainingData.trainingSessions.filter(session => session.date === day).map((session, idx) => (
                                <div key={idx} style={{ background: '#f0f0f0', padding: '5px', margin: '2px 0', borderRadius: '5px' }}>
                                    {session.mode} - {session.duration} ({session.focus})
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekView;
