import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import {Card,Select,Input,Button,Icon,Table,message} from 'antd'
import {reqProducts,reqProductsSearch,reqUpDateStatus} from '../../api/index.js'
import  {PAGE_SIZE } from '../../utils/constonts.js'


/* 商品路由下的子路由home */
export default class productHome extends Component {

    //初始化状态
    state = {
        loading:false,  //是否显示请求中的加载界面
        products:[],//用来存储当前页的数据数组
        total:0,//所有商品的总数量(一开始上来的时候是为0)
        searchType:'productName',//搜索的类型以商品的名称(productName:商品名，productDesc：商品描述)
        searchName:'',
    }
    //更新商品的状态

    upDateStatus = async(productId,status)=>{
        //发请求
       const result = await reqUpDateStatus(status,productId)
       if(result.status===0){
        message.success('更新状态成功')
         // 重新获取当前页显示
      this.getProducts(this.pageNum)
       }

    }
     //初始化table栏中的所有列信息
     initcolumns = ()=>{
        this.columns =[
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                // 一旦显示的不是数据本身，用render来渲染
                render : price=> '￥' + price
            },
            {
                title: '状态',
                width:100,
                
                render : (product) =>{
                    const {productId,status} =product
                    const btnText = status===1 ? '下架' : '上架'
                    const text = status===1?'在售': '已下架'
                    return (
                        <div>
                            <Button type ="primary" 
                            onClick = {()=>{this.upDateStatus(status===1?2:1,productId)}}>{btnText}</Button>
                            <span>{text}</span>
                        </div>
                    )
                }
            },
            {
                title: '操作',
                width:100,
                /* product相当于是个变量，代表的是这一行的数据 */
                render : (product) => {
                    return (
                    <div>
                        <LinkButton>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </div>
                    )
                }             
            },         
        ]
     }
 
    //获取指定页码的商品列表数据
    getProducts =async(pageNum)=>{
        //保存当前的页数
        this.pageNum = pageNum
        //发请求前显示loading界面（更新状态）
        this.setState({loading:true})
        //获取当前的状态
        const {searchType,searchName} = this.state
        let result
        if(!searchName){
            //如果searchName没有值，发送一般请求
        result = await reqProducts ({pageNum,pageSize:PAGE_SIZE})
        }else {
            //如果有就发送商品搜索请求
            result =await reqProductsSearch({pageNum,pageSize:PAGE_SIZE,searchType,searchName})
        }
        

       //得到数据后loading界面消失
       this.setState({loading:false})
       
       if(result.status===0){
        const {total,list} = result.data
        //更新状态
        this.setState({
            total,
            products: list
        })
       }
    }


    componentWillMount(){
        this.initcolumns()       
    }

    componentDidMount(){
        this.getProducts(1)
    }
    render() {
        //从状态中取出（total是渲染之后的新的数据）
        const {loading,products,total,searchType,searchName} = this.state
        //定义左边的
        const title =(
            <div>
                <Select  value={searchType} style={{width: 150}}
                  onChange = {(value)=>{this.setState({searchType:value})}}
               
                >
                    <Select.Option value={searchName}>按名称搜索</Select.Option>
                    <Select.Option value={searchType}>按描述搜索</Select.Option>                  
                </Select>
                <Input
                 placeholder="请输入关键字"
                 style={{width: 150,margin:'0 16px'}} 
                 onChange={(e)=>{this.setState({searchName:e.target.value})}}
                 ></Input>
                <Button type="primary">搜索</Button>
            </div>
        )

        //定义右边的
        const extra =(
            <Button type="primary">
                <Icon type="plus"></Icon>
                <span>添加商品</span>
            </Button> 
        )

        return (
            <div>
               <Card title={title} extra={extra}>
                   <Table  
                        bordered//边框
                        rowKey = '_id'
                        loading= {loading} //加载
                        columns={this.columns} //这个列是一上来就有的，所有要在渲染之前就有此列信息
                        dataSource={products}//dataSource:数据的数组，用来显示商品的数组
                        pagination={{defaultPageSize:PAGE_SIZE,
                            showQuickJumper:true,
                            total,
                            /* //监听页码改变的监听
                            onChange:(page)=>{this.getProducts(pageNum)} */
                            //onChange:页码改变的回调，参数是改变后的页码及每页条数Function(page, pageSize)
                            onChange:this.getProducts
                        }}
                   
                   >
                   </Table>


                    
               </Card>
            </div>
        )
    }
}
