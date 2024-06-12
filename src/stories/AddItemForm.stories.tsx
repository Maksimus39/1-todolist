import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {action} from '@storybook/addon-actions';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export


const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'cliced'
        }
    },
}

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {}

const AddItemFormError = (props: AddItemFormPropsType) => {


    // state title
    const [taskTitle, setTaskTitle] = useState('')

    // state error
    const [error, setError] = useState<string | null>('Title is required')

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
        if (error) setError(null)
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

export const AddItemFormErrorStory: Story = {
    render: () => <AddItemFormError addItem={action('Button clicked inside form')}/>,
}






