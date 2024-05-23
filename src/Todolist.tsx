import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


type TodolistPropsType = {
    todolistId: string
    title: string,
    tasks: TasksType[]
    removeTask: (todolistId:string,id: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId:string,nameTasks:string) => void
    filter: FilterValuesType
    changeTaskStatus: (todolistId: string,taskId: string, taskStatus: boolean) => void
    removeTodolist:(todolistId: string)=>void
}
export const Todolist = (props: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const addTaskHandler = () => {

        if (taskTitle.trim() !== '') {
            props.addTask(props.todolistId,taskTitle.trim())
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
        props.changeFilter(props.todolistId, filter)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    return (
        <div>
            <h3>
                {props.title}
                <Button title={'x'} onClick={removeTodolistHandler} />
            </h3>
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
                                props.changeTaskStatus(props.todolistId,task.id, newStatusValue)
                            }
                            const removeTaskHandler = () => {
                                props.removeTask(props.todolistId,task.id)
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