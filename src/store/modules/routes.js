/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes, constantRoutes } from '@/router'
import { getRouterList } from '@/api/router'
import { getMenuList, getMenuMap } from '@/api/menu'
import { convertRouter, filterAsyncRoutes } from '@/utils/handleRoutes'

const state = () => ({
  routes: [],
  menuList: [],
  menuMap: {},
  partialRoutes: [],
})
const getters = {
  routes: (state) => state.routes,
  menuList: (state) => state.menuList,
  menuMap: (state) => state.menuMap,
  partialRoutes: (state) => state.partialRoutes,
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setAllRoutes(state, routes) {
    // state.routes = constantRoutes.concat(routes)
    state.routes = routes
  },
  setMenuList(state, menuList) {
    state.menuList = menuList
  },
  setMenuMap(state, menuMap) {
    state.menuMap = menuMap
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = constantRoutes.concat(routes)
  },
}
const actions = {
  async setRoutes({ commit }, permissions) {
    //开源版只过滤动态路由permissions，admin不再默认拥有全部权限
    const finallyAsyncRoutes = await filterAsyncRoutes(
      [...asyncRoutes],
      permissions
    )
    commit('setRoutes', finallyAsyncRoutes)
    return finallyAsyncRoutes
  },
  async setAllRoutes({ commit }) {
    let { data } = await getRouterList()
    // data.push({ path: '*', redirect: '/404', hidden: true })
    let accessRoutes = convertRouter(data)
    commit('setAllRoutes', accessRoutes)
    return accessRoutes
  },
  async setMenuList({ commit, dispatch }) {
    let { data } = await getMenuList()
    commit('setMenuList', data)
    let menuMap = await getMenuMap(data)
    commit('setMenuMap', menuMap)
    return data
  },
  setPartialRoutes({ commit }, accessRoutes) {
    commit('setPartialRoutes', accessRoutes)
    return accessRoutes
  },
}
export default { state, getters, mutations, actions }
