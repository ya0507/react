import React from 'react'
import ReactDOM from 'react-dom'

import App from './App' 
import {getUser} from '../src/utils/srorageUtils'
import memoryUtils from '../src/utils/memoryUtils'

import './api'


//读取local中数据保存user，缓存到内存中
const user =getUser() 
memoryUtils.user = user


ReactDOM.render( < App /> , document.getElementById('root'))


