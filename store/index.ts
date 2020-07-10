import { createRequestClient } from '~/store/request-client'
import firebase from '~/plugins/firebase'

export const state = () => ({
  items: [],
  relatedItems: [],
  item: {},
  searchItems: [],
  meta: {},
  searchMeta: {},
  token: '',
})

interface IAction {
  commit: Function
}

export const actions = {
  async signUp({ commit }, payload) {
    await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
    const res = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    const token = await res.user.getIdToken()
    this.$cookies.set('jwt_token', token)
    commit('mutateToken', token)
    this.app.router.push('/')
  },
  async login({ commit }, payload) {
    const res = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    const token = await res.user.getIdToken()
    this.$cookies.set('jwt_token', token)
    commit('mutateToken', token)
    this.app.router.push('/')
  },
  async logout({ commit }) {
    await firebase.auth().signOut()
    commit('mutateToken', null)
    this.$cookies.remove('jwt_token')
    this.app.router.push('/')
  },
  async setToken({ commit }, payload) {
    commit('mutateToken', payload)
  },
  async fetchPopularVideos({ commit }: IAction, payload: any) {
    // @ts-ignore
    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri, payload.params)
    commit('mutatePopularVideos', res)
  },
  async findVideo({ commit }, payload) {
    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri)
    const params = {
      ...res.video_list,
    }
    commit('mutateVideo', params)
  },
  async fetchRelatedVideos({ commit }, payload) {
    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri)
    commit('mutateRelatedVideos', res)
  },
  async searchVideos({ commit }, payload) {
    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri)
    commit('mutateSearchVideos', res)
  },
}

export const mutations = {
  mutatePopularVideos(state: any, payload: any) {
    state.items = payload.items ? state.items.concat(payload.items) : []
    state.meta = payload
  },
  mutateVideo(state, payload) {
    const params =
      payload.items && payload.items.length > 0 ? payload.items[0] : {}
    state.item = params
  },
  mutateRelatedVideos(state, payload) {
    state.relatedItems = payload.items || []
  },
  mutateSearchVideos(state, payload) {
    state.searchItems = payload.items
      ? state.searchItems.concat(payload.items)
      : []
    state.searchMeta = payload
  },
  mutateToken(state, payload) {
    state.token = payload
  },
}

export const getters = {
  getPopularVideos(state: any) {
    return state.items
  },
  getVideo(state: any) {
    return state.item
  },
  getRelatedVideos(state: any) {
    return state.relatedItems
  },
  getSearchVideos(state: any) {
    return state.searchItems
  },
  getMeta(state: any) {
    return state.meta
  },
  getSearchMeta(state: any) {
    return state.searchMeta
  },
  isLoggedIn(state) {
    return !!state.token
  },
}
