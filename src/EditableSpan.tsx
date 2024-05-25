import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    onChange: (newTitle: string) => void;
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState<string>(props.value);


    const activateEditModeHandler = () => {
        setEditMode(true)
    }

    const deActivateEditModeHandler = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }


    return (
        <>
            {editMode ? (
                <input
                    value={title}
                    onBlur={deActivateEditModeHandler}
                    autoFocus
                    onChange={changeTitleHandler}
                />
            ) : (
                <span onDoubleClick={activateEditModeHandler}>{props.value}</span>
            )}
        </>
    )
}