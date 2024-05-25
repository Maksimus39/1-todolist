import React, {ChangeEvent} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


type TodolistPropsType = {
    todolistId: string
    title: string,
    tasks: TasksType[]
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, nameTasks: string) => void
    filter: FilterValuesType
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}
export const Todolist = (props: TodolistPropsType) => {

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        props.changeFilter(props.todolistId, filter)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    // функция обёртка для двух компонент
    const addTasksCallback = (nameTasks: string) => {
        props.addTask(props.todolistId, nameTasks)
    }

    const updateTodolistHandler = (title: string) => {
        props.updateTodolist(props.todolistId, title)
    }

    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan value={props.title} onChange={updateTodolistHandler}/>
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </h3>

            <AddItemForm addItem={addTasksCallback}/>

            <div>
                {props.tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul>
                        {props.tasks.map(task => {

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                props.changeTaskStatus(props.todolistId, task.id, newStatusValue)
                            }
                            const removeTaskHandler = () => {
                                props.removeTask(props.todolistId, task.id)
                            }
                            const changeTaskTitleHandler = (newTitle: string) => {
                                props.updateTask(props.todolistId, task.id, newTitle)
                            }


                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <input type="checkbox"
                                           checked={task.isDone}
                                           onChange={changeTaskStatusHandler}
                                    />


                                    {/*<span>{task.title}</span>*/}
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>


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


