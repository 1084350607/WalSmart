import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL:'http://localhost:3000',
    timeout:2000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // 'Origin':'http://localhost:3000'
      },
    withCredentials:true
})
axiosInstance.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.data.status === 301) {
            window.location = 'http://localhost:3001/login'
            localStorage.clear()
        } else{
            return Promise.resolve(response);
        }
    })
export default axiosInstance