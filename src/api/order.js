import request from '@/utils/request'

export function doCreateOrder(data) {
  return request({
    url: 'http://localhost/order/webCreate',
    method: 'post',
    data,
  })
}

export function doEditOrder(data) {
  return request({
    url: 'http://localhost/order/webUpdate',
    method: 'post',
    data,
  })
}

export function getList(data) {
  return request({
    url: 'http://localhost/order/webList',
    method: 'post',
    data,
  })
}

export function doCheckIn(data) {
  return request({
    url: 'http://localhost/hotel/checkin',
    method: 'post',
    data,
  })
}

export function doCheckOut(data) {
  return request({
    url: 'http://localhost/hotel/checkout',
    method: 'post',
    data,
  })
}
