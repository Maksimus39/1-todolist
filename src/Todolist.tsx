import React from "react";
import {Button} from "./Button";
import {FilterValueType} from "./App";

type TasksType = {
    id: number
    title: string
    isDone: boolean
}


type TodolistPropsType = {
    title: string,
    tasks: TasksType[]
    removeTask:(id: number) => void
    changeFilter:(filter:FilterValueType)=>void
}
export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>

            <div>
                {props.tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <ul>
                        {props.tasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title={"X"} onClick={()=>props.removeTask(task.id)}/>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>

            <div>
                <Button title={'All'} onClick={()=>props.changeFilter('All')}/>
                <Button title={'Active'} onClick={()=>props.changeFilter('Active')}/>
                <Button title={'Completed'} onClick={()=>props.changeFilter('Completed')}/>
            </div>
        </div>
    )
}