

import React, { useState } from 'react'
import { Card, Input, Button, Spin, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import './index.scss'
import axiosInstance from '../../utils/axios';
import {withRouter} from 'react-router-dom'
const Login = (props: any) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    async function handleSubmit() {

        setIsLoading(true)
        // setTimeout(()=>{setIsLoading(false)},1000)
        if (!username) {
            message.error('用户名不能为空')
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
            return;
        } else if (!password) {
            message.error('密码不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return;
        }
        const res = await axiosInstance({ url: 'http://localhost:3000/login', method: 'POST', data: { username: username, password: password } })
        setIsLoading(false)
        console.log(res, 'res')
        if (res.data.status === 'success') {
            localStorage.setItem('userInfo', JSON.stringify(res.data.data))
            props.history.push('/')
        } else {
            message.error('用户名密码错误')
        }

    }

    return (
        <div className="login-div">
            <Spin tip="loading..." spinning={isLoading} >
                <Card title="Walsmart" bordered={true} style={{ width: 400 }}>
                    <Input
                        className="ipt"
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setUsername(e.target.value) }}

                    />
                    <br></br>
                    <Input.Password
                        className="ipt"
                        id="password"
                        size="large"
                        placeholder="Enter your Password"
                        prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <br />
                    <Button className="btn" type="primary" block size="large" onClick={handleSubmit}>提交</Button>
                </Card>


            </Spin>
        </div>
    )
}
export default withRouter (Login)

