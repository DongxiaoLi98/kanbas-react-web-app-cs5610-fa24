import React, { useState } from "react";
import { useSelector } from "react-redux";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todosReducer);

    {/*const [todos, setTodos] = useState(
        [
            { id: "1", title: "Learn React" },
            { id: "2", title: "Learn Node"  }
        ]
    )
    const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });
    const addTodo = (todo : any) => {
        const newTodos = [
            ... todos, 
            {
                ...todo,
                id: new Date().getTime().toString()
            }
        ];

        setTodos(newTodos);
        setTodo({id: "-1", title:""});
    };

    const deleteTodo = (id: string) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    const updateTodo = (todo: any) => {
        const newTodos = todos.map((item) =>
          (item.id === todo.id ? todo : item));
        setTodos(newTodos);
        setTodo({id: "-1", title: ""});
    }; */}
    
    return (
        <div>
            <h2> Todo List </h2>
            <ul className = "list-group col-3">

            
            <TodoForm />
            {todos.map((todo: any) => (
                <TodoItem todo={todo} />
            ))}

            {/*<TodoForm
                todo={todo}
                setTodo={setTodo}
                addTodo={addTodo}
                updateTodo={updateTodo}/>

            {todos.map((todo) => (
                <TodoItem
                    todo={todo}
                    deleteTodo={deleteTodo}
                    setTodo={setTodo} />
                ))}*/}


            {/*
                <li className = "list-group-item">
                    <button onClick = {() => addTodo(todo)} id="wd-add-todo-click"
                        className = "float-end btn btn-success me-1">
                        Add
                    </button>
                    <button onClick={() => updateTodo(todo)} id="wd-update-todo-click"
                        className = "float-end btn btn-warning me-1">
                        Update 
                    </button>
                    <input value={todo.title}
                        onChange={(e)=> setTodo({ ...todo, title: e.target.value })}/>
                </li>

                {
                    todos.map((todo) => (
                        <li key={todo.id} className="list-group-item">
                            <button onClick={() => deleteTodo(todo.id)}
                                id="wd-delete-todo-click"
                                className = "float-end btn btn-danger me-1">
                                Delete </button>
                                <button onClick={() => setTodo(todo)}
                                        id="wd-set-todo-click"
                                        className = "float-end btn btn-primary me-1">
                                Edit </button>
                                {todo.title}
                        </li>
                    ))
                }*/}

            </ul>
        </div>

    );
}