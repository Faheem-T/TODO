import { useState } from "react";

export function TodoItem({
  todo,
  handleDeleteClick,
  handleDoneClick,
  handleDescChange,
}) {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="todoItem">
      <input
        type="checkbox"
        className="todoCheck"
        checked={todo.done}
        onChange={() => handleDoneClick(todo.id)}
      ></input>
      {!editMode ? (
        <>
          {todo.done ? (
            <del>
              <label>{todo.desc}</label>
            </del>
          ) : (
            <label>{todo.desc}</label>
          )}
          {"       "}
          <button
            className="editButton"
            type="button"
            onClick={() => setEditMode(true)}
          >
            <i className="fa-solid fa-pen"></i>
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
            className="saveButton"
            type="button"
            onClick={() => {
              setEditMode(false);
            }}
          >
            <i className="fa-regular fa-floppy-disk"></i>
          </button>
        </>
      )}
      <button
        className="deleteButton"
        type="button"
        onClick={() => handleDeleteClick(todo.id)}
      >
        <i className="fa-regular fa-trash-can"></i>
      </button>
    </div>
  );
}
