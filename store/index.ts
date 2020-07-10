import { createRequestClient } from '~/store/request-client'

export const state = () => ({
  items: [],
  item: {},
  meta: {},
})

interface IAction {
  commit: Function
}

export const actions = {
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
}

export const getters = {
  getPopularVideos(state: any) {
    return state.items
  },
  getVideo(state: any) {
    return state.item
  },
  getMeta(state: any) {
    return state.meta
  },
}
