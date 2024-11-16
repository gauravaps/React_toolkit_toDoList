import {createSlice ,nanoid} from '@reduxjs/toolkit'


const initialState=[];


export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
      addTodo: (state, action) => {
        
        state.push({
          id: nanoid(), 
          text: action.payload, 
        });
      },

      updateTodo: (state, action) => {
        const findTodo = state.find((todo) => todo.id === action.payload.id); 
        if (findTodo) {
          findTodo.text = action.payload.text; 
        }
      },
      
     removeTodo:(state ,action)=>{
        return state.filter((todo) => todo.id !== action.payload);
     } 

    },
  });
export  const {addTodo ,removeTodo ,updateTodo} =todoSlice.actions;
export default todoSlice.reducer;