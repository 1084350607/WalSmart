import React from 'react'
import './index.scss'
const footerArr = [{ title: '服务保障', list: ['正品保障', '七天无理由退换', '退货返运费', '24小时服务'] }, { title: '支付方式', list: ['公司装章', '活到付款', '在线支付', '分歧付款'] }, { title: '商家服务', list: ['培训中心', '傻姑娘旧', '广告服务', '服务市场'] }, { title: '物流服务', list: ['免运费', '海外配送', 'EMS', '211'] }]
function Footer(props: any) {
    return (
        <div className="footer-box">
            {footerArr.map((item, index) => {
                return (
                    <div className="list" key={index}>
                        <div className="list-title">{item.title}</div>
                        {
                            item.list.map((a,b)=>{
                                return (
                                    <div className="list-item" key={b}>{a}</div>
                                )
                            })
                        }
                    </div>
                )
            })}
        </div>)
}
export default Footer