import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {todolistID1, todolistID2} from "./tasks-reducer";




let initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'All'},
    {id: todolistID2, title: 'What to buy', filter: 'All'},
]

export let todolistReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(td => td.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.payload.todolistID,
                title: action.payload.title,
                filter: 'All'
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(td => td.id === action.payload.id ? {...td, title: action.payload.title} : td)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(td => td.id === action.payload.id ? {
                ...td,
                filter: action.payload.filter
            } : td)
        }
        default:
           return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id: todolistId
        }
    } as const
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: title,
            todolistID: v1()
        }
    } as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistId,
            title: title
        }
    } as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: todolistId,
            filter: filter
        }
    } as const
}


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    payload: {
        id: string
    }
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
        todolistID: string
    }
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        id: string,
        title: string
    }
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id: string,
        filter: FilterValuesType
    }
}

export type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType