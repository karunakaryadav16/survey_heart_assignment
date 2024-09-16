import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../redux/todoSlice';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID

const TodoForm = () => {
  const [todoText, setTodoText] = useState('');
  const [open, setOpen] = useState(false); // For managing dialog state
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim()) {
      const newTodo = {
        id: uuidv4(), // Generate a unique ID
        todo: todoText,
        completed: false,
        userId: 5,
      };
      console.log('Creating new todo:', newTodo);
      dispatch(createTodo(newTodo)); // Pass the new todo with ID
      setTodoText('');
      handleClose();
    }
  };

  // Open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full">
      {/* Button to open the dialog */}
      <Button
        variant="outlined"
        sx={{ color: 'white', backgroundColor: 'purple', whiteSpace: 'nowrap' }} // C
        color="primary"
        onClick={handleClickOpen}>
        Add Todo
      </Button>

      {/* Dialog (Pop-up form) */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add a New Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter a new task to add to your todo list.</DialogContentText>

          {/* Material-UI TextField for input */}
          <TextField autoFocus margin="dense" id="todo" label="New Todo" type="text" fullWidth value={todoText} onChange={(e) => setTodoText(e.target.value)} variant="outlined" />
        </DialogContent>

        {/* Dialog Actions (Submit and Cancel buttons) */}
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button className="whitespace-nowrap border-red-900" onClick={handleSubmit} color="primary" variant="contained">
            Add Todo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoForm;
