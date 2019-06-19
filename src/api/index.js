/* 包含n个接口请求函数的模块，每个函数返回promise 
（接口请求函数也就是请求接口的函数）
写的时候根据接口文档编写
接口请求函数调用的是自定义的ajax请求函数发送请求，需要引入 
*/

/* fn1,fn2
暴露：统一暴露，分别暴露
//分别暴露
export function fn1(){

}
export function fn2(){
    
}
//统一暴露
export default{
    fn1(){},
    fn2(){}
} */
import jsonp from 'jsonp'
import ajax from './ajax' 
import {message} from 'antd'
/* const BASE = 'http://localhost:5000' */
const BASE =''
//1.登陆
//因为每个函数都是promise
/* 
复杂写法
export function reqLogin(username,password){
 return ajax(BASE + '/login',{username,password},'POST')
} */

/* 简写如下 */
export const reqLogin = (username,password) =>{return ajax(BASE+'/login',{username,password},'POST')}

//添加用户
export const reqAddUser = (user)=>ajax(BASE+'/manage/user/add',user,'POST')

/* 测试 */
/* reqLogin('admin','admin',).then(result =>{
    console.log('result',result)
}) */

/* 发jsonp请求获取天气的信息(需引入jsonp)，jsonp实质上是同步请求
但是本接口返回的是异步的，所以用settimeout（）包裹一下
*/
/* 发jsonp请求需要注意的是：
利用script标签发送请求，发的是普通的http请求，而不是发送ajax请求，最终获取js代码，返回的是函数调用的js代码


*/
/* 因为接口的返回值都是一个promise对象，只能返回promise才能返回异步的数据，
因外界需读取到数据（dayPictureUrl,weather） */
export const reqweather = (location)=>{
    
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve,reject)=>{

        setTimeout(()=>{

            //执行器中执行异步请求
        jsonp(url, {}, (error,data)=>{
            //判断请求是否异常
            if(!error && data.status==='success'){
                //在postman中查找数据
                const {dayPictureUrl,weather} =data.results[0].weather_data[0]
                //成功了，调用resolve（），指定成功的值
                resolve({dayPictureUrl,weather})
            }else{
                message.error('获取天气信息失败')
    
            }
        })

        },2000)
    })
   
}