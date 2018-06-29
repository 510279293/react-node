import React from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
import { Link } from 'react-router-dom'
import '../style/register.css'
import userApi from '../api/userAPI'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  showMessage (flag,msg){
    flag?message.success(msg):message.error(msg)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        let params = {name:values.userName,password:values.password,nickname:values.nickname,phone:values.phone}
        userApi.userRegister(params).then(res => {
          if(res.data.code ===0){
            this.showMessage(true,res.data.message)
            this.props.history.push('/login')
          }else{
            this.showMessage(false,res.data.message)
          }
        })
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
//   handleWebsiteChange = (value) => {
//     let autoCompleteResult;
//     if (!value) {
//       autoCompleteResult = [];
//     } else {
//       autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
//     }
//     this.setState({ autoCompleteResult });
//   }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    // const websiteOptions = autoCompleteResult.map(website => (
    //   <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    // ));

    return (
        <div className="register-form">
            <div className="register-title"><span>用户注册</span></div>
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                {...formItemLayout}
                label="用户名"
                >
                {getFieldDecorator('userName', {
                    rules: [{
                    required: true, message: '请输入用户名!',
                    }],
                })(
                    <Input />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="密码"
                >
                {getFieldDecorator('password', {
                    rules: [{
                    required: true, message: '请输入密码!',
                    }, {
                    validator: this.validateToNextPassword,
                    }],
                })(
                    <Input type="password" />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="确认密码"
                >
                {getFieldDecorator('confirm', {
                    rules: [{
                    required: true, message: '请再次输入密码!',
                    }, {
                    validator: this.compareToFirstPassword,
                    }],
                })(
                    <Input type="password" onBlur={this.handleConfirmBlur} />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label={(
                    <span>
                    昵称&nbsp;
                    <Tooltip title="What do you want others to call you?">
                        <Icon type="question-circle-o" />
                    </Tooltip>
                    </span>
                )}
                >
                {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                })(
                    <Input />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="手机号"
                >
                {getFieldDecorator('phone', {
                    rules: [{ required: true, message: '请输入手机号码!' }],
                })(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="验证码"
                extra="We must make sure that your are a human."
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
                <FormItem {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                })(
                    <Checkbox>我已阅读并同意 <a href="javascript:;">《XXXX》</a></Checkbox>
                )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">注册</Button>
                <Link to='/forgetPwd'><a className="login-form-forgot" href="">忘记密码</a></Link>
                <Link to="/"><a href="" className="login-form-toregister">去登录</a></Link>
                </FormItem>
            </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default WrappedRegistrationForm;