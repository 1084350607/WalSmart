import React from "react";
import {Layout, Row, Col, Menu, Carousel} from 'antd';
import "./home.styl"
import GoodsInfo from "../components/GoodsInfo";

const { Header, Footer, Content } = Layout;

// structure --- Modified
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


function Home(){
  return(
    <Layout className="page-home">
      <header className="home_header_container">
        <Row>
          <Col offset={3} className="header_item">请登录</Col>
          <Col className="header_item">注册</Col>
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
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div>
        <div>
          <GoodsInfo title="ts" price={111}/>
        </div>
      </Content>
      <Footer>ttt</Footer>
    </Layout>
  )
}

export default Home