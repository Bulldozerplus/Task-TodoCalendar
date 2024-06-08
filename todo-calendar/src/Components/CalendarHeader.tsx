import React from 'react';

type FirstDayType = {
    day: number
    year: number
    monthLong: string
}

type CalendarHeaderProps = {
    firstDayOfTheCurrentMonth: FirstDayType
    goToNextMonth() : void
    goToPreviousMonth(): void
    goToToday(): void
}

const CalendarHeader = ({firstDayOfTheCurrentMonth, goToNextMonth, goToPreviousMonth, goToToday} : CalendarHeaderProps) => {
    return (
        <div className='calendar-headline'>
            <div className='calendar-headline-controls'>
                <div className='calendar-headline-control' onClick={goToPreviousMonth}>{'<-'}</div>
                <div className='calendar-headline-control calendar-headline-controls-today'
                     onClick={goToToday}>{firstDayOfTheCurrentMonth.day} {firstDayOfTheCurrentMonth.monthLong} {firstDayOfTheCurrentMonth.year}
                </div>
                <div className='calendar-headline-control' onClick={goToNextMonth}>{'->'}</div>
            </div>
        </div>
    );
};

export default CalendarHeader;