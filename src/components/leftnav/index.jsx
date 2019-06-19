import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.less'
/* 引入logo图片 */
import logo from '../../assets/images/logo.png'
/* 从ant d中查找（menu菜单中查询） */
import { Menu, Icon} from 'antd';

/* 引入菜单配置 menuList(从中可以发现得到的是个数组)*/ 
import menuList from '../../config/menuConfig.js'   // [<Item/>, <SubMenu/>>]
//在react中，根据数据的数组生成标签的数组

const { SubMenu ,Item }  = Menu

/* admin左侧导航组件 */  //LeftNav并不是个路由组件
 class LeftNav extends Component {

  /* 
  根据menu中数据中数组生成包含<Item> / <SubMenu>的数组
  关键技术: array.map() + 递归调用
  */


   /* 
    {
      title: '首页', // 菜单标题名称
      key: '/home', // 对应的path
      icon: 'home', // 图标名称
      children: []
    }
    */

 getMenusNodes = (menuList)=>{

  const path = this.props.location.pathname
  /* 返回的是一个数组 */
  return menuList.map(item => {
    //需要判断为那个标签（<Item>，<SubMenu>）有children的是<SubMenu>，没有的是<Item>
    if(!item.children){
      return (
         <Item key={item.key}>
           <Link to = {item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>             
              </Link>
         </Item>
              
      )
    }else{ // 返回<SubMenu></SubMenu>
      // 如果请求的是当前item的children中某个item对应的path, 当前item的key就是openKey｛item是数据，Item是标签｝
        const cItem = item.children.find((cItem, index) => cItem.key===path)
         // 当前请求的是某个二级菜单路由
        if (cItem) {
          this.openKey = item.key
        }


      return (
        <SubMenu
        key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }       
        >
           {
              this.getMenusNodes(item.children)
            }
        </SubMenu>

      )
    }

  })

}


/* reduce方法 */




// 在第一次render()之后
  // componentDidMount () {
  // 在第一次render()之前
  componentWillMount () {
    this.menuNodes = this.getMenusNodes(menuList)
  }

    render() {

      //将请求的路由路径作为请求的路径(selectedKey是menu的属性）
      //所有的路由组件都会接收是三个属性｛history，location，math｝
      //因为LeftNav不是路由组件，所以通过高阶组件withRouter封装，来读取其中的数据
      const selectedKey = this.props.location.pathname  
      
      //得到要展开的submenu的key值
      const openkey = this.openkey


        return (
            <div className="left-nav">
                {/* 点击logo的时候跳转home主页 */}
                <Link to="/home"  className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>


                <Menu
                   mode="inline"//模式
                   theme="dark"   
                   selectedKeys={[selectedKey]}     //默认选中的首页路径    
                   defaultOpenKeys ={ [openkey]}      //默认展开    
        >

          {
           this.menuNodes//动态的添加标签的数组
          }


        {/* 点击时跳转到home主页，所以用link链接  以下代码需要动态的设置*/}
         {/*  <Menu.Item key="/home">           
              <Link>
                <Icon type="home" />
                <span>首页</span>             
              </Link>            
          </Menu.Item>
          
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >          
           
           <Item key="/category">
             <Link to="/category">
                <Icon type="home" />
                <span>品类管理</span>   
             </Link>
           </Item>
           <Item key="/product">
             <Link to="/product">
                <Icon type="home" />
                <span>商品管理</span>   
             </Link>
           </Item>

          </SubMenu> */}

        </Menu>
            
      </div>
        )
    }
}
/* 
向外暴露是通过withRouter包装LeftNav产生新组件
新组件会向非路由组件传递3个属性: history/location/match => 非路由组件也可以使用路由相关语法
withRouter是一个高阶组件
*/
export default withRouter(LeftNav)
