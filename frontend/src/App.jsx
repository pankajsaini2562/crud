import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  // Fetch todos
  useEffect(() => {
    axios.get("http://localhost:4000/user/").then((response) => {
      setTodos(response.data.todos);
    });
  }, [todos]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      axios
        .post("http://localhost:4000/user/", { name: todo })
        .then((response) => {
          setTodos([...todos, response.data]);
        });
    }
    setTodo("");
  };

  const handleOnDelete = (id) => {
    axios.delete(`http://localhost:4000/user/${id}`).then(() => {
      const returnTodo = todos.filter((todo) => todo.id !== id);
      setTodos(returnTodo);
    });
  };

  const handleOnEdit = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, name: e.target.value });
  };

  const handleOnEditSubmit = (e) => {
    e.preventDefault();
    handleUpdateTodo(currentTodo, currentTodo._id);
  };

  const handleUpdateTodo = (updatetodo, id) => {
    axios
      .put(`http://localhost:4000/user/${id}`, { name: updatetodo.name })
      .then((response) => {
        const updatedTodo = todos.map((todo) => {
          return todo._id === response.data._id ? response.data : todo;
        });

        setTodos(updatedTodo);
      });
    setIsEditing(false);
    setCurrentTodo({});
  };

  return (
    <div className="flex flex-col items-center px-4 md:px-10 lg:px-20 py-10">
      <h1 className="text-center text-3xl md:text-5xl font-bold mb-8">
        Todo App
      </h1>

      {isEditing ? (
        <form
          onSubmit={handleOnEditSubmit}
          className="w-full max-w-md flex flex-col md:flex-row justify-center items-center gap-4"
        >
          <span className="text-lg md:text-2xl">Edit Todo:</span>
          <input
            type="text"
            value={currentTodo.name}
            onChange={handleEditInputChange}
            className="flex-grow px-4 py-2 border rounded-md"
            placeholder="Update your todo"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Update
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleOnSubmit}
          className="w-full max-w-md flex flex-col md:flex-row justify-center items-center gap-4"
        >
          <span className="text-lg md:text-2xl">Add a Todo:</span>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-md"
            placeholder="Enter your todo"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      )}

      <ul className="w-full max-w-2xl flex flex-col gap-4 mt-8">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-md"
          >
            <span className="flex-grow text-lg">{todo.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleOnEdit(todo)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleOnDelete(todo._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
