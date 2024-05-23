import React from "react";
import {Button} from "./Button";

type TasksType = {
    id: number
    title: string
    isDone: boolean
}


type TodolistPropsType = {
    title: string,
    tasks: TasksType[]
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
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>

            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    )
}