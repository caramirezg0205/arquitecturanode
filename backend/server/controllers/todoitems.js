const TodoItem = require('../models').TodoItem;

module.exports = {
	create(req, res) {
		return TodoItem
			.create({
				content: req.body.content,
				todoId: req.params.todoId,
			})
			.then(todoItem => res.status(201).send(todoItem))
			.catch(error => res.status(400).send('Create TodoItem error: ', error));
	},

	update(req, res) {
		return TodoItem
			.find({
				where: {
					id: req.params.todoItemId,
					todoId: req.params.todoId,
				},
			})
			.then(todoItem => {
				if (!todoItem) {
					res.status(404).send({
						message: 'TodoItem Not Found',
						data: req.body
					});
				}
				todoItem
					.update( req.body, {
						fields: Object.keys(req.body)
					})
					.then(updatedTodoItem => res.status(200).send(updatedTodoItem))
					.catch(error => res.status(400).send('Todo Update error: ', error));
			})
			.catch(error => res.status(400).send('Todo Update Find By Id error: ', error));
	},

	destroy(req, res) {
		console.log('REQ? ', req)
		return TodoItem
			.find({
				where: {
					id: req.params.todoItemId,
					todoId: req.params.todoId,
				},
			})
			.then(todoItem => {
				if (!todoItem) {
					return res.status(404).send({
						message: 'TodoItem Not Found',
						data: req.body,
					})
				}
				todoItem
					.destroy()
					.then(() => res.status(204).send({
						message: 'TodoItem Deleted Successfully',
						data: req.body
					}))
					.catch(error => res.status(400).send('TodoItem Destroy error: ', error));
			})
			.catch(error => res.status(400).send('TodoItem Destroy Find By Item error: ', error))
	}
};