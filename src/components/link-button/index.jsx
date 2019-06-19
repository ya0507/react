/* 通用的看似链接的一个button 组件



定义一个通用的组件，实现按钮的效果，过后可以反复调用，
因为是无状态的，可以用工厂函数方式定义
*/




import React from 'react'
import './index.less'

//props用来接收的是标签属性，是对象类型，因为里面存的是所有标签的容器
export default function LinkButton(props){
    return <button className="link-button" {...props}/>
    }