// src/types.ts
export interface Event {
    name: string;
    date: string; // ISO date format "YYYY-MM-DD"
    eventType: string;
    eventDistance: string;
    priority: string
}

export interface Week {
    startDate: string;
    endDate: string;
    period: string
    events: Event[];
}

export interface Day {
    day:string
}

export interface Session {
    id: number
    date: string,
    mode: string,
    duration: string,
    focus: string,
    description: string
}