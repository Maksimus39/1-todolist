import React, {memo, useCallback, useMemo} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx} from "./Todolist.styles";
import {ButtonMemo} from "./ButtonMemo";
import {Task} from "./Task";


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


export const Todolist = memo((props: TodolistPropsType) => {


    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        props.changeFilter(props.todolistId, filter)
    }


    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    // функция обёртка для двух компонент
    const addTasksCallback = useCallback((nameTasks: string) => {
        props.addTask(props.todolistId, nameTasks)
    }, [props])

    const updateTodolistHandler = useCallback((title: string) => {
        props.updateTodolist(props.todolistId, title)
    }, [props])


    // блок фильтрации
    let tasks = props.tasks

    useMemo(() => {

        console.log('useMemo')
        if (props.filter === 'Active') {
            tasks = tasks.filter(task => !task.isDone)
        }

        if (props.filter === 'Completed') {
            tasks = tasks.filter(task => task.isDone)
        }

        return tasks
    }, [props.filter]);



    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={updateTodolistHandler}/>

                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>

            </h3>

            <AddItemForm addItem={addTasksCallback}/>

            <div>
                {tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <List>
                        {tasks.map(task => {

                            return (

                                <Task
                                    key={task.id}
                                    task={task}
                                    todolistId={props.todolistId}
                                    changeTaskStatus={props.changeTaskStatus}
                                    removeTask={props.removeTask}
                                    updateTask={props.updateTask}
                                />
                            )
                        })}
                    </List>
                )}
                <Box sx={filterButtonsContainerSx}>

                    <ButtonMemo
                        name={'All'}
                        variant={props.filter === 'All' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterTasksHandler('All')}
                    >
                    </ButtonMemo>

                    <ButtonMemo
                        name={'Active'}
                        variant={props.filter === 'Active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterTasksHandler('Active')}
                    >
                    </ButtonMemo>

                    <ButtonMemo
                        name={'Completed'}
                        variant={props.filter === 'Completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterTasksHandler('Completed')}
                    >
                    </ButtonMemo>

                </Box>
            </div>
        </div>
    )
})



