import request from '@/utils/request'

export function getInputData() {
  return request({
    url: '/sales/api/v1/selections/configs',
    method: 'get'
  })
}
