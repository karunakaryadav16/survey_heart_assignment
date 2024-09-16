import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react';

const API_URL = 'https://dummyjson.com/todos';

// Fetch Todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API_URL);
  return response.data.todos; // Assumes 'todos' field in response
});

// Fetch Single Todo
export const fetchTodo = createAsyncThunk('todos/fetchTodo', async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

// Create Todo
export const createTodo = createAsyncThunk('todos/createTodo', async (newTodo) => {
  console.log('new do ' , newTodo)
  const response = await axios.post(`${API_URL}/add`, newTodo);
  console.log('API Response:', response.data);  // Check if this contains the correct ID
  return response.data;
});


// Update Todo

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, updatedTodo }) => {
  const response = await axios.put(`https://dummyjson.com/todos/${id}`, updatedTodo);
  return response.data; 
});



  

 // Delete Todo

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    console.log(id)
    console.log("from backend")
    const response = await axios.delete(`https://dummyjson.com/todos/${id}`);
    if (response.status === 200) {
      console.log('Deleted successfully:', id);
      return id;
    } else {
      throw new Error('Failed to delete todo');
    }
  });

  
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
// Inside todoSlice

extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        console.log('acton create ',action.payload)
        state.todos.push(action.payload);
      })
      
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload; 
        }
      })
      
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
  


});

export default todoSlice.reducer;


