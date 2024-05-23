import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";


type TasksType = {
    id: string
    title: string
    isDone: boolean
}


type TodolistPropsType = {
    title: string,
    tasks: TasksType[]
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (nameTasks: string) => void
    filter:FilterValuesType
}
export const Todolist = (props: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(taskTitle)
        setTaskTitle('')
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}
                />

                <Button
                    title={'+'}
                    onClick={addTaskHandler}
                />

            </div>

            <div>
                {props.tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul>
                        {props.tasks.map(task => {


                            const removeTaskHandler = () => {
                                props.removeTask(task.id)
                            }


                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title={"X"} onClick={removeTaskHandler}/>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>

            <div>
                <Button title={'All'} onClick={() => changeFilterTasksHandler('All')}/>
                <Button title={'Active'} onClick={() => changeFilterTasksHandler('Active')}/>
                <Button title={'Completed'} onClick={() => changeFilterTasksHandler('Completed')}/>
            </div>
        </div>
    )
}