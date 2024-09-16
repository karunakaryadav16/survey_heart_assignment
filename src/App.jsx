import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './index.css';
import { useSelector } from 'react-redux';

function App() {
  const todos2 = useSelector((state) => state.todos.todos);
  const todos = [...todos2].reverse();
  const tasklength = todos.length;
  
  return (
    <div className="flex flex-col justify-center items-center  min-h-screen px-9">
      <div className="w-screen flex items-center justify-between  gap-x-20 mb-4 px-4 ">
        <div className='flex flex-col'>
          <h1 className="text-4xl font-bold">Tasks</h1>
          <span className="text-xl  text-[#64748B] whitespace-nowrap">
           <span className='text-orange-700 font-bold'> {tasklength} </span> Remaining tasks
          </span>
        </div>
        <div className='ustify-self-end'> 
        <TodoForm />
        </div>
      </div>

      <TodoList />
    </div>
  );
}

export default App;

