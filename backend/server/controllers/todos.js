const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
	create(req, res) {
		return Todo
			.create({
				title: req.body.title,
			})
			.then(todo => res.status(201).send(todo))
			.catch(error => res.status(400).send('Todo Create error: ', error));
	},

	list(req, res) {
		return Todo
			.findAll({
				include: [{
					model: TodoItem,
					as: 'todoItems',
				}]
			})
			.then(todos => res.status(200).send(todos))
			.catch(error => res.status(400).send('Todo List error: ', error));
	},

	retrieve(req, res) {
		return Todo
			.findById(req.params.todoId, {
				include: [{
					model: TodoItem,
					as: 'todoItems',
				}],
			})
			.then(todo => {
				if (!todo) {
					return res.status(404).send({
						message: 'Todo Not Found',
						data: req.body,
					})
				}
				return res.status(200).send(todo);
			})
			.catch(error => res.status(400).send('Todo Retrieve error: ', error));
	},

	update(req, res) {
		return Todo
			.findById(req.params.todoId, {
				include: [{
					model: TodoItem,
					as: 'todoItems',
				}],
			})
			.then(todo => {
				if(!todo) {
					res.status(404).send({
						message: 'Todo Not Found',
						data: req.body,
					})
				}
				return todo
					.update(req.body, {
						fields: Object.keys(req.body)
					})
					.then(() => res.status(200).send(todo))
					.catch(error => res.status(400).send('Todo Update error: ', error));
			})
			.catch(error => res.status(400).send('Todo Find By Id error: ', error));
	},

	destroy(req, res) {
		return Todo
			.findById(req.params.todoId)
			.then(todo => {
				if (!todo) {
					res.status(400).send({
						message: 'Todo Not Found',
					});
				}
				return todo
					.destroy()
					.then(() => res.status(204).send({
						message: 'Todo Destroyed',
						data: req.body
					}))
					.catch(error => res.status(400).send('Todo Destroy error: ', error));
			})
			.catch(error => res.status(400).send('Todo Destroy Find By Id error: ', error));
	},
};