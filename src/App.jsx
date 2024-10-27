import { useState } from "react";
export default function App() {
  const [todoList, setTodoList] = useState(initialTODO);
  const [nextIndex, setNextIndex] = useState(3);
  // event handler for todo item delete
  function handleDeleteClick(deleteId) {
    setTodoList(todoList.filter((todo) => todo.id !== deleteId));
  }

  // event handler for "check"ing todo items
  function handleDoneClick(todoId) {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === todoId) {
          todo.done = !todo.done;
        }
        return todo;
      })
    );
  }

  // event handler for when user types
  // in the edit field
  function handleDescChange(e, todoId) {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === todoId) {
          todo.desc = e.target.value;
        }
        return todo;
      })
    );
  }

  // event handler for submit form
  // to create new todo
  function handleOnSubmit(description) {
    setTodoList([
      ...todoList,
      { desc: description, id: nextIndex, done: false },
    ]);
    setNextIndex(nextIndex + 1);
  }

  return (
    <>
      <h1>TODO LIST</h1>
      <AddTodoBar handleOnSubmit={handleOnSubmit} />
      {todoList.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          handleDeleteClick={handleDeleteClick}
          handleDoneClick={handleDoneClick}
          handleDescChange={handleDescChange}
        />
      ))}
    </>
  );
}

function AddTodoBar({ handleOnSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit(e.target[0].value);
      }}
      name="newTodoForm"
    >
      <input placeholder="Add new TODO" name="newTodo"></input>
      <input type="submit" value="Add" name="addButton"></input>
    </form>
  );
}

function TodoItem({
  todo,
  handleDeleteClick,
  handleDoneClick,
  handleDescChange,
}) {
  const [editMode, setEditMode] = useState(false);
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => handleDoneClick(todo.id)}
      ></input>
      {!editMode ? (
        <>
          <label>{todo.desc}</label>
          {"       "}
          <button type="button" onClick={() => setEditMode(true)}>
            Edit
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={todo.desc}
            onChange={(e) => handleDescChange(e, todo.id)}
          />
          <button
            type="button"
            onClick={() => {
              setEditMode(false);
            }}
          >
            Save
          </button>
        </>
      )}
      <button type="button" onClick={() => handleDeleteClick(todo.id)}>
        Delete
      </button>
    </div>
  );
}

const initialTODO = [
  { desc: "Clean Room", done: false, id: 0 },
  { desc: "Read for 15 Minutes", done: true, id: 1 },
  { desc: "Drink a cup of water", done: false, id: 2 },
];
