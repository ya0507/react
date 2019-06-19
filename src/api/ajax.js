/*通用的能发任何的ajax请求(返回的是一个promise函数) 
  
真正发请求用的是axios库，并且引入axios库
*/

import axios from 'axios'


export default  function ajax(url,data={},method="GET"){

return new Promise ((resolve,reject)=>{
    let Promise
//1.执行异步ajax请求（使用axios发送异步请求）
    //发get请求
    if(method==='GET'){
         Promise = axios.get(url,{
            params:data
        })
    }else {
        //发post请求
         Promise = axios.post(url,data)
    }
    /* 统一处理promise,统一指定成功或者失败的回调 */
    Promise.then(
        //2.如果成功的话，调用resolve（），并指定成功的数据
        response =>{
            /* 调用resolve是让new中的promise成功 */
            resolve(response.data)
        },
        /* 3.如果失败的话，不用调用reject（）
         ｛如果调用了reject（），外面还是得用try，catch处理异常｝，
          显示错误的提示 */
        error =>{
            alert('请求出错：'+error.message)
        }      
    )

})
   
}

/* 定义一个请求登录的函数
得到的是promise函数，（通过.then得到成功或失败的回调）最终通过await，async简化

*/
async function login(){

    /* 通过response得到成功的响应对象 但是如果失败的话就要用try，catch来处理请求的异常*/
   /* try {
    const response = await ajax('/login',{username:'admin',password:'admin'},'POST')
   }catch(error){
       //处理请求异常
       alert ('请求出错：'+error.message) 
   } */

   /* 因为不管发任何的请求（不一定只有登陆,注册的请求），
   都要用try catch（处理请求的成功或者失败），有些重复的 
   不管发任何的请求，都需要有个提示的信息
   */
  
  /* 这种情况下，就需要优化代码
  1.统一处理请求的异常=====》目的是：发任意ajax请求，不再需要另外处理请求异常
  2.异步请求成功的数据不再是response，而是response.data的值=====》请求成功得到的就是data数据
  */

 
 /**
  * response代表的是一个响应对象（包含了整个响应，及相关数据的对象），
  * 而服务器返回给浏览器的不是只有响应体数据，它只是响应中的一部分 
  * const response =await ajax('/login',{
    username:'admin',password:'admin'
    },'POST')
    const result = response.data//必须从response取出data属性值才是响应的数据
    //成功的状态 
    if(result.status===0){

    }else {

    } 
  */
 
 
 const result =await ajax('/login',{
    username:'admin',password:'admin'
   },'POST')
  
  /*成功的状态 */
  if(result.status===0){

  }else {

  }
    
}

