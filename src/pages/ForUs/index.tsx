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
                        <span className="health-text">关于我们</span>
                    </div>
                    <div className="content">


                        关于我们
                        沃尔玛果蔬日日鲜    采用“全产业链+全渠道”的商业模式
                        本平台致力于将果蔬产品的精准详情信息透明化地展示在用户面前，多方位升级用户的购物体验，并在物流配送方面采取精简的送货流程，建立一车到底，农-户直接对接的模式，以保证送货的迅捷高效。
                        沃尔玛自有品牌致力于打通相关品类的整体产业链，形成很强的研发、生产、销售能力，强大的供应链、严格的品控体系、源头合作，并依靠沃尔玛全球联合采购优势，积极打造全渠道值得信赖的自有品牌，从而形成企业的差异核心竞争能力。


                        战略定位
                        随着人们生活水平的提高，健康安全的进口类中高端食品消费必然会成为社会主流的消费趋势，我们将全面提升货品质量，加大产品信息传递的精准性和物流的高效性，利用顺丰速运集团资源，放眼全球优质美食，逐步实现全球产地直采，缩短供应链，让用户享受到真正0污染、安全健康、优质优价的全球新鲜蔬果。
                        我们愿意为您想得更多、做得更多，我们希望和您一起，成为高品质生活方式的引导者和健康生活理念的传播者！


                        全球原产地直购
                        100%原产地直购保证

                        会员权益
                        会员升级 尊享特权

                        自建物流
                        专属物流 全程把控

                        48小时退换货
                        专属服务 为您解答

                    </div>
                    <img className="imageForUs" src="https://23476831.s21i.faiusr.com/2/1/ABUIABACGAAgu5qxggYoxdPD0gQw9AM4ygI.jpg.webp"></img>
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