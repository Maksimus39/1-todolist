import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import {Container, Paper, Switch, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Unstable_Grid2";
import {MenuButton} from "./MenuButton";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


// Типизация для блока кнопок
export type FilterValuesType = 'All' | 'Active' | 'Completed'

// Типизация для массива тудулистов
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TasksType[]
}
// смена темы
type ThemeMode = 'dark' | 'light'

function App() {
    // смена темы
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    // add theme
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#2556c9'
            }
        }
    })

    // функция удаления таски
    const removeTask = (todolistId: string, taskId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId),
        }
        setTasks(newTodolistTasks)
    }
    // функция для фильтрации по кнопкам
    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(tl => (tl.id === todolistId ? {...tl, filter} : tl)))
    }
    // добавление таски
    const addTask = (todolistId: string, nameTasks: string) => {
        const newTask = {
            id: v1(),
            title: nameTasks,
            isDone: false,
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    // state checkbox
    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? {...t, isDone: taskStatus} : t)),
        })
    }

    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolists)

        // удалим таски для тудулиста из стейта где мы храним таски
        delete tasks[todolistId]
        // засетаем в state копию объекта
        setTasks({...tasks})
    }

    // функчия добавления тудулиста
    const addTodolist = (title: string) => {
        const todolistID = v1()
        const newTodolist: TodolistType = {id: todolistID, title: title, filter: 'All'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistID]: []})
    }

    const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(ts => ts.id === taskId ? {...ts, title: newTitle} : ts)
        })
    }

    const updateTodolist = (todolistId: string, title: string) => {
        setTodolists(todolists.map(td => td.id === todolistId ? {...td, title: title} : td))
    }
    // функционал о смене темы
    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <div>

            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position='static' sx={{mb: '30px'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton color={'inherit'}>
                            <MenuIcon/>
                        </IconButton>

                        <div>
                            <MenuButton>Login</MenuButton>
                            <MenuButton>Logout</MenuButton>
                            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                            <Switch color={'default'} onChange={changeModeHandler}/>
                        </div>

                    </Toolbar>
                </AppBar>


                <Container fixed>
                    <Grid container sx={{mb: '30px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>

                        {todolists.map(tl => {

                            // блок фильтрации
                            let tasksForTodolist = tasks[tl.id]
                            if (tl.filter === 'Active') {
                                tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
                            }

                            if (tl.filter === 'Completed') {
                                tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
                            }

                            return (
                                <Grid>
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
                                        <Todolist
                                            updateTodolist={updateTodolist}
                                            updateTask={updateTask}
                                            key={tl.id}
                                            todolistId={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>

                </Container>

            </ThemeProvider>


        </div>
    );
}

export default App;
