import React, { useState } from 'react';
import type { EventItem } from '../types';

interface CalendarViewProps {
    events: EventItem[];
    onDateSelect: (date: Date) => void;
    selectedDate: Date;
}

const CalendarView: React.FC<CalendarViewProps> = ({ events, onDateSelect, selectedDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date(selectedDate));

    const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = (day: number) => {
        const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        onDateSelect(newSelectedDate);
    };

    const renderDays = () => {
        const days = [];
        const totalDays = daysInMonth(currentDate);
        const firstDay = firstDayOfMonth(currentDate);
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Monday is 0

        for (let i = 0; i < adjustedFirstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isSelected = selectedDate && dayDate.toDateString() === selectedDate.toDateString();
            const hasEvent = events.some(event => new Date(event.date).toDateString() === dayDate.toDateString());
            
            days.push(
                <div key={day} className="flex justify-center items-center">
                    <button 
                        onClick={() => handleDayClick(day)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors relative 
                    ${isSelected ? 'bg-accent-blue-light text-white dark:bg-accent-blue-dark' : 'text-text-main-light dark:text-text-main-dark hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                    >
                        {day}
                        {hasEvent && !isSelected && <div className="absolute bottom-1 w-1.5 h-1.5 bg-accent-blue-light dark:bg-accent-blue-dark rounded-full"></div>}
                        {hasEvent && isSelected && <div className="absolute bottom-1 w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </button>
                </div>
            );
        }

        return days;
    };

    return (
        <div className="p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-soft">
            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <h3 className="font-semibold text-lg text-text-main-light dark:text-text-main-dark">{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h3>
                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {dayNames.map(day => (
                    <div key={day} className="font-semibold">{day}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1 mt-2">
                {renderDays()}
            </div>
        </div>
    );
};

export default CalendarView;
