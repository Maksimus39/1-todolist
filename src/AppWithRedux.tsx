import React, {useCallback, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import {Container, Paper, Switch, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Unstable_Grid2";
import {MenuButton} from "./MenuButton";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


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

function AppWithRedux() {
    // смена темы
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');


    // хуки из Redux
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolist);
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);


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
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        const action = removeTaskAC(todolistId, taskId)
        dispatch(action)
    }, [dispatch])
    // функция для фильтрации по кнопкам
    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatch(action)
    }, [dispatch])
    // добавление таски
    const addTask = useCallback((todolistId: string, nameTasks: string) => {
        const action = addTaskAC(todolistId, nameTasks)
        dispatch(action)
    }, [dispatch])
    // state checkbox
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, taskStatus: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskId, taskStatus)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)

    }, [dispatch])

    // функция добавления тудулиста
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)

    }, [dispatch])

    const updateTask = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, [dispatch])

    const updateTodolist = useCallback((todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatch(action)
    }, [dispatch])


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



                            return (
                                <Grid>
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
                                        <Todolist
                                            tasks={tasks[tl.id]}
                                            updateTodolist={updateTodolist}
                                            updateTask={updateTask}
                                            key={tl.id}
                                            todolistId={tl.id}
                                            title={tl.title}
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
export default AppWithRedux;
