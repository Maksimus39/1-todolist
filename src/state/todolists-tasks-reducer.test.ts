import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals',()=>{
    const startTasksState:TasksStateType={}
    const startTodolistsState:Array<TodolistType>=[]

    const action=addTodolistAC('New todolist')

    const endTasksState=tasksReducer(startTasksState,action)
    const endTodolistsState=todolistReducer(startTodolistsState,action)

    const keys=Object.keys(endTasksState)
    const idFromTasks=keys[0]
    const idFromTodolists=endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistID)
    expect(idFromTodolists).toBe(action.payload.todolistID)

})