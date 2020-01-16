import React, { useState } from "react";
import { postData } from "./components/postData";
import "./css/css.css";


function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      className="todo"
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}
function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);   
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add Todo..."
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}


function App() {
  const [todos, setTodos] = useState([]);
  React.useEffect(() =>{
     fetch("http://localhost:4000/todos")
    .then(response => response.json())
    .then(jsonStr => {
      console.log(jsonStr);
      setTodos(jsonStr);
      
    })
    .catch(error => {
      console.log("ERR");
    });
  },[]);




  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    console.log(newTodos);
    postData(newTodos);
    
  };
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
    postData(newTodos);
  };
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    postData(newTodos);
  };


  return (
    <div className="app">
      
      <div className="todo-list">
      <div className="space"></div>
      <label >Add Todo</label>
      <div className="space"></div>
        <TodoForm addTodo={addTodo} />
        <label >Todo</label>
        <div className="space"></div>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        
      </div>
    </div>
  );
}


export default App;
