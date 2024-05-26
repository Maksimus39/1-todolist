import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox'


type AddItemFormPropsType = {

    addItem: (nameTasks: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    // state title
    const [taskTitle, setTaskTitle] = useState('')

    // state error
    const [error, setError] = useState<string | null>(null)

    // function addTaskHandler
    const addItemHandler = () => {

        if (taskTitle.trim() !== '') {
            props.addItem(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    // function changeTaskTitleHandler
    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    // function addTaskOnKeyUpHandler
    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }


    return (
        <div>

            <TextField
                label='Enter a title'
                variant={'outlined'}
                className={error ? 'error' : ''}
                value={taskTitle}
                size={'small'}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
                error={!!error}
                helperText={error}
            />

            <IconButton onClick={addItemHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>

        </div>
    )
}