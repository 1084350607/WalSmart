import React from "react";
import './goodsInfo.styl'

// Component props
interface goodsProp {
  img?: string,
  title?: string,
  price?: number,
}

function GoodsInfo (prop: goodsProp) {
  return (
    <div className="goods_info">
      <div className="info_warpper">
        <img src={prop.img} alt="" className="info-img"/>
        <div>{prop?.img}</div>
      </div>
      <div>
        {prop.title}
      </div>
      <div>
        {prop.price}
      </div>
    </div>
  )
}

export default GoodsInfo