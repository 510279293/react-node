import HttpUtil from '../common/HttpUtil'
const userApi = {
    getUserList () { //获取用户列表
      let getUrl = '/users/List'
      return HttpUtil.get(getUrl)
    },
    userLogin (params){ //用户登录
      let getUrl = '/users/login'
      return HttpUtil.post(getUrl,params)
    },
    userRegister (params){ //用户注册
      let getUrl = '/users/register'
      return HttpUtil.post(getUrl,params)
    },
    userUpdatePwd (params){ //忘记密码
      let getUrl = '/users/updatePwd'
      return HttpUtil.post(getUrl,params)
    }
}
export default userApi