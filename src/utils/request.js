import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJvZmZpY2VfaWQiOiI0ZDc5MmUzMTZhMDUxMWU2YWE3NjAwMTYzZTE2MmFkZCIsImRldmljZVR5cGUiOiJ3ZWIiLCJvZmZpY2VfbmFtZSI6ImlDb3VydCIsInVzZXJfdHlwZSI6IkEiLCJ1c2VyX2lkIjoiMDFDRUI0RTE2RDI0MTFFNkE1QzIwMDE2M0UwMDIwRDEiLCJsb2dpblR5cGUiOiIyIiwidXNlcl9uYW1lIjoi546L5YKoMSIsImlzcyI6ImlMYXcuY29tIiwiZXhwIjoxNTczMzUyMDcwNDA5LCJpYXQiOjE1NzA3NjAwNzA0MDksIm9mZmljZVR5cGUiOiJpbnRlZ3JhdGlvbiJ9.Hk7G93RZG4axRoJ5_uc8U1M6W9tVd6R9awxSCEvaKTE'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// service.interceptors.response.use(
//   response => {
//     return response
//   }
// )
// response interceptor
service.interceptors.response.use(
  /**
   * 如果您想要获取诸如头或状态之类的http信息
   * If you want to get http information such as headers or status
   * 请返回response=>response
   * Please return  response => response
   */

  /**
   * 通过自定义代码确定请求状态
   * Determine the request status by custom code
   * 这里只是一个例子
   * Here is just an example
   * 您还可以通过http状态代码判断状态
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log(response)
    const res = response.data
    // return res
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
