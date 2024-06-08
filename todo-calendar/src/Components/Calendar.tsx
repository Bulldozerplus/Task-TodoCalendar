import React, {useState} from 'react';
import {DateTime, Info, Interval, Settings} from "luxon";
import CalendarGridNumberDaysOfTheMonths from "./CalendarGridNumberDaysOfTheMonths";
import CalendarGridNamesOfTheDays from "./CalendarGridNamesOfTheDays";
import CalendarHeader from "./CalendarHeader";
import ModalWindow from "./ModalWindow";

const Calendar = () => {
    Settings.defaultLocale = "ru";
    const today = DateTime.local()
    const [firstDayOfTheCurrentMonth, setFirstDayOfTheCurrentMonth] = useState(today.startOf("month"))
    const week = Info.weekdays()
    const daysOfMonths = Interval.fromDateTimes(
        firstDayOfTheCurrentMonth.startOf("week"),
        firstDayOfTheCurrentMonth.endOf('month').endOf("week")
    ).splitBy({day: 1}).map((day) => day.start)

    console.log(daysOfMonths)
    const goToPreviousMonth = () => {
        setFirstDayOfTheCurrentMonth(firstDayOfTheCurrentMonth.minus({month: 1}));
    };
    const goToNextMonth = () => {
        setFirstDayOfTheCurrentMonth(firstDayOfTheCurrentMonth.plus({month: 1}));
    };
    const goToToday = () => {
        setFirstDayOfTheCurrentMonth(firstDayOfTheCurrentMonth.startOf("month"));
    };


    return (
        <div className='calendar-container'>
            <div className='calendar'>
                <CalendarHeader firstDayOfTheCurrentMonth={firstDayOfTheCurrentMonth} goToNextMonth={goToNextMonth} goToPreviousMonth={goToPreviousMonth} goToToday={goToToday}/>
                <CalendarGridNamesOfTheDays week={week}/>
                <CalendarGridNumberDaysOfTheMonths daysOfMonths={daysOfMonths} />
            </div>
        </div>
    );
};

export default Calendar;