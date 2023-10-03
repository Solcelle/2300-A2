import React from 'react'

export default function Todo({ todo, toggleTodo, deleteTodo }) {
	function handleClick() {
		toggleTodo(todo.id)
	}

	function handleDelete() {
		deleteTodo(todo.id)
	}

	return (
		<label>
			<input className='Checkbox' type='checkbox' checked={todo.done} onChange={handleClick}/>
			
			{todo.name}

			<button className='Delete' onClick={handleDelete}>
				X
			</button>
		</label>
	)
}
