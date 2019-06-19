import React from 'react'
import { Form, Icon, Input,Button,message} from 'antd'
import {Redirect} from 'react-router-dom'

import logo from "./imags/logo.png";
import './login.less'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import {saveUser} from '../../utils/srorageUtils'

const Item = Form.Item


 class Login extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault()
    /* alert('提交成功') */


    /* 统一收集所有的表单的验证*/
    this.props.form.validateFields(async(err,values)=>{
      if(!err){
        /* console.log('登陆成功',values) */


        /* 利用reqLogin发送请求 */
        const {username,password} = values
        const result = await reqLogin(username,password)


         //如果登陆成功（成功的状态是0）｛请求成功不一定代表登陆成功｝
        if(result.status ===0){//登陆成功的状态
          //保存用户的信息
          const user = result.data
       /*    localStorage.setItem('USER-KRY',JSON.stringify(user))//保存在文件中 */
            saveUser(user) //保存user
             memoryUtils.user =user
          //跳转到admin界面
          this.props.history.replace('/')
        }else {
          //登陆失败(2是延迟时间（duration）)
          message.error(result.msg,2)
        }
      }
    })


   /*  //收集所有的数据
    const username = this.props.form.getFieldValue('username')
    const password = this.props.form.getFieldValue('password')
    const values = this.props.form.getFieldsValue('username')
    console.log(username,password,values) */

  }
  /* 自定义验证密码
  1). 必须输入
  2). 必须大于等于4位
  3). 必须小于等于12位
  4). 必须是英文、数字或下划线组成
  */
 validatePwd = (rule,value ='',callback)=>{
    if(!value){
    callback('请输入密码')
    }else if(value.length<4){
      callback('密码长度不能小于4位')
    }else if(value.length>12){
      callback('密码长度不能大于12位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    }else {//验证通过
      callback()
    }
 }



  render () {

    const { getFieldDecorator } =this.props.form
    //访问login界面，如果已登录(说明用户的信息已保存，也就是已经存在)，可以自动跳转到admin界面
    if(memoryUtils.user._id) {
      return <Redirect to="/"/>
    }
      
    

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              { getFieldDecorator('username',{//配置对象（options）
              // 指定初始值为空串
               initialValue: '',
                //声明式验证:使用已有规则验证
                rules:[
                  {required:'true',whitespace:'true',message:'请输入用户名'},
                  {min:4,message:'用户名不小于4位'},
                  {max:12,message:'用户名不大于12位'},
                  {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'}
                ]
              })(<Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />)}
              
            </Item>
            <Form.Item>
              {getFieldDecorator('password',{
                rules:[
                  { validator: this.validatePwd}

                ]
              })(<Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />)}
              
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登 陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

const WapperLogin = Form.create()(Login);
export default WapperLogin;