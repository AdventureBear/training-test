// src/App.tsx
import React, {useEffect, useState} from 'react';
import WeekView from './components/WeeklyView';
import data from './data/data.json';
// import training from './data/training.json'
import {getWeeks} from './utils/utils';
import {Week} from "./types.ts";
import FullCalendarView from "./components/FullCalendarView.tsx";

const App: React.FC = () => {
    const [weeks, setWeeks] = useState<Week[]>([]);

    useEffect(() => {
        const loadedWeeks: Week[] = getWeeks(data.startDate, data.events);
        setWeeks(loadedWeeks);
    }, []);
    return (
        <div>
            <FullCalendarView weeks={weeks} />
            {weeks.map((week, index) => (
                <WeekView key={index} week={week} weekNumber={index + 1} />
            ))}
                {/*<WeekView key={index} week={week} weekNumber={index + 1} />*/}
            {/*<WeeklyView weeks={weeks} />*/}
        </div>
    );
};

export default App;
