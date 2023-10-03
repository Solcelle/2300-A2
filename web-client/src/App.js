import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoList from './TodoList'

const RequestForm = () => {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()

  useEffect(() => {

	axios.get('http://localhost:5000/api/items/')
      .then(response => {
        setTodos(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });


	// const prevTodos = getrequest
	// setTodos()
  	}, [])

  function toggleTodo(id) {
	const newTodos = [...todos]
	const todo = newTodos.find(todo => todo.id === id)
	todo.done = !todo.done
	setTodos(newTodos)
  }

  const handleSubmit = async (e) => {
	e.preventDefault();

	const name = todoNameRef.current.value
	if (name === '') return

	const requestBody = JSON.stringify({ name });

	const response = await fetch('http://localhost:5000/api/items/', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		'Content-Length': requestBody.length,
	  },
	  body: requestBody,
	});
	const data = await response.json();

	todoNameRef.current.value = null	// Clear input field

	// Handle the response data
	setTodos(prevTodos => {
		return [...prevTodos, data.item]
	})
	console.log(todos);
  };
  
  return (
	<div className="App">
		<header className="App-header">
			Todo List

			<form onSubmit={handleSubmit}>
				<input
					ref={todoNameRef}
					type="text"
				/>
				<button type="submit">Add</button>
			</form>
			<TodoList todos={todos} toggleTodo={toggleTodo}/>

		</header>
	</div>
  );
};

export default RequestForm;


// function App() {
// 	const [todos, setTodos] = useState([])
// 	return (
// 		<div className="App">
// 			<header className="App-header">

// 				<TodoList />
// 				<input type="text" />
// 				<button>Add</button>
// 				<button>Remove</button>
				

// 			</header>
// 		</div>
// 	);
// }

// export default App;
