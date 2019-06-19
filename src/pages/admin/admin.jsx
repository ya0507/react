import React from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import { Layout } from 'antd';



import memoryUtils  from '../../utils/memoryUtils.js'
/* 引入组件中头部组件 */
import AdminHeader from '../../components/header' //(默认暴露的时候名字是可以自己改的)
/*  引如组件中左侧导航组件*/
import   Leftnav from '../../components/leftnav'



import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Header, Footer, Sider, Content } = Layout;

/* 后台管理的一级路由组件 */
export default class Admin extends React.Component{

    render(){

        const user =memoryUtils.user
        /* 如果用户当前没有登陆，内存中的user没有id */
        if(!user._id){
            /* this.props.history.replace('/login')  此时不需要有返回值，只是跳转界面，所有不用return */
            return  <Redirect to="/login"/>//因跳转界面，重定向标签需要  渲染return出去
        }

        return(
                <Layout style={{height:'100%'}}>

                    <Sider>
                        {/* 左侧导航组件 */}
                         <Leftnav/>     
                    </Sider>
                   <Layout>                      
                        {/* 头部组件 */}
                        <AdminHeader/> 
                        {/* 内容区域包含几种组件 */}                      
                        <Content style={{backgroundColor:'white',margin:'20px'}}>
                            {/* 注册路由（路由都是用switch包着） */}
                            <Switch>
                                <Route path='/home' component={Home}></Route>
                                <Route path='/Category' component={Category}></Route>
                                <Route path='/Product' component={Product}></Route>
                                <Route path='/Role' component={Role}></Route>
                                <Route path='/User' component={User}></Route>
                                <Route path='/Bar' component={Bar}></Route>
                                <Route path='/Line' component={Line}></Route>
                                <Route path='/Pie' component={Pie}></Route>
                                <Redirect to="/home"/>
                            </Switch>
                         </Content>
                        <Footer style={{textAlign:'center',color:'#aaa'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                  </Layout>
                </Layout>
        )
    }
}