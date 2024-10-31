export function todoReducer(state, action) {
  switch (action.type) {
    case "todo_delete": {
      return state.filter((todo) => todo.id !== action.deleteId);
    }
    case "todo_completed": {
      const newState = state.map((todo) => {
        if (todo.id === action.todoId) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
      console.log(newState);
      return newState;
    }

    case "todo_changed": {
      return state.map((todo) => {
        if (todo.id === action.todoId) {
          todo.desc = action.e.target.value;
        }
        return todo;
      });
    }

    case "new_todo": {
      const desc = action.description;
      // form validation
      // checking if empty value
      if (!desc) return state;
      // checking for duplication
      if (state.find((todo) => todo.desc === desc)) {
        console.log("Duplicate!");
        return state;
      }
      return [...state, { desc: desc, done: false, id: state.length }];
    }
  }
}
