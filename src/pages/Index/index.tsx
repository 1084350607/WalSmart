import React, { Fragment, useEffect, useState } from "react";
import { Layout, Drawer, message, Row, Col, Menu, Carousel } from 'antd';
import GoodsInfo from "../../components/GoodsInfo";
import "./home.styl"
import {
  Link
} from "react-router-dom"
import logoUrl from '../../statics/logo.jpg'
import fruitUrl from '../../statics/fruit/cjg.png'
import axios from '../../utils/axios'
import { Card } from 'antd'
import Footer from '../../components/Footer'
const { Header, Content } = Layout;

// structure --- Modified
const contentStyle = {
  height: '300px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
};
interface userInfo {
  id: number,
  username: string,
  password: string | null,
  avator: string | null
}
function Home() {

  const [userInfo, setUserInfo] = useState({} as any);
  const [fruit, setFruit] = useState([]);
  const [visible, setVisible] = useState(false);
  const [shop, setShop] = useState([] as any)


  async function removeCollection(goods_id: any) {
    let res = await axios({ url: 'http://localhost:3000/goods/collect', method: 'POST', data: { goods_id } })
    if (res.status === 200 && res.data.status === 'success') {
      setShop(shop.filter((item: any) => item.id !== goods_id))
      message.success('移除成功')
    }
  }
  async function handleCar() {
    let result = await axios({ url: 'http://localhost:3000/goods/get_collect_by_id' })

    let goodsShop = result.data.data.map(async (id: any) => {
      let res = await axios({ url: 'http://localhost:3000/goods/get_goods_by_id?id=' + id })
      if (res.status === 200 && res.data.status === 'success') {
        return (res.data.data)
      } else {
        message.error('请求失败')
      }
    })
    Promise.all(goodsShop).then(res => setShop(res))
    setVisible(true);
  }
  const onClose = () => {
    setVisible(false);
    setShop([])

  };
  async function getFruitInfo() {
    let url = 'http://localhost:3000/goods/get_all'
    let result = await axios(url)

    return result.data
  }

  useEffect(() => {
    let result = getFruitInfo().then(data => {
      setFruit(data.data)
    })

    let localUserInfo = JSON.parse(localStorage.getItem('userInfo')!) || {}
    setUserInfo(localUserInfo)
  }, [])

  function fruitComponents(start: number, end: number) {
    return fruit.slice(start, end).map((fruit: any) => {
      return <GoodsInfo
        title={fruit.goods_name}
        price={fruit.price}
        img={fruit.img}
        key={fruit.id}
        id={fruit.id}
      />
    })
  }

  return (
    <>
      <Layout className="page-home">
        <header className="home_header_container">
          <Row>
            {
              userInfo.id ? <Col offset={3} className="header_item">{`您好，${userInfo.username}`}</Col>
                : <Col offset={3} className="header_item"><Link to="/login">请登录</Link></Col>
            }

            <Col className="header_item"><Link to="/register" className="text-grey">注册</Link></Col>
            <Col className="header_item">微信登录</Col>
            <Col push={9} className="header_item">
              <Row>
                <Col className="header_item">手机版</Col>
                <Col className="header_item">收藏本站</Col>
                <Col className="header_item">我的资料</Col>
                <Col className="header_item">我的订单</Col>
                <Col className="header_item" onClick={handleCar}>
                  购物车
              </Col>
              </Row>
            </Col>

          </Row>
        </header>
        <Content className="home_content_container">
          <nav className="content_nav_container">
            <img src={logoUrl} style={{ height: "100px", width: "300px", marginRight: "400px" }} />
            <Menu mode="horizontal" style={{ height: "100%", lineHeight: "inherit" }}>
              <Menu.Item key="index">
                <Link to="/">首页</Link>
              </Menu.Item>
              <Menu.Item key="fruit">
                <Link to="/">鲜果</Link>

              </Menu.Item>
              <Menu.Item key="fresh">
                <Link to="/">生鲜</Link>

              </Menu.Item>
              <Menu.Item key="healthy">
                <Link to="/health">健康咨询</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to="/ForUs">关于我们</Link>
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
          <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <div className="goods_detail_wrapper">
              <div className="goods_detail_title">限时特价</div>
              <div className="goods_detail_card">
                {fruitComponents(0, 4)}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <div className="goods_detail_wrapper">
              <div className="goods_detail_title">限时特价</div>
              <div className="goods_detail_card">
                {fruitComponents(4, 8)}
              </div>
            </div>
          </div>

        </Content>
        <Footer></Footer>
      </Layout>
      <Drawer
        title="Shopping Car"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={500}
      >
        {shop.map((item: any) => {
          return (
            <div key={item.id} className="shop-card">
              <img src={item.img} alt="" />
              <div className="shop-name">{item.goods_name}</div>
              <div className="shop-price">{item.price}</div>
              <div className="btn" onClick={() => { removeCollection(item.id) }}>移除购物车</div>
            </div>
          )
        })}
      </Drawer>
    </>
  )
}

export default Home