/* 通用的看似链接的一个button 组件



定义一个通用的组件，实现按钮的效果，过后可以反复调用，
因为是无状态的，可以用工厂函数方式定义
*/




import React from 'react'
import './index.less'

//props用来接收的是标签属性，是对象类型，因为里面存的是所有标签的容器
/* 
通用的看似链接的一个button组件，
props：包含所有标签属性的对象
一个组件会接收一个特别的属性：children，值为标签体，如果是空标签，就没有children
 1.字符串
 2.标签对象
 3.标签对象的数组
*/

export default function LinkButton(props){
    return <button className="link-button" {...props}/>
    }