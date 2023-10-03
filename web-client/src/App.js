import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoList from './TodoList'

function App () {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()

	// GET todo list when client starts
	useEffect(() => {
		axios.get('http://localhost:5000/api/items/')
			.then(response => {
				setTodos(response.data.items);
				console.log('GET request successful', response.data);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	}, [], todos)

	// Send a PUT request
	const handlePutRequest = (request) => {
		const url = `http://localhost:5000/api/items/${request.id}`;

		axios.put(url, request)
			.then(response => {
				console.log('PUT request successful', response.data);
			})
			.catch(error => {
				console.error('Error making PUT request:', error);
			});
	};

	// Send a DELETE request
	const handleDeleteRequest = (id) => {
		const url = `http://localhost:5000/api/items/${id}`;

		axios.delete(url)
			.then(response => {
				console.log('DELETE request successful', response.data);
			})
			.catch(error => {
				console.error('Error making DELETE request:', error);
			});
	};

	function deleteTodo(id) {
		const newTodos = todos.filter(todo => todo.id !== id);

		// Update server entry
		handleDeleteRequest(id)

		// Update todolist
		setTodos(newTodos)
	}

	// Update done status of a todo
  	function toggleTodo(id) {
		const newTodos = [...todos]							// Create copy of todos
		const todo = newTodos.find(todo => todo.id === id)	// Find todo with the id
		todo.done = !todo.done								// Update done status

		// Update server entry
		handlePutRequest(todo)

		// Update todolist
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
			<p className="Todo-list">
				<TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
			</p>

		</header>
	</div>
  );
};

export default App;


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
