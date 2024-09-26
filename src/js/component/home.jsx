import React, { useState, useEffect } from "react";
// import { useParams } from "react-router";


const URL_BASE = 'https://playground.4geeks.com/todo'
const initialTask = {
	label: '',
	is_done: false
}

const initialTaskTwo = {
	label: 'TAREA MODIFICADA',
	is_done: false
}
const btnState = false
const Home = () => {
	// const [btnupdate, setbtnupdate] = useState(initialTask.is_done)
	const [task, setTask] = useState(initialTask)
	const [todos, setTodos] = useState([])

	const handleChange = (e) => {
		setTask({
			...task,
			[e.target.name]: e.target.value
		})

	}
	const addTask = async (e) => {
		try {
			if (e.key === "Enter") {
				if (task.label.trim() !== "") {
					const response = await fetch(`${URL_BASE}/todos/alyssa`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(task)
					})
					setTask(initialTask)

					if (response.status === 201) {
						getAllTask()
					}

				}
			}
		} catch (error) {
			console.log(error);

		}
	}
	const handleUpdateTask = async (item) => {
		try {
			const responde = await fetch(`${URL_BASE}/todos/${item.id}`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(initialTaskTwo)
			})
			setTask(initialTask)
		} catch (error) {
			console.log(error);
		}
	}
	const deleteTask = async (id) => {
		try {
			const response = await fetch(`${URL_BASE}/todos/${id}`, {
				method: "DELETE"
			})

			if (response.ok) {
				getAllTask()
				setTask(initialTask)

				console.log(id)
			}

		} catch (error) {
			console.log(error)
		}
	}
	const deleteAll = async () => {
		try {
			const response = await fetch(`${URL_BASE}/users/alyssa`, {
				method: "DELETE"
			})

			if (response.status === 204) {
				console.log('SE HA ELIMINADO LAS TAREAS CON SATISFACION CON SATISFACCION');
				// createUser()
				getAllTask()
			}

		} catch (error) {
			console.log(error);

		}
	}

	const createUser = async () => {
		try {
			const response = await fetch(`${URL_BASE}/users/alyssa`, {
				method: "POST"
			})

			if (response.status == 201) {
				console.log('Usuario creado');
				getAllTask()
			}

		} catch (error) {
			console.log(error);

		}

	}

	const getAllTask = async () => {
		try {
			const response = await fetch(`${URL_BASE}/users/alyssa`)
			const data = await response.json()

			if (response.status === 404) {
				createUser()

			}
			if (response.status === 200) {

				setTodos(data.todos)
			}

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		// createUser()
		getAllTask()
	}, [])

	return (
		<div className="text-center">
			<h1 className="text-center mt-5 mb-4">Todo List</h1>
			<div className="container">
				<div className="row d-flex flex-column align-items-center ">
					<form className="col-12 col-md-6 col-sm-12 mb-4" onSubmit={(e) => e.preventDefault()}>
						<input
							id="idTask"
							className="form-control form-control-lg"
							type="text"
							placeholder="Add task"
							aria-label=".form-control-lg example"
							name="label"
							value={task.label}
							onChange={handleChange}
							onKeyDown={addTask}

						/>
					</form>
					<div className="col-12 col-md-6">
						<ul className="list-group text-start">
							{
								todos.map((item) => {
									return (
										<li key={item.id} className="list-group-item">
											{item.label}
											<div className="button-crud">
												{/* onClick={() => handleUpdateTask(item)} */}
												{/* <button type="button" className="btn btn-primary me-1  "  >
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
														<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"></path>
													</svg>
												</button> */}
												<button type="button" className="btn btn-outline-danger" onClick={() => deleteTask(item.id)}>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
														<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"></path>
													</svg>
												</button>
											</div>
										</li>

									)

								})
							}
							<li
								className="list-group-item  "
								style={{ height: "50px" }}
							>
								<p className="align-middle">{todos.length === 0 ? "No items" : `${todos.length} items left`}</p>
								<button type="button" className="btn btn-danger btn-sm" onClick={() => deleteAll()}>Delete all</button>
							</li>
						</ul>

						<div className="col-12 text-start list-group-item">
						</div>

					</div>
				</div>

				<div className="row">

				</div>

			</div>

		</div >
	);
};

export default Home;
