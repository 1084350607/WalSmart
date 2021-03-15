import React from "react";

// Component props
interface goodsProp {
  img?: string,
  title?: string,
  price?: number,
}

function GoodsInfo (prop: goodsProp) {
  return (
    <div className="goods_info">
      <div>
        <img src={prop?.img}></img>
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