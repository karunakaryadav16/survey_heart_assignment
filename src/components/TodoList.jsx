import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo, updateTodo } from '../redux/todoSlice';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos2 = useSelector((state) => state.todos.todos);
  const todos = [...todos2].reverse();

  const [editTodoId, setEditTodoId] = useState(null);
  const [updatedTodoText, setUpdatedTodoText] = useState('');
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // State for delete confirmation
  const [todoToDelete, setTodoToDelete] = useState(null); // State to store the ID of the todo to be deleted

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleOpen = (todo) => {
    setEditTodoId(todo.id);
    setUpdatedTodoText(todo.todo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditTodoId(null);
    setUpdatedTodoText('');
  };

  const handleUpdate = () => {
    if (!updatedTodoText) return;
    const updatedTodo = { todo: updatedTodoText, completed: false };
    dispatch(updateTodo({ id: editTodoId, updatedTodo }))
      .unwrap()
      .then(() => {
        console.log(`Todo with id ${editTodoId} updated successfully`);
        handleClose();
      })
      .catch((error) => {
        console.error(`Failed to update todo with id ${editTodoId}: ${error.message}`);
        alert(`Failed to update todo: ${error.message}`);
      });
  };

  // Open confirmation dialog for deletion
  const handleOpenConfirmDelete = (id) => {
    setTodoToDelete(id);
    setConfirmDeleteOpen(true);
  };

  // Close confirmation dialog
  const handleCloseConfirmDelete = () => {
    setConfirmDeleteOpen(false);
    setTodoToDelete(null);
  };

  // Confirm deletion of todo
  const handleConfirmDelete = () => {
    if (todoToDelete) {
      dispatch(deleteTodo(todoToDelete))
        .unwrap()
        .then(() => console.log(`Todo with id ${todoToDelete} deleted successfully`))
        .catch((error) => console.error(`Failed to delete todo with id ${todoToDelete}: ${error.message}`));
    }
    handleCloseConfirmDelete(); // Close the confirmation dialog
  };

  return (
    <div className="w-screen px-4">
      {todos.length ? (
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 min-w-full">
              <th className="border border-gray-300 px-4 py-2 text-left">Todo</th>
              <th className="border border-gray-300 px-4 py-2">Update</th>
              <th className="border border-gray-300 px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className="hover:bg-gray-50 w-1/3">
                <td className="border w-full border-gray-300 px-4 py-2">{todo.todo}</td>
                <td className="w-full border border-gray-300 px-4 py-2">
                  <Button variant="contained" color="primary" onClick={() => handleOpen(todo)}>
                    Update
                  </Button>
                </td>
                <td className="w-full border border-gray-300 px-4 py-2">
                  <Button variant="outlined" color="secondary" onClick={() => handleOpenConfirmDelete(todo.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className=" p-6 h-screen flex justify-center items-center font-bold text-4xl text-red-700">No Todos Available</div>
      )}

      {/* Material UI Dialog for editing the todo */}
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Todo" type="text" fullWidth variant="outlined" value={updatedTodoText} onChange={(e) => setUpdatedTodoText(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Material UI Dialog for delete confirmation */}
      <Dialog open={confirmDeleteOpen} onClose={handleCloseConfirmDelete} fullWidth={true}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this todo?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoList;


