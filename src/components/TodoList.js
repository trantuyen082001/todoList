import React, {useState} from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';

const TodoList = () => {

    const [todos, setTodos] = useState(() => {
        const storageTodos = JSON.parse(localStorage.getItem('todos'))
        return storageTodos;
    });

    const addTodo = (todo) => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        const newTodos = [todo, ...todos];

        // save to localstorage
        const jsonTodos = JSON.stringify(newTodos)
        localStorage.setItem('todos', jsonTodos)

        setTodos(newTodos);
    }

    const updateTodo = (todoId, newValue) => {
      if(!newValue.text || /^\s*$/.test(newValue.text)) {
        return;
      }
      setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }

    const removeTodo = (id) => {
      const removeArr = [...todos].filter((todo) => todo.id !== id);
      console.log(removeArr);
      setTodos(removeArr)
    }

    const completeTodo = (id) => {
      let updateTodos = todos.map((todo) => {
        if(todo.id === id) {
          todo.isComplete = !todo.isComplete;
        } 
        return todo;
      });
      setTodos(updateTodos)
    };

  return (
    <div>
        <h1>Hôm nay bạn có gì không?</h1>
        <TodoForm onSubmit={addTodo}/>
        <Todo 
          todos={todos} 
          completeTodo={completeTodo} 
          removeTodo={removeTodo}
          updateTodo={updateTodo}
          />
    </div>
  )
}

export default TodoList