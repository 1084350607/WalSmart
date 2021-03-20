import React, { Fragment, useEffect, useState } from "react";
import {Layout, Row, Col, Menu, Carousel} from 'antd';
import GoodsInfo from "../../components/GoodsInfo";
import "./home.styl"
import {
  Link
} from "react-router-dom"

import logoUrl from '../../statics/logo.jpg'
import fruitUrl from '../../statics/fruit/cjg.png'
import axios from '../../utils/axios'
import { Card } from 'antd'

const { Header, Footer, Content } = Layout;

// structure --- Modified
const contentStyle = {
  height: '300px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
};

function Home(){
  const [fruit, setFruit] = useState([]);
  

  async function getFruitInfo () {
    let url = 'http://localhost:3000/goods/get_all'
    let result = await axios(url)
   
    return result.data
  }

  useEffect(() => {
    let result = getFruitInfo().then(data =>{
      setFruit(data.data)
    })
  }, [])

  function fruitComponents() {
    return fruit.map(fruit => {
      console.log(fruit)
      return <GoodsInfo 
        title={fruit.goods_name}
        price={fruit.price}
        img={fruit.img}
        key={fruit.id}
      />
    })
  }
  return(
    <Layout className="page-home">
      <header className="home_header_container">
        <Row>
          <Col offset={3} className="header_item"><Link to="/login">请登录</Link></Col>
          <Col className="header_item"><Link t0="/register">注册</Link></Col>
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
              首页
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
              <h3 style={contentStyle}></h3>
            </div>
            <div className="carousel_block2">
              <h3 style={contentStyle}></h3>
            </div>
          </Carousel>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
          <div className="goods_detail_wrapper">
            <div className="goods_detail_title">限时特价</div>
            <div className="goods_detail_card">
              { fruitComponents() }
            </div>
          </div>
        </div>
        
      </Content>
      <Footer>ttt</Footer>
    </Layout>
  )
}

export default Home