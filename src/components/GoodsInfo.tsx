import React from "react";
import './goodsInfo.styl'
import { Card } from 'antd';
import { Link } from "react-router-dom";

// Component props
interface goodsProp {
  img?: string,
  title?: string,
  price?: number,
  name?: string,
  id: number
}

function splitePrice(price: number | undefined) {
  let str = `${price}`
  return str.split('.')
}

function GoodsInfo (prop: goodsProp) {
  const jumpToDetail = () => {

  }
  return (
    <Link to={`detail/${prop.id}`}>
      <Card hoverable className="goods_info" style={{ width: 300 }}>
      <div className="info_warpper">
        <img src={prop.img} alt="" className="info-img"/>
      </div>
      <div className="mt-md" style={{display:"inline-block", color: "black"}}>{prop.title}</div>
      <div className="mt-lg goods_price">
        <svg t="1616262707242" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3489" width="12" height="12"><path d="M682.752 123.776l-142.72 263.68c-8.448 17.152-16 34.56-22.4 52.736h-1.664c-8.064-20.48-15.232-37.376-21.504-50.432L352.128 123.776h-96.256l191.232 333.312h-175.36v67.328H472.32v121.344H271.744v67.712H472.32V903.68h84.224V713.472h195.712v-67.712h-195.84v-121.344h195.712v-67.328h-172.8L772.864 124.032l-90.112-0.256z" p-id="3490" fill="#ffcc01"></path></svg>
        <span className="text-orange-lg mr-xs">{splitePrice(prop.price)[0]}</span>
        <span className="text-orange-lg mr-xs">.</span>
        <span className="text-orange-sm">{splitePrice(prop.price)[1]}</span>
        <svg style={{marginLeft: "150px", display: "inline-block"}} t="1616263252663" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4438" width="32" height="32"><path d="M346.112 806.912q19.456 0 36.864 7.168t30.208 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.208 20.48-36.864 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 37.888-7.168zM772.096 808.96q19.456 0 37.376 7.168t30.72 19.968 20.48 30.208 7.68 36.864-7.68 36.864-20.48 30.208-30.72 20.48-37.376 7.68-36.864-7.68-30.208-20.48-20.48-30.208-7.68-36.864 7.68-36.864 20.48-30.208 30.208-19.968 36.864-7.168zM944.128 227.328q28.672 0 44.544 7.68t22.528 18.944 6.144 24.064-3.584 22.016-13.312 37.888-22.016 62.976-23.552 68.096-18.944 53.248q-13.312 40.96-33.28 56.832t-49.664 15.872l-35.84 0-65.536 0-86.016 0-96.256 0-253.952 0 14.336 92.16 517.12 0q49.152 0 49.152 41.984 0 20.48-9.728 35.328t-38.4 14.848l-49.152 0-94.208 0-118.784 0-119.808 0-99.328 0-55.296 0q-20.48 0-34.304-9.216t-23.04-24.064-14.848-32.256-8.704-32.768q-1.024-6.144-5.632-29.696t-11.264-58.88-14.848-78.848-16.384-87.552q-19.456-103.424-44.032-230.4l-76.8 0q-15.36 0-25.6-7.68t-16.896-18.432-9.216-23.04-2.56-22.528q0-20.48 13.824-33.792t37.376-13.312l21.504 0 21.504 0 25.6 0 34.816 0q20.48 0 32.768 6.144t19.456 15.36 10.24 19.456 5.12 17.408q2.048 8.192 4.096 23.04t4.096 30.208q3.072 18.432 6.144 38.912l700.416 0zM867.328 194.56l-374.784 0 135.168-135.168q23.552-23.552 51.712-24.064t51.712 23.04z" p-id="4439" fill="#ffcc01"></path></svg>
      </div>
    </Card>
    </Link>
  )
}

export default GoodsInfo