import request from '@/utils/request'

export function getRouterList(data) {
  return request({
    url: 'http://localhost/menu/queryMenuTree',
    method: 'post',
    data,
  })
}
