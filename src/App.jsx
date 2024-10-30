import { useEffect, useRef, useState } from "react";

import { AddTodoBar } from "../AddTodoBar";
import { TodoItem } from "../TodoItem";

export default function App() {
  // getting the todo list from local storage
  const storedTODO = JSON.parse(localStorage.getItem("todos"));

  // getting the initial index from the last item in local storage
  const initialNextIndex = storedTODO.at(-1).id + 1;

  const [todoList, setTodoList] = useState(storedTODO);
  const [nextIndex, setNextIndex] = useState(initialNextIndex);
  const inputRef = useRef(null);

  // updating the local storage whenever the
  // todoList state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  // event handler for todo item delete
  function handleDeleteClick(deleteId) {
    setTodoList(todoList.filter((todo) => todo.id !== deleteId));
  }

  // event handler for marking a todo as done
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
    // clearing form on submit
    inputRef.current.reset();

    // form validation
    // checking if empty
    if (!description) return;
    // checking for duplication
    if (todoList.find((todo) => todo.desc === description)) {
      console.log("Duplicate!");
      return;
    }
    setTodoList([
      ...todoList,
      { desc: description, done: false, id: nextIndex },
    ]);
    setNextIndex(nextIndex + 1);
  }

  return (
    <>
      <h1>TODO LIST</h1>
      <div className="container">
        <AddTodoBar handleOnSubmit={handleOnSubmit} inputRef={inputRef} />
        {todoList.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleDeleteClick={handleDeleteClick}
            handleDoneClick={handleDoneClick}
            handleDescChange={handleDescChange}
          />
        ))}
      </div>
    </>
  );
}
