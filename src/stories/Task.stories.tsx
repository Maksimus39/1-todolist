import type {Meta, StoryObj} from '@storybook/react';
import React, {useState} from "react";
import {action} from '@storybook/addon-actions';
import {Task} from "../Task";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        changeTaskStatus: {
            description: 'change Task Status',
            action: 'clicked'
        },
        removeTask: {
            description: 'Remove Task',
            action: 'clicked'
        },
        updateTask: {
            description: 'Update Task',
            action: 'clicked'
        }
    },
    args: {
        task: {id: 'newTask', isDone: true, title: 'JS'},
        todolistId: '1234556'
    }
}

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {}

export const TaskIsNotStory: Story = {
    args: {
        task: {id: 'dsbynjtumm', isDone: false, title: 'CSS'},
    }
}

const TaskToggle = () => {
    const [task, setTask] = useState({id: 'newTask', isDone: false, title: 'JS'})

    function changeTaskStatus() {
        setTask({...task, isDone: !task.isDone})
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        setTask({...task, title: newTitle})
    }


    return <Task task={task} todolistId={'bvjahvjsv'} changeTaskStatus={changeTaskStatus}
                 removeTask={action('Remove task')} updateTask={changeTaskTitle}/>
}
export const TaskToggleStory: Story = {
    render: () => <TaskToggle/>
}






