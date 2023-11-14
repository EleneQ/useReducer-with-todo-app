import { ACTIONS } from "./App";

function Todo({ todo, dispatch }) {
  const toggleTodo = () => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } });
  };

  const deleteTodo = () => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } });
  };

  return (
    <div>
      <span style={{ color: todo.complete ? "red" : "#000" }}>{todo.name}</span>
      <button onClick={toggleTodo}>toggle</button>
      <button onClick={deleteTodo}>delete</button>
    </div>
  );
}

export default Todo;
