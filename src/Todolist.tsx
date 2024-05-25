import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx} from "./Todolist.styles";


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

                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
                {/*<Button title={'x'} onClick={removeTodolistHandler}/>*/}


            </h3>

            <AddItemForm addItem={addTasksCallback}/>

            <div>
                {props.tasks.length === 0 ? (
                    <p>Тасок нет</p>
                ) : (
                    <List>
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
                                <ListItem
                                    key={task.id}
                                    sx={{
                                        p: 0,
                                        justifyContent: 'space-between',
                                        opacity: task.isDone ? 0.5 : 1
                                    }}

                                    className={task.isDone ? 'is-done' : ''}>

                                    <div>
                                        <Checkbox
                                            checked={task.isDone}
                                            onChange={changeTaskStatusHandler}
                                        />
                                        <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                    </div>

                                    <IconButton onClick={removeTaskHandler}>
                                        <DeleteIcon/>
                                    </IconButton>

                                </ListItem>
                            )
                        })}
                    </List>
                )}
                <Box sx={filterButtonsContainerSx}>
                    <Button
                        variant={props.filter === 'All' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterTasksHandler('All')}
                    >
                        All
                    </Button>

                    <Button
                        variant={props.filter === 'Active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterTasksHandler('Active')}
                    >
                        Active
                    </Button>

                    <Button
                        variant={props.filter === 'Completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterTasksHandler('Completed')}
                    >
                        Completed
                    </Button>
                </Box>
            </div>


        </div>
    )
}


