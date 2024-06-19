import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import {v1} from "uuid";
import {combineReducers, legacy_createStore} from "redux";
import {Provider} from "react-redux";
import {AppRootStateType} from "./store";
import React from "react";
import {TasksStateType, TodolistType} from "../App";


const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: tasksReducer,
})





// type Test = {
//     todolist? :  TodolistType[],
//     tasks?: TasksStateType
// }
//
// const initialGlobalState:Test = {
//     todolist: [
//         {id: "todolistId1", title: "What to learn", filter: "All"},
//         {id: "todolistId2", title: "What to buy", filter: "All"},
//     ],
//     tasks: {
//         ["todolistId1"]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: false},
//         ],
//         ["todolistId2"]: [
//             {id: v1(), title: 'Milk', isDone: false},
//             {id: v1(), title: 'React Book', isDone: true},
//         ]
//     }
// }
//
//
//
// export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as Partial<{ todolist: never; tasks: never; }>)
//
//
// export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
//     return <Provider store={storyBookStore}>{storyFn()}</Provider>
// }



const initialGlobalState = {
    todolist: [
        {id: "todolistId1", title: "What to learn", filter: "All"},
        {id: "todolistId2", title: "What to buy", filter: "All"},
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
        ],
        ["todolistId2"]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'React Book', isDone: true},
        ]
    }
}



export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType & undefined)


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

