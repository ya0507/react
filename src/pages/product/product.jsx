import React, { Component } from 'react'
/* 引入商品下的子路由 */
import {Switch,Route,Redirect} from 'react-router-dom'
import productAddUpDate from './add-update'
import  productDetails from './details'
import productHome from './home'

/**
 * 商品管理(二级路由)
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        {/* exact：相当于是地址栏的地址与此单词所在的路径必须是完全匹配 */}
        <Route path="/product" component={productHome} ></Route>
        <Route path="/product/details" component={productDetails}></Route>
        <Route path="/product/addupdate" component={productAddUpDate}></Route>         
        <Redirect to="/product"></Redirect>
      </Switch>
    )
  }
}
