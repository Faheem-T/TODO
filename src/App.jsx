import { useEffect, useReducer, useRef } from "react";

import { AddTodoBar } from "./AddTodoBar";
import { TodoItem } from "./TodoItem";
import { todoReducer } from "./helpers/todoReducer";

// getting the todo list from local storage
const storedTODO = JSON.parse(localStorage.getItem("todos"));
export default function App() {
  // const [todoList, setTodoList] = useState(storedTODO);
  const [todoList, dispatch] = useReducer(todoReducer, storedTODO);
  const inputRef = useRef(null);

  // updating the local storage whenever the
  // todoList state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  // event handler for todo item delete
  function handleDeleteClick(deleteId) {
    dispatch({ type: "todo_delete", deleteId });
  }

  // event handler for marking a todo as done
  function handleDoneClick(todoId) {
    dispatch({ type: "todo_completed", todoId });
  }

  // event handler for when user types
  // in the edit field
  function handleDescChange(e, todoId) {
    dispatch({ type: "todo_changed", e, todoId });
  }

  // event handler for submit form
  // to create new todo
  function handleOnSubmit(description) {
    // clearing form on submit
    inputRef.current.reset();

    dispatch({ type: "new_todo", description });
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
