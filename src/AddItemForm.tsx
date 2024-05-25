import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

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
            <input
                className={error ? 'error' : ''}
                value={taskTitle}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />

            <Button
                title={'+'}
                onClick={addItemHandler}
            />
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}