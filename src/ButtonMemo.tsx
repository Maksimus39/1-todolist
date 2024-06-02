import React, {memo} from "react";
import Button from "@mui/material/Button";

type ButtonMemoPropsType = {
    variant: 'outlined' | 'text'
    color: 'inherit' | 'primary' | 'secondary'
    onClick: () => void
    name: string
}

export const ButtonMemo = memo((props: ButtonMemoPropsType) => {
    return (
        <div>
            <Button variant={props.variant} color={props.color} onClick={props.onClick}>{props.name}</Button>
        </div>
    )
})