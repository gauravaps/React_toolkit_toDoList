import {configureStore} from '@reduxjs/toolkit'
import  todoSlice  from './ToDoSlice';

const store = configureStore({
    reducer:{
        toDos:todoSlice
    },
})

export default store;