import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col, message } from 'antd'
import { Link } from 'react-router-dom'
import { browserHistory } from 'react-router'
import userApi from '../api/userAPI'
import '../style/login.css'

const FormItem = Form.Item
class NormalLoginForm  extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  showMessage (flag,msg){
    flag?message.success(msg):message.error(msg)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if(!err){
        console.log(values)
        if(values.phone&&values.userPassword){
          userApi.userUpdatePwd({phone:values.phone,password:values.userPassword}).then(res =>{
            if(res.data.code == 0){
              this.showMessage(true,res.data.message)
              this.props.history.push('/')
            }else{
              this.showMessage(false,res.data.message)
            }
          })
          // this.props.history.push('/home')
        }
      }
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['userConfirmPwd'], { force: true });
    }
    callback();
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('userPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
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
                  {getFieldDecorator('phone',{
                  rules:[{required:true,message:'请输入手机号'}],
                  })(
                  <Input prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />} placeholder="手机号" />
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator('userPassword',{
                  rules:[{required:true,message:'请输入密码'},{validator: this.validateToNextPassword,}],
                  })(
                  <Input type="password" prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.25)'}} />} placeholder="密码" />
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator('userConfirmPwd',{
                  rules:[{required:true,message:'请再次输入密码'},{validator: this.compareToFirstPassword,}],
                  })(
                  <Input type="password" prefix={<Icon type="lock" style={{color:'rgba(0,0,0,.25)'}} />} placeholder="确认密码" onBlur={this.handleConfirmBlur} />
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
                  <Link to="/"><b className="login-form-forgot" >登录</b></Link>
                  <Link to="/register"><b className="login-form-toregister">去注册</b></Link>
              </FormItem>
            </Form>
        </div>
    )
  }
}

const Login = Form.create()(NormalLoginForm);
export default Login;