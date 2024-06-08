import React, {useEffect, useState} from 'react';
import Button from "./Button";
import {APIServices} from "../Services/URL";
import {LOADING_STATUS} from "../Consts/Consts";

type TaskForm = {
    title: string
    description: string
    toggle: boolean
}
const ModalWindow = ({setIsModalOpen, day}: {
    day: number | string,
    setIsModalOpen(state: (current: boolean) => boolean): void
}) => {

    const [taskForm, setTaskForm] = useState<TaskForm>({
        title: '',
        description: '',
        toggle: false,
    })
    const [tasks, setTasks] = useState<any[]>([])
    const [status, setStatus] = useState<string>(LOADING_STATUS.pending)
     
    useEffect(() => {
        getDataTask()
    }, [])

    async function getDataTask(): Promise<any> {
        try {
            setStatus(LOADING_STATUS.pending)
            const response = await APIServices.getTasksList()
            if (response.status === 200) {
                setStatus(LOADING_STATUS.complete)
                const filterTasks = response.data.filter((currentDayTask: {
                    data: string | number;
                }) => currentDayTask.data === day)
                setTasks(filterTasks)
            }
        } catch (e) {
            setStatus(LOADING_STATUS.reject)
        }

    }

    const addTask = async (title: string, description: string, toggle: boolean, day: number | string) => {
        try {
            setStatus(LOADING_STATUS.pending)
            const response = await APIServices.createNewTask(title, description, toggle, day)
            console.log(response)
            if (response.status === 200) {
                await getDataTask()
                setStatus(LOADING_STATUS.complete)
            }
        } catch (e) {
            setStatus(LOADING_STATUS.reject)
        }
    }

    const deleteTask = async (id: string) => {
        try {
            setStatus(LOADING_STATUS.pending)
            const response = await APIServices.deleteCurrentTask(id)
            if (response.status === 200) {
                await getDataTask()
                setStatus(LOADING_STATUS.complete)
            }
        } catch (e) {
            setStatus(LOADING_STATUS.reject)
        }
    }


    return (
        <div className='modal-window modal-active'>
            <div onClick={(e) => e.stopPropagation()} className='modal-window-content'>
                <div className='modal-window-input-wrapper'>
                    <input className='modal-window-input' value={taskForm.title}
                           onChange={event => setTaskForm({...taskForm, title: event.target.value})}
                           placeholder='Введите заголовок задачи'/>
                    <input className='modal-window-input' value={taskForm.description}
                           onChange={event => setTaskForm({...taskForm, description: event.target.value})}
                           placeholder='Введите описание задачи'/>
                </div>
                <div className='modal-window-buttons-wrapper'>
                    <Button className='modal-window-button-add'
                            onClick={() => addTask(taskForm.title, taskForm.description, taskForm.toggle, day)}>Добавить
                        задачу</Button>
                    <Button className='modal-window-button-back'
                            onClick={() => setIsModalOpen(current => !current)}>Назад</Button>
                </div>
                {status === LOADING_STATUS.complete ?
                    <>
                        <h3>Список задач:</h3>
                        {tasks.map(currentTask => (
                            <>

                                <h4 style={{marginBottom: 4, marginTop: 5}}>Название: {currentTask.title}</h4>
                                <div className='modal-tasks-wrapper'>
                                    <p style={{marginTop: 0, marginBottom: 5}}>Описание: {currentTask.description}
                                    </p>
                                    <input value={currentTask.toggle}
                                           type="checkbox"/>
                                </div>


                                <Button onClick={() => deleteTask(currentTask.id)}>Удалить</Button>
                            </>
                        ))}
                    </>
                    : <h4>На сегодня задач нет</h4>
                }
            </div>
        </div>
    );
}

export default ModalWindow;