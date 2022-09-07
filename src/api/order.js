import request from '@/utils/request'

export function doCreateOrder(data) {
  return request({
    url: 'https://springboot-krih-3055-4-1313299760.sh.run.tcloudbase.com/order/webCreate',
    method: 'post',
    data,
  })
}

export function doEditOrder(data) {
  return request({
    url: 'https://springboot-krih-3055-4-1313299760.sh.run.tcloudbase.com/order/webUpdate',
    method: 'post',
    data,
  })
}

export function getList(data) {
  return request({
    url: 'https://springboot-krih-3055-4-1313299760.sh.run.tcloudbase.com/order/webList',
    method: 'post',
    data,
  })
}

export function doCheckIn(data) {
  return request({
    url: 'https://springboot-krih-3055-4-1313299760.sh.run.tcloudbase.com/hotel/checkin',
    method: 'post',
    data,
  })
}

export function doCheckOut(data) {
  return request({
    url: 'https://springboot-krih-3055-4-1313299760.sh.run.tcloudbase.com/hotel/checkout',
    method: 'post',
    data,
  })
}
