export function AddTodoBar({ handleOnSubmit, inputRef }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit(e.target[0].value);
      }}
      name="newTodoForm"
      className="newTodoForm"
      ref={inputRef}
    >
      <input placeholder="Create TODO" name="newTodo"></input>
      <button type="submit" value="Add" name="addButton">
        <i className="fa-solid fa-plus"></i>
      </button>
    </form>
  );
}
