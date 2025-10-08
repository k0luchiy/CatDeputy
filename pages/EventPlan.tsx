import React, { useState, useMemo } from 'react';
import type { EventItem } from '../types';
import CalendarView from '../components/CalendarView';
import { useData } from '../contexts/DataContext';

const EventPlan: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-10-15T00:00:00'));
  const { events } = useData();

  const filteredEvents = useMemo(() => {
    return events
      .filter(event => new Date(event.date).toDateString() === selectedDate.toDateString())
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [selectedDate, events]);

  return (
    <div className="space-y-4">
      <CalendarView 
        events={events} 
        selectedDate={selectedDate} 
        onDateSelect={setSelectedDate} 
      />

      <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-soft">
        <h2 className="p-4 font-semibold text-text-main-light dark:text-text-main-dark border-b border-gray-200 dark:border-gray-700">
          События на {selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
        </h2>
        {filteredEvents.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredEvents.map((event: EventItem) => (
              <div key={event.id} className="p-4">
                <p className="font-bold text-accent-blue-light dark:text-accent-blue-dark">{event.time}</p>
                <p className="font-semibold text-text-main-light dark:text-text-main-dark my-1">{event.title}</p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{event.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="p-4 text-text-secondary-light dark:text-text-secondary-dark">На выбранную дату событий нет.</p>
        )}
      </div>
    </div>
  );
};

export default EventPlan;