import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TasksType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

export let todolistID1 = v1()
export let todolistID2 = v1()

const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ],
}

export let tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(ts => ts.id !== action.payload.taskId)
            }
        }
        case "ADD-TASKS": {
            const newTask: TasksType = {id: v1(), title: action.payload.nameTasks, isDone: false};
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(ts => ts.id === action.payload.taskId ? {
                    ...ts,
                    isDone: action.payload.taskStatus
                } : ts)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(ts => ts.id === action.payload.taskId ? {
                    ...ts,
                    title: action.payload.newTitle
                } : ts)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.payload.todolistID]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }
        default:
            return state
    }

}

// Создание AC
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId: todolistId,
            taskId: taskId
        }
    } as const
}

export const addTaskAC = (todolistId: string, nameTasks: string) => {
    return {
        type: "ADD-TASKS",
        payload: {
            todolistId: todolistId,
            nameTasks: nameTasks,
        }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, taskStatus: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId: todolistId,
            taskId: taskId,
            taskStatus: taskStatus
        }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId: todolistId,
            taskId: taskId,
            newTitle: newTitle
        }
    } as const
}


// Создание ActionType
export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    payload: {
        todolistId: string,
        taskId: string
    }
}
export type AddTaskActionType = {
    type: "ADD-TASKS",
    payload: {
        todolistId: string,
        nameTasks: string
    }
}
export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todolistId: string,
        taskId: string,
        taskStatus: boolean
    }
}
export type ChangeTaskTitleActionCreator = {
    type: "CHANGE-TASK-TITLE",
    payload: {
        todolistId: string,
        taskId: string
        newTitle: string
    }
}

// Создание ActionsType
export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | changeTaskStatusActionType
    | ChangeTaskTitleActionCreator
    | AddTodolistActionType
    | RemoveTodolistActionType
