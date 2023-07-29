import request from '@/utils/request'

export function getRouterList(data) {
  return request({
    url: '/routes/navigate',
    method: 'post',
    data,
  })
}
