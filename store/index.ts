import { createRequestClient } from '~/store/request-client'

export const state = () => ({
  items: [],
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
}

export const mutations = {
  mutatePopularVideos(state: any, payload: any) {
    state.items = payload.items ? state.items.concat(payload.items) : []
    state.meta = payload
  },
}

export const getters = {
  getPopularVideos(state: any) {
    return state.items
  },
}
