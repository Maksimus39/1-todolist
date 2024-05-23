import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

// Типизация для блока кнопок
export type FilterValuesType='All'|'Active'|'Completed'

function App() {

    // state с данными
    const [tasks, setTask] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    // state для фильтрации данных
    const [filter, setFilter] = useState<FilterValuesType>('All');

    // функция удаления таски
    const removeTask = (id: string) => {
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
    const changeFilter=(filter:FilterValuesType)=>{
        setFilter(filter)
    }
    // добавление таски
    const addTask = (nameTasks:string) => {
        const newTask={id:v1(),title:nameTasks,isDone:false};
      setTask([newTask,...tasks])
    }
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filter={filter}
            />
        </div>
    );
}

export default App;
