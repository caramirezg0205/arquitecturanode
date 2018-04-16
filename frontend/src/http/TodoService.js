import Api from '@/http/Api'

export default {
  listTodos () {
    return Api().get('todos')
  },

  addTodo (params) {
    return Api().post('todos', params)
  },

  deleteTodo (id) {
    return Api().delete('todos/' + id)
  },

  fetchTodo (params) {
    return Api().get('todos/' + params.todoId)
  },

  updateTodo (params) {
    return Api().put('todos/' + params.todoId, params)
  }
}
