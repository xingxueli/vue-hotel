import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'https://springboot-krih-3055-4-1313299760.sh.run.tcloudbase.com/room/list',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: 'https://springboot-krih-3055-4-1313299760.sh.run.tcloudbase.com/room/update',
    method: 'post',
    data,
  })
}

export function doCreate(data) {
  return request({
    url: 'https://springboot-krih-3055-4-1313299760.sh.run.tcloudbase.com/room/create',
    method: 'post',
    data,
  })
}

export function doShelves(data) {
  return request({
    url: 'https://springboot-krih-3055-4-1313299760.sh.run.tcloudbase.com/room/roomShelves',
    method: 'post',
    data,
  })
}
