import request from '@/utils/request'

export function getMenuList(data) {
  return request({
    url: '/menu/listAll',
    method: 'post',
    data,
  })
}

export function getMenuMap(data) {
  let menuMap = new Map()
  data.forEach((item, index) => {
    menuMap.set(item.path, item)
    if (item.children) {
      let src = getMenuMap(item.children)
      mergeMap(menuMap, src)
    }
  })
  return menuMap
}

function mergeMap(obj, src) {
  for (let [k, v] of src) {
    obj.set(k, v)
  }
}

export function menuCreate(data) {
  return request({
    url: '/menu/create',
    method: 'post',
    data,
  })
}

// export function menuEdit(data) {
//   return request({
//     url: 'http://localhost/room/roomShelves',
//     method: 'post',
//     data,
//   })
// }
