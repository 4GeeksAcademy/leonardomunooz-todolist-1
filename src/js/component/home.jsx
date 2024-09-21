import React, { useState, useEffect } from "react";


const URL_BASE = 'https://playground.4geeks.com/todo'
const initialTask = {
	label: '',
	is_done: false
}
const Home = () => {

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

	const getAllTask = async () => {
		try {
			const response = await fetch(`${URL_BASE}/users/alyssa`)
			const data = await response.json()

			if (response.status === 200) {
				setTodos(data.todos)
			}

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getAllTask()
	}, [])

	return (
		<div className="text-center">
			<h1 className="text-center mt-5 mb-4">Todo List</h1>
			<div className="container">
				<div className="row d-flex flex-column align-items-center ">
					<form className="col-12 col-md-6 col-sm-12 mb-4" onSubmit={(e) => e.preventDefault()}>
						<input
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
											<button type="button" className="btn btn-outline-danger">
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
													<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"></path>
												</svg>
											</button>
										</li>

									)


								})


							}
							<li
								className="list-group-item px-3 "
								style={{ height: "35px" }}
							>
								<p className="align-middle">4 items left</p>
							</li>
						</ul>

						<div className="col-12 text-start list-group-item">
						</div>

					</div>
				</div>

				<div className="row">

				</div>

			</div>

		</div>
	);
};

export default Home;
