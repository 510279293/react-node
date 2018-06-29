import HttpUtil from '../common/HttpUtil'
const userApi = {
    getUserList () {
      let getUrl = '/users/List'
      return HttpUtil.get(getUrl)
    },
    userLogin (params){
      let getUrl = '/users/login'
      return HttpUtil.post(getUrl,params)
    },
    userRegister (params){
      let getUrl = '/users/register'
      return HttpUtil.post(getUrl,params)
    }
}
export default userApi