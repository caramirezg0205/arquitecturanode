import Api from '@/http/Api'

export default {
  authenticate (params) {
    return Api().post('api/authenticate', params)
  }
}
