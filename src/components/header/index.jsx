import React, { Component } from 'react'
import './index.less'
/* 确认弹出对话框退出的 */
import { Modal } from 'antd';

import {withRouter} from 'react-router-dom'

/* 用于取出user的引入 */
import memoryUtils from '../../utils/memoryUtils.js'
import  {removeUser} from '../../utils/srorageUtils.js'
import  {formataDate}from '../../utils/dateUtils.js'


import {reqweather} from '../../api'

/* 引入button组件*/
import LinkButton from '../../components/link-button'
 
import  menuList  from '../../config/menuConfig'
import './index.less'

/* admin头部导航组件 */   //header本身是个构造函数，也可以称作为类，组件内对象
 class Header extends Component {

 //初始化状态
 state= { //给header的实例（组件对象）添加属性
     currentime:formataDate(Date.now()),//获取的是当前时间，为字符串
     dayPictureUrl:'',//获取的是当前图片的地址
     weather:''//当前天气的文本
 }


 //退出登陆
 logout = ()=>{
     /* 1. 显示确认框，点击确认的时候退出   目的是防止用户点错，不想用户出此界面*/
     Modal.confirm({
            title: '您确定要退出吗?',
            onOk : ()=> {
              console.log('OK')
              //清除保存在local,内存中的数据
              removeUser()//user中的数据
              memoryUtils.user ={} //local中的数据
              this.props.history.replace('/login')//手动更新跳转到登陆界面             
            },
            onCancel() {
              console.log('关闭');
            },
          

     })

 }

 /* 获取天气的信息 */
 getweather = async ()=>{
     //发请求获取数据
   const {dayPictureUrl ,weather}  =  await reqweather('北京')

    //更新状态
    this.setState({
        dayPictureUrl ,weather
    })


 }

 //每隔一秒更新时间(自定义的方法都会用箭头函数 )
 showcurrentime =()=>{
     this.intervalId = setInterval(()=>{
         /* 获取当时的时候， */
        const currentime =formataDate(Date.now())
        //更新状态
        this.setState({
            currentime
        })
 
     },1000)
 }

 //得到当前请求的title请求的路径
 getTitle =()=>{
     //首先获取当前请求的路径的地址(从组件的props属性中可以读取)
     const path = this.props.history.location.pathname
     //标题为空
     let title = ''
    //从菜单中遍历每一项
     menuList.forEach((item)=>{
        //首先判断自己当前的key值是不是等于path
         if(item.key === path){
            title = item.title
         }else if(item.children){
            if(item.children){
             const Citem =  item.children.find(item =>item.key === path)
             if(Citem){
                title = Citem.title
             }
            }
         }

     })
     return title

 }

//组件销毁之前，需要做收尾工作(即为清除定时器)
  componentWillUnmount(){
    clearInterval(this.intervalId)
  }

 /* 因为更新时间会启动循环定时器，而定时器是启动异步任务 */
 componentDidMount(){
     //每隔一秒都会更新时间
     this.showcurrentime()
     //获取天气信息
     this.getweather()
 }

    render() {

        const {currentime,dayPictureUrl,weather } = this.state;
        //得到当前用户的title
        const  { user } = memoryUtils
        //得到当前请求的title请求的路径
         const title = this.getTitle()

        return (
            <div className="header">
                <div className ="header-top">
                    <span>欢迎,{user.username}</span>
                  {/*   <a href="javascript:;">退出</a> */}
                    {/* 定义的一个通用的button的看是链接的组件（调用过来的） */}
                    <LinkButton onClick = {this.logout}>退出</LinkButton>
                </div>
                
                <div className ="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentime}</span>
                        {/* 第一种写法 */}
                        {/* <img src={dayPictureUrl} alt="weather"/> */}
                     {/*第二种写法： 有值图片显示，没有值图片不显示 */}
                     {dayPictureUrl? <img src={dayPictureUrl} alt="weather"/> : null}
                        <span>{weather}</span>
                    </div>


                </div>
                
                
            </div>
        )
    }
}

export default withRouter(Header)