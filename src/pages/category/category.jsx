import React, { Component } from 'react'
import {Card, Table,Button,Icon} from 'antd'




//表格列的数组
const columns = [
  {
    title: '分类的名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    render:()=>{
      
    }
  }
];

const data = [
  {
    "parentId": "0",
    "_id": "5c2ed631f352726338607046",
    "name": "分类001",
    "__v": 0
  },
  {
    "parentId": "0",
    "_id": "5c2ed647f352726338607047",
    "name": "分类2",
    "__v": 0
  },
  {
    "parentId": "0",
    "_id": "5c2ed64cf352726338607048",
    "name": "分类3",
    "__v": 0
  }
];
/* 
Admin的分类管理子路由
*/
export default class Category extends Component {
  
  render() {

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
        columns={columns}
        dataSource={data}
        bordered
       
      />,
    </Card>
    )
  }
}
