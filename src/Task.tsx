import React, {ChangeEvent, memo} from 'react';
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TasksType} from "./Todolist";


type TasksPropsType={
    task:TasksType
    todolistId: string
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    removeTask: (todolistId: string, id: string) => void
    updateTask: (todolistId: string, taskId: string, newTitle: string) => void
}
export const Task = memo(({task, todolistId, changeTaskStatus, removeTask, updateTask}:TasksPropsType) => {



    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(todolistId, task.id, newStatusValue)
    }
    const removeTaskHandler = () => {
       removeTask(todolistId, task.id)
    }
    const onTitleChangeHandler = (newTitle: string) => {
        updateTask(todolistId, task.id, newTitle)
    }


    return (
        <div>
            <ListItem
                sx={getListItemSx(task.isDone)}

                className={task.isDone ? 'is-done' : ''}>

                <div>
                    <Checkbox
                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}
                    />
                    <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
                </div>

                <IconButton onClick={removeTaskHandler}>
                    <DeleteIcon/>
                </IconButton>

            </ListItem>
        </div>
    );
})

