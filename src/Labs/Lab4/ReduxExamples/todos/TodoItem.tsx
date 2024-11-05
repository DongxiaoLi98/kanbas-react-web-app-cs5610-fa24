import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({todo}:any) {
    const dispatch = useDispatch();

    return (
      <li key={todo.id} className="list-group-item">
        <button onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"
                className = "float-end btn btn-danger me-1"> Delete </button>
        <button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"
                className = "float-end btn btn-primary me-1"> Edit </button>
        {todo.title}    </li>);}
  
  