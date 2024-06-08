import React, {useState} from 'react';
import ModalWindow from "./ModalWindow";


const DayOfMonths = ({day, id, isActive}: {
    day: number | string,
    id: string,
    isActive: boolean
}) => {
    const [modalOpen, setIsModalOpen] = useState(false)
    const handleClick = () => {
        setIsModalOpen(current => !current)
    };


    return (<>
            <div id={id} onClick={handleClick} className={isActive ? `calendar-grid-cell-active`
                : `calendar-grid-cell`
            }>
                {day}
            </div>
            {modalOpen && <ModalWindow day={day} setIsModalOpen={setIsModalOpen}/>}
        </>

    );
};

export default DayOfMonths;