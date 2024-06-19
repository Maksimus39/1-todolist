import type {Meta, StoryObj} from "@storybook/react";
import {action} from '@storybook/addon-actions';
import {EditableSpan} from "../EditableSpan";


const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onChange: {
            description: 'Change Task Status',
            action: 'clicked'
        }
    }
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {
    args: {
        value: 'HTML'
    }
}