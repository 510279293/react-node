import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { browserHistory } from 'react-router'
import userApi from '../api/userAPI'
import '../style/login.css'

const FormItem = Form.Item
class NormalLoginForm  extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if(!err){
        if(values.userName&&values.userPassword){
          userApi.getUserList().then(res =>{
            console.log(res)
          })
          // this.props.history.push('/home')
        }
      }
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
    return (
        <div className="login-box">
            <div className="login-title">忘记密码</div>
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
                  {getFieldDecorator('userConfirmPwd',{
                  rules:[{required:true,message:'请再次输入密码'}],
                  })(
                  <Input type="password" prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.25)'}} />} placeholder="确认密码" />
                  )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                >
                <Row gutter={8}>
                    <Col span={12}>
                    {getFieldDecorator('captcha', {
                        rules: [{ required: true, message: '请输入验证码!' }],
                    })(
                        <Input />
                    )}
                    </Col>
                    <Col span={12}>
                    <Button>获取验证码</Button>
                    </Col>
                </Row>
                </FormItem>
              <FormItem>
                  {getFieldDecorator('userCheckPwd',{
                  valuePropName:'checked',
                  initialValue:true,
                  })(
                  <Checkbox>记住密码</Checkbox>
                  )}          
                  <Button type="primary" htmlType="submit" className="login-form-button">确定</Button>
                  <Link to="/"><a className="login-form-forgot" href="">登录</a></Link>
                  <Link to="/register"><a href="" className="login-form-toregister">去注册</a></Link>
              </FormItem>
            </Form>
        </div>
    )
  }
}

const Login = Form.create()(NormalLoginForm);
export default Login;