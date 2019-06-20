import React, { Component } from 'react'
import {Card, Table,Button,Icon} from 'antd'
import Linkbutton from '../../components/link-button'
import {reqCategorys} from '../../api/index.js'



/* 
Admin的分类管理子路由
*/
export default class Category extends Component {

  state={
    categorys:[],//一级分类列表数组
    subCategorys:[],//二级分类列表数组
    parentId: "0",//当前分类列表的id
    loading:false,//loading界面是否显示
    parentName:'',//当前分类列表的父分类名称

  }

    /* 获取一级列表或则二级列表 */
    getCategorys = async ()=>{
      //发送请求前，显示loading状态（loading的默认是false）
      this.setState({loading:true})
      const {parentId} = this.state
      const result = await reqCategorys(parentId)
      //请求结束后，loading隐藏
    this.setState({loading:false})

      if(result.status === 0){
        //得到的可能是一级列表，也有可能是二级列表
        const categorys = result.data //data 是一级分类的数组
        if(parentId==='0'){
          this.setState({
            categorys//此时是获取的是数据是一种简写的状态
          })
        }else {
          this.setState({
            subCategorys:categorys
          })
        }
        
      }
    }
      //显示某个一级分类的子列表
    subCategorys =(category)=>{
      debugger
    /* 
    setState()是异步更新的状态数据, 在setState()的后面直接读取状态数据是旧的数据
    利用setState({}, callback): callback在状态数据更新且界面更新后执行
    */
      //首先更新parentId为当前指定的id
      this.setState({
        parentId : category._id,
        parentName :category.name
      },()=>{
        //获取对应的列表显示
        this.getCategorys()
      })
      
    }
    //初始化指定表格列的数组
   initcolumns =()=>{
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width:300,
        render:(categorys)=>{
          return (
            <div >
              <Linkbutton >修改分类</Linkbutton>
              <Linkbutton onClick={()=>{this.subCategorys(categorys)}}>查看子分类</Linkbutton>
            </div>
          )        
        }
      }
    ];

   }
   //第一次render之前执行
   componentWillMount(){
     this.initcolumns()
   }

  componentDidMount(){
    this.getCategorys()
  }


  render() {
    //读取数据的状态
    const {categorys,loading,subCategorys,parentId} = this.state

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
        columns={this.columns}
        loading={loading}//loading显示
        
        dataSource={parentId==='0'?categorys:subCategorys}
        //数据数组，parentId是判断一级还是二级的标识，用三元表达式判断

        //Pagination:table表格下的分页显示，｛defaultPageSize是Pagination下的api;showQuickJumper的值是布尔值，默认情况下是false	｝
        pagination={{defaultPageSize:2,showQuickJumper:true}}
        bordered
       
      />
    </Card>
    )
  }
}
