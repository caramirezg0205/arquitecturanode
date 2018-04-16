import Api from '@/http/Api'

export default {

  addItem (params) {
    return Api().post('todos/' + params.todoId + '/items/', params)
  },

  updateItem (params) {
    return Api().put('todos/' + params.todoId + '/items/' + params.itemId, params)
  },

  deleteItem (params) {
    return Api().delete('todos/' + params.todoId + '/items/' + params.itemId)
  }
}
