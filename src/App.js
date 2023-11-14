import { useReducer, useState } from "react";
import Todo from "./Todo";

//this is a global, non-changin variable
const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo"
};

/* 
  The 'reducer' function specifies how the state should
  change in response to different actions.

  useReducer isn't really useful for small-scale
  applications; but, with bigger sites, it's useful
  because it provides a centralized, pre-defined way
  of changing state.
*/
function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return toggleTodo(todos, action.payload.id);
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

function toggleTodo(todos, id) {
  return todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, complete: !todo.complete };
    }
    return todo;
  });
}

function newTodo(name) {
  return { id: Date.now(), name, complete: false };
}

export default function App() {
  const [name, setName] = useState("");
  /*
    dispatch(action) is what calls the reducer function.

    'todos' is an array. The 'todos' array itself is what
    changes when state updates.

    'reducer' is the function that performs state changes based
    on the action you provide to it.
  */
  const [todos, dispatch] = useReducer(reducer, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: ACTIONS.ADD_TODO, payload: { name } });
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      {todos.map((todo) => {
        /* 
          Instead of having to define a bunch of different functions
          for editing, deleting, creating todos, etc., we use a single
          reducer function. Different action types and parameters 
          (payload properties) are passed to the reducer, and we call
          the reducer using the dispatch() function. So, instead of
          having to pass a bunch of different function props to the
          <Todo />, we're passing just the dispatch() func, which makes
          our code much cleaner and more centralized.
        */
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </div>
  );
}

export { ACTIONS };
