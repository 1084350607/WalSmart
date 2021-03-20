import React ,{useState,useEffect}from "react";
import {Layout, Row, Col, Menu, Carousel, message} from 'antd';
import GoodsInfo from "../../components/GoodsInfo";
import "./index.scss"
import {
  Link,withRouter
} from "react-router-dom"

import logoUrl from '../../statics/logo.jpg'

import axios from '../../utils/axios'

const { Header, Footer, Content } = Layout;
interface Goods{
    goods_name:string;
    price:number;
    img:string;
    description?:string;
    id:number;
    count:number;
    isCollect:boolean

}
function Home(props:any){
    const [goods,setGoods] = useState({}as Goods)
    useEffect(()=>{
        const id = props.match.params.id
        axios("http://localhost:3000/goods/get_goods_by_id?id="+id).then(res=>{
            console.log(res.data.status)
            if(res.status === 200 && res.data.status === 'success'){
                setGoods(res.data.data)
            }else{
                message.error('网路请求错误')
            }
        })
    },[])
    function handleCollect(){
        axios({url:'http://localhost:3000/goods/collect',method:'POST',data:{goods_id:props.match.params.id}}).then(res=>{
            if(res.status===200 && res.data.status ==='success'){
                setGoods({
                    ...goods,
                    isCollect:res.data.data
                })
            }
        })
    }
  return(
    <Layout className="page-home">
      <header className="home_header_container">
        <Row>
          <Col offset={3} className="header_item"><Link to="/login">请登录</Link></Col>
          <Col className="header_item"><Link to="/register">注册</Link></Col>
          <Col className="header_item">微信登录</Col>
          <Col push={9} className="header_item">
            <Row>
              <Col className="header_item">手机版</Col>
              <Col className="header_item">收藏本站</Col>
              <Col className="header_item">我的资料</Col>
              <Col className="header_item">我的订单</Col>
              <Col className="header_item">
                购物车
              </Col>
            </Row>
          </Col>

        </Row>
      </header>
      <Content className="home_content_container">
        <nav className="content_nav_container">
          <img src={logoUrl} style={{height: "100px", width: "300px", marginRight: "400px"}}/>
          <Menu mode="horizontal" style={{height: "100%", lineHeight: "inherit"}}>
            <Menu.Item key="index">
             <Link to="/"> 首页</Link>
            </Menu.Item>
            <Menu.Item key="fruit">
              鲜果
            </Menu.Item>
            <Menu.Item key="fresh">
              生鲜
            </Menu.Item>
            <Menu.Item key="healthy">
              健康咨询
            </Menu.Item>
            <Menu.Item key="about">
              关于我们
            </Menu.Item>
          </Menu>
        </nav>
        <div className="content_Carousel">
          <Carousel autoplay>
            <div className="carousel_block1">
            </div>
            <div className="carousel_block2">
            </div>
          </Carousel>
        </div>
        <div>
        </div>
      </Content>
        <div className="detail-box">
            <div className="detail-content">
                <div className="detail-title">
                    <span className="detail-text">产品详情 </span>
                </div>
                <div className="goods-info-box">
                    <div className="goods-image">
                        <img src={goods.img} alt=""/>
                    </div>
                    <div className="goods-info">
                        <div className="goods_name">{goods.goods_name}</div>
                        <div className="goods_count">该货物还有{goods.count}斤</div>
                        <div className="goods_price">¥ {goods.price}</div>
                        {goods.isCollect?<div onClick={handleCollect} className="goods_card">取消加入购物车</div>:<div onClick={handleCollect} className="goods_card">加入购物车</div>}
                    </div>
                </div>
                <div className="description"><span className="text">商品描述</span></div>
                <div className="goods_description">
                    阿斯顿发就阿里将受到法律阿将受到法律的卷发阿斯顿发就阿将受到法律的卷发阿斯顿发就阿将受到法律的卷发阿斯顿发就卡剋江东父老卡家阿斯顿九分裤就阿里快点放假啊阿斯顿发就啊快点放假啊了阿斯顿发就阿里；剪短发
                </div>
            </div>
        </div>
      <Footer>ttt</Footer>
    </Layout>
  )
}

async function getFruit () {
  let url = 'http://localhost:3000/goods/get_all'
  let result = await axios(url)
  return result.data
}

console.log(getFruit())

export default withRouter(Home)