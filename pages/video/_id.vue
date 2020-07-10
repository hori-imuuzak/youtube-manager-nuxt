<template>
  <div class="section">
    <div class="columns">
      <div class="column is-6">
        <div class="block video-player">
          <youtube ref="youtube" :video-id="this.$route.params.id" />
        </div>
        <div class="box">
          <p>
            <span class="title is-4">{{ item.snippet.title }}</span>
          </p>
          <div class="level">
            <div class="level-left">
              {{ item.snippet.channelTitle }}
              <br />
              {{ item.snippet.publishedAt }}
            </div>
          </div>
          <hr />
          <p>{{ item.snippet.description }}</p>
        </div>
      </div>
      <div class="column is-4">
        <div class="box">
          <p><span>関連動画</span></p>
          <div v-for="relatedItem in relatedItems">
            <RelatedVideo :key="relatedItem.id.videoId" :item="relatedItem" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ROUTES from '~/routes/api'
import RelatedVideo from '~/components/RelatedVideo'

export default {
  components: {
    RelatedVideo,
  },

  async fetch({ store, route }) {
    await store.dispatch('findVideo', {
      uri: ROUTES.GET.VIDEO.replace(':id', route.params.id),
    })
    await store.dispatch('fetchRelatedVideos', {
      uri: ROUTES.GET.RELATED.replace(':id', route.params.id),
    })
  },

  computed: {
    item() {
      return this.$store.getters.getVideo
    },
    relatedItems() {
      return this.$store.getters.getRelatedVideos
    },
  },
}
</script>

<style>
iframe {
  width: 100%;
  height: 500px;
}

.video-player {
  max-width: 880px;
}
</style>
