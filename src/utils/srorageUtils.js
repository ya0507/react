import store from 'store'



/* 保存 user*/
export function saveUser(user){
    //第一种：localStorage.saveItem('USER-KEY',JSON.stringify(user))
    store.set('USER-KEY',user)
}

/* 读取user */
export function getUser(){
    // return JSON.parse(localStorage.getItem('USER-KEY') || '{}')
 return store.get('USER-KEY') || {}
}

/* 删除user */
export function removeUser(){
    store.remove('USER-KEY')
}