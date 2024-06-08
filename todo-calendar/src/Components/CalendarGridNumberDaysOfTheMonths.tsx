import React, {useState} from 'react';
import Day from "./Day";
import ModalWindow from "./ModalWindow";

const CalendarGridNumberDaysOfTheMonths = ({daysOfMonths}: { daysOfMonths: any[] }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <> :
            <div className='calendar-grid'>
                {daysOfMonths.map((dayOfMonths, currentDayIndex) => (
                    <Day isActive={isActive} id={currentDayIndex.toString()}
                         day={dayOfMonths?.day} key={currentDayIndex}/>
                ))}
            </div>
        </>
    );
};

export default CalendarGridNumberDaysOfTheMonths;