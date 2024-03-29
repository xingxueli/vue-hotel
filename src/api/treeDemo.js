import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'http://localhost/menu/queryMenuTree',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: 'http://localhost/room/update',
    method: 'post',
    data,
  })
}

export function doCreate(data) {
  return request({
    url: 'http://localhost/menu/create',
    method: 'post',
    data,
  })
}

export function doShelves(data) {
  return request({
    url: 'http://localhost/room/roomShelves',
    method: 'post',
    data,
  })
}
