import React from 'react'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd'
import { Link } from 'react-router-dom'
import { browserHistory } from 'react-router'
import userApi from '../api/userAPI'
import '../style/login.css'

const FormItem = Form.Item
class NormalLoginForm  extends React.Component {
  showMessage (flag,msg){
    flag?message.success(msg):message.error(msg)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if(!err){
        if(values.userName&&values.userPassword){
          userApi.userLogin({phone:values.userName,password:values.userPassword}).then(res =>{
            if(res.data.code ===0){
              this.showMessage(true,res.data.message)
              this.props.history.push('/home')
            }else{
              this.showMessage(false,res.data.message)
            }
          })
          // this.props.history.push('/home')
        }
      }
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form
    return (
        <div className="login-box">
            <div className="login-title">用户登录</div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                  {getFieldDecorator('userName',{
                  rules:[{required:true,message:'请输入手机号'}],
                  })(
                  <Input prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />} placeholder="手机号" />
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator('userPassword',{
                  rules:[{required:true,message:'请输入密码'}],
                  })(
                  <Input type="password" prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.25)'}} />} placeholder="密码" />
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator('userCheckPwd',{
                  valuePropName:'checked',
                  initialValue:true,
                  })(
                  <Checkbox>记住密码</Checkbox>
                  )}          
                  <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                  <Link to="/forgetPwd"><b className="login-form-forgot" >忘记密码</b></Link>
                  <Link to="/register"><b  className="login-form-toregister">去注册</b></Link>
              </FormItem>
            </Form>
        </div>
    )
  }
}

const Login = Form.create()(NormalLoginForm);
export default Login;