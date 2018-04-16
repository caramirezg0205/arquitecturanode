import Api from '@/http/Api'

export default {
  listActivos () {
    return Api().get('activos/api/listactivos')
  },

  addActivo (params) {
    return Api().post('activos/api/crear', params)
  },
  deleteActivo (id) {
    return Api().delete('activos/api/eliminar/' + id)
  },
  updateActivo (params) {
    return Api().put('activos/api/actualizar/', params)
  }
}
