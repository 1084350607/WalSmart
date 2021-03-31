import React, { useState, useEffect } from "react";
import { Layout, Drawer, Row, Col, Menu, Carousel, message } from 'antd';
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
        let localUserInfo = JSON.parse(localStorage.getItem('userInfo')!) || {}
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
                            </div>
                            <div className="carousel_block2">
                            </div>
                        </Carousel>
                    </div>
                    <div>
                    </div>
                </Content>
                <div className="health-wrap">
                    <div className="health-title">
                        <span className="health-text">蔬果资讯</span>
                    </div>
                    <div className="health-item">
                        <div className="item-text">春天养生，不妨多吃5种菜：西红柿、菠菜、香椿、黄瓜</div>
                        <div className="item-date">2021-03-13</div>
                    </div>
                    <div className="health-item">
                        <div className="item-text">给老年人买什么吃的好 | 给老人买什么水果吃比较好</div>
                        <div className="item-date">2021-03-13</div>
                    </div>
                    <div className="health-item">
                        <div className="item-text">五类人群不宜吃柚子</div>
                        <div className="item-date">2021-03-13</div>
                    </div>
                    <div className="health-item">
                        <div className="item-text">新鲜柠檬怎么吃 | 吃新鲜柠檬的好处与功效</div>
                        <div className="item-date">2021-03-13</div>
                    </div>
                    <div className="health-item">
                        <div className="item-text">黑葡萄怎么吃比较健康</div>
                        <div className="item-date">2021-03-13</div>
                    </div>
                    <div className="health-item">
                        <div className="item-text">枸杞该怎么喝才可以补身体</div>
                        <div className="item-date">2021-03-13</div>
                    </div>
                    <div className="health-item">
                        <div className="item-text">如何才可以烧掉头发</div>
                        <div className="item-date">2021-03-13</div>
                    </div>
                    <div className="health-item">
                        <div className="item-text">健康科普小知识</div>
                        <div className="item-date">2021-03-13</div>
                    </div>
                    <div className="health-item">
                        <div className="item-text">小葵花妈妈课堂开课啦</div>
                        <div className="item-date">2021-03-13</div>
                    </div>
                    <div className="health-item">
                        <div className="item-text">双黄连口服液</div>
                        <div className="item-date">2021-03-13</div>
                    </div>
                    <div className="health-item">
                        <div className="item-text">怎么才可以顿顿吃肉</div>
                        <div className="item-date">2021-03-13</div>
                    </div>
                    <div className="health-item">
                        <div className="item-text">猕猴桃的吃法怎么才健康</div>
                        <div className="item-date">2021-03-13</div>
                    </div>
                    <div className="health-item">
                        <div className="item-text">土豆的健康吃法</div>
                        <div className="item-date">2021-03-13</div>
                    </div>
                    <div className="health-item">
                        <div className="item-text">地瓜的拔丝方法</div>
                        <div className="item-date">2021-03-13</div>
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