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
    filter: FilterValuesType
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
}
export const Todolist = (props: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const addTaskHandler = () => {

        if (taskTitle.trim() !== '') {
            props.addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />

                <Button
                    title={'+'}
                    onClick={addTaskHandler}
                />
                {error && <div className={'error-message'}>{error}</div>}
            </div>

            <div>
                {props.tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul>
                        {props.tasks.map(task => {

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                props.changeTaskStatus(task.id, newStatusValue)
                            }
                            const removeTaskHandler = () => {
                                props.removeTask(task.id)
                            }


                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <input type="checkbox"
                                           checked={task.isDone}
                                           onChange={changeTaskStatusHandler}
                                    />
                                    <span>{task.title}</span>
                                    <Button title={"X"} onClick={removeTaskHandler}/>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>

            <div>
                <Button
                    className={props.filter === 'All' ? 'active-filter' : ''}
                    title={'All'}
                    onClick={() => changeFilterTasksHandler('All')}
                />
                <Button
                    className={props.filter === 'Active' ? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => changeFilterTasksHandler('Active')}
                />
                <Button
                    className={props.filter === 'Completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => changeFilterTasksHandler('Completed')}
                />
            </div>
        </div>
    )
}