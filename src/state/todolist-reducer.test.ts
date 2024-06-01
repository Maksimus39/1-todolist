import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    // стартовый стейт
    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]


    const endState = todolistReducer(startState, removeTodolistAC(todolistID1))

    // 3. Проверяем что наш действия соответствуют ожиданиям
    // в массиве остаётся один тудулист

    expect(endState.length).toBe(1)
    // удалится нужный тудулист а не любой
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    // стартовый стейт
    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]


    let newTitle = 'New Todolist'
    const endState = todolistReducer(startState, addTodolistAC(newTitle))

    // 3. Проверяем что наш действия соответствуют ожиданиям
    // в массиве остаётся один тудулист

    expect(endState.length).toBe(3)
    // удалится нужный тудулист а не любой
    expect(endState[2].title).toBe(newTitle)

})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    let todolistID1 = v1()
    let todolistID2 = v1()


    // стартовый стейт
    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]

    const action = changeTodolistTitleAC(todolistID2, newTodolistTitle)


    const endState = todolistReducer(startState, action)

    // 3. Проверяем что наш действия соответствуют ожиданиям
    // в массиве остаётся один тудулист
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)

})

test('correct filter of todolist should be changed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newFilter: FilterValuesType = 'Completed'

    // стартовый стейт
    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]

    const action = changeTodolistFilterAC(todolistID2, newFilter)


    const endState = todolistReducer(startState, action)

    // 3. Проверяем что наш действия соответствуют ожиданиям
    // в массиве остаётся один тудулист
    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)

})