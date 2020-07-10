<template>
  <section class="section">
    <div class="container">
      <div class="block">
        <div v-for="item in items" class="block video-block">
          <AppVideo :item="item" :video-id="item.id.videoId" />
        </div>
      </div>
    </div>
    <div class="block">
      <nav class="pagination">
        <a href.prevent="#" class="pagination-next" @click="loadMore">
          More
        </a>
      </nav>
    </div>
  </section>
</template>

<script lang="ts">
import ROUTES from '~/routes/api'
import AppVideo from '~/components/AppVideo'

export default {
  components: { AppVideo },

  async fetch({ store, query }: any) {
    const q = encodeURIComponent(query.q) || ''
    const payload = {
      uri: ROUTES.GET.SEARCH,
      q,
    }

    await store.dispatch('searchVideos', payload)
  },

  computed: {
    items() {
      return this.$store.getters.getSearchVideos
    },
    nextPageToken() {
      return this.$store.getters.getSearchMeta.nextPageToken
    },
  },

  methods: {
    loadMore() {
      const q = encodeURIComponent(this.$route.query.q) || ''
      const payload = {
        uri: ROUTES.GET.SEARCH,
        params: {
          pageToken: this.nextPageToken,
          q,
        },
      }

      this.$store.dispatch('searchVideos', payload)
    },
  },
}
</script>

<style scoped>
.video-block {
  max-width: 900px;
}
.pagination {
  margin-top: 24px;
}
</style>
