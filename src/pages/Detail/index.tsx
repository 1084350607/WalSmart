import React, { useState, useEffect } from "react";
import { Layout, Drawer, Row, Col, Menu, Carousel, message } from 'antd';
import GoodsInfo from "../../components/GoodsInfo";
import Footer from "../../components/Footer";
import "./index.scss"
import {
    Link, withRouter
} from "react-router-dom"

import logoUrl from '../../statics/logo.jpg'

import axios from '../../utils/axios'
import axiosInstance from "../../utils/axios";

const { Header, Content } = Layout;
interface Goods {
    goods_name: string;
    price: number;
    img: string;
    description?: string;
    id: number;
    count: number;
    isCollect: boolean

}
function Home(props: any) {
    const [visible, setVisible] = useState(false);
    const [shop, setShop] = useState([] as any)
    const [goods, setGoods] = useState({} as Goods)
    const [userInfo, setUserInfo] = useState({} as any);
    async function removeCollection(goods_id: any) {
        let res = await axiosInstance({ url: 'http://localhost:3000/goods/collect', method: 'POST', data: { goods_id } })
        if (res.status === 200 && res.data.status === 'success') {
            setShop(shop.filter((item: any) => item.id !== goods_id))
            if (goods_id === goods.id) setGoods({ ...goods, isCollect: false })
            message.success('移除成功')
        }
    }
    useEffect(() => {
        const id = props.match.params.id
        axios("http://localhost:3000/goods/get_goods_by_id?id="+id).then(res=>{
            if(res.status === 200 && res.data.status === 'success'){
                setGoods(res.data.data)
            } else {
                message.error('网路请求错误')
            }
        })
    }, [])

    useEffect(() => {
        let localUserInfo = JSON.parse(localStorage.getItem('userInfo')!)||{}
        setUserInfo(localUserInfo)
      }, [])
    function handleCollect() {
        axios({ url: 'http://localhost:3000/goods/collect', method: 'POST', data: { goods_id: props.match.params.id } }).then(res => {
            if (res.status === 200 && res.data.status === 'success') {
                setGoods({
                    ...goods,
                    isCollect: res.data.data
                })
            }
        })
    }
    async function handleCar() {
        let result = await axiosInstance({ url: 'http://localhost:3000/goods/get_collect_by_id' })

        let goodsShop = result.data.data.map(async (id: any) => {
            let res = await axiosInstance({ url: 'http://localhost:3000/goods/get_goods_by_id?id=' + id })
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
    return (
        <>
            <Layout className="page-home">
                <header className="home_header_container">
                    <Row>
                        {
                            userInfo.id ? <Col offset={3} className="header_item">{`您好，${userInfo.username}`}</Col> 
                                        : <Col offset={3} className="header_item"><Link to="/login">请登录</Link></Col>
                        }
                        <Col className="header_item"><Link to="/register">注册</Link></Col>
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
                                <img src={goods.img} alt="" />
                            </div>
                            <div className="goods-info">
                                <div className="goods_name">{goods.goods_name}</div>
                                <div className="goods_count">该货物还有{goods.count}斤</div>
                                <div className="goods_price">¥ {goods.price}</div>
                                {goods.isCollect ? <div onClick={handleCollect} className="goods_card">取消加入购物车</div> : <div onClick={handleCollect} className="goods_card">加入购物车</div>}
                            </div>
                        </div>
                        <div className="description"><span className="text">商品描述</span></div>
                        <div className="goods_description">
                          {goods.description}
                        </div>
                    </div>
                </div>
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

async function getFruit() {
    let url = 'http://localhost:3000/goods/get_all'
    let result = await axios(url)
    return result.data
}


export default withRouter(Home)