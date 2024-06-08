import axios from "axios";

type ApiServices = {
    getTasksList(): any
    getCurrentTask(id: string): any
    createNewTask(title: string, description: string, toggle: boolean, day: number|string): any
    editCurrentTask(id: string, title: string, description: string): any
    deleteCurrentTask(id: string): any
}

export const APIServices:ApiServices = {
    getTasksList: () => axios.get('http://localhost:3001/tasks'),
    getCurrentTask: (id) => axios.get(`http://localhost:3001/task${id}`),
    createNewTask: (title, description, toggle, day) => axios.post('http://localhost:3001/task', {
        title: title,
        description: description,
        toggle: false,
        data: day
    }),
    editCurrentTask: (id, title, description) => axios.put(`http://localhost:3001/task/${id}`, {
        title: title,
        description: description
    }),
    deleteCurrentTask: (id) => axios.delete(`http://localhost:3001/task/${id}`)
}

