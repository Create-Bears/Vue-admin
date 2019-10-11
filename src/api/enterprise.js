import request from '@/utils/request'

export function getInputData(params) {
  return request({
    url: '/sales/api/v1/partnerInvitation/invitations',
    method: 'get',
    params: params,
    baseURL: '/api'
  })
}
