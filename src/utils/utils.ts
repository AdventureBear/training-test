import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';  // Ensure weeks start on Monday
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'


dayjs.extend(isoWeek);
dayjs.extend(isSameOrAfter)
dayjs.extend(CustomParseFormat)

dayjs.extend(isoWeek);

import { Event, Week } from '../types';  // Adjust the path if necessary

export function getWeeks(startDate: string, events: Event[]): Week[] {
    const start = dayjs(startDate).startOf('isoWeek');
    const sortedEvents = [...events].sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

    let currentWeekStart = start;
    const weeks: Week[] = [];

    const lastEventWeekEnd = dayjs(sortedEvents[sortedEvents.length - 1].date).endOf('isoWeek');

    while (currentWeekStart.isBefore(lastEventWeekEnd) || currentWeekStart.isSame(lastEventWeekEnd)) {
        const currentWeekEnd = currentWeekStart.endOf('isoWeek');
        const days: string[] = [];

        for (let day = currentWeekStart; day.isBefore(currentWeekEnd.add(1, 'day')); day = day.add(1, 'day')) {
            days.push(day.format('YYYY-MM-DD'));
        }

        const weekEvents = sortedEvents.filter(event =>
            days.includes(dayjs(event.date).format('YYYY-MM-DD')) // Ensure event.date is parsed correctly
        );

        const periodLabel = weekEvents.length > 0 ? `Event - Priority ${weekEvents[0].priority}` : '';
        // if (currentWeekStart.isSameOrAfter(transitionStart) && currentWeekStart.isBefore(transitionEnd.add(1, 'day'))) {
        //     periodLabel = 'Transition';
        // }

        weeks.push({
            startDate: currentWeekStart.format('YYYY-MM-DD'),
            endDate: currentWeekEnd.format('YYYY-MM-DD'),
            events: weekEvents,
            period: periodLabel
        });

        currentWeekStart = currentWeekEnd.add(1, 'day');
    }

    return weeks;
}
