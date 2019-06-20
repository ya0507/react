import React, { Component } from 'react'
import {Card, Table,Button,Icon} from 'antd'
import Linkbutton from '../../components/link-button'
import {reqCategorys} from '../../api/index.js'




//表格列的数组
const columns = [
  {
    title: '分类的名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    width:300,
    render:()=>{
      return (
        <div >
          <Linkbutton>修改分类</Linkbutton>
          <Linkbutton>查看子分类</Linkbutton>
        </div>
      )
     
    }
  }
];

/* 
Admin的分类管理子路由
*/
export default class Category extends Component {

  state={
    categorys:[],//一级分类数组
    loading:false,//loading界面是否显示

  }

/* 获取一级列表或则二级列表 */
getCategorys = async (parentId)=>{
  //发送请求前，显示loading状态（loading的默认是false）
  this.setState({loading:true})
  const result = await reqCategorys(parentId)
  //请求结束后，loading隐藏
 this.setState({loading:false})
   if(result.status === 0){
    const categorys = result.data //data 是一级分类的数组
    this.setState({
      categorys
    })
   }
}



  componentDidMount(){
    this.getCategorys()
  }
  render() {
    //读取数据的状态
    const {categorys,loading} = this.state

    /* 1.定义card左侧标题 */
    const title = '一级分类列表' 
    /* 2.定义card右侧标题 */
    const extra =(
      
        <Button type="primary">
           <Icon type= "plus"/>
           添加
        </Button>
     
      )
    
    return (
     
      <Card title={title} extra={extra} >
      <Table
        rowKey='_id'//用id作为唯一的标识｛表格行 key 的取值，可以是字符串或一个函数｝
        columns={columns}
        loading={loading}//loading显示
        dataSource={categorys}//数据数组
        //Pagination:table表格下的分页显示，｛defaultPageSize是Pagination下的api;showQuickJumper的值是布尔值，默认情况下是false	｝
        pagination={{defaultPageSize:2,showQuickJumper:true}}
        bordered
       
      />
    </Card>
    )
  }
}
