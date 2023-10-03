import React from 'react'

export default function Todo({ todo, toggleTodo }) {
	function handleClick() {
		toggleTodo(todo.id)
	}

	return (
		<div>
			<label>
			<input type='checkbox' checked={todo.done} onChange={handleClick}/>
			{todo.name}
			</label>
		</div>
	)
}
