import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

// Типизация для блока кнопок
export type FilterValueType='All'|'Active'|'Completed'

function App() {

    // state с данными
    const [tasks, setTask] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])

    // state для фильтрации данных
    const [filter, setFilter] = useState<FilterValueType>('All');

    // функция удаления таски
    const removeTask = (id: number) => {
        setTask(tasks.filter(task => task.id !== id))
    }


    // блок фильтрации
    let tasksForTodolist = tasks
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }
    // функция для фильтрации по кнопкам
    const changeFilter=(filter:FilterValueType)=>{
        setFilter(filter)
    }
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
