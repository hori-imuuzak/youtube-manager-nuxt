<template>
  <nuxt-link :to="`/video/${item.id.videoId}`">
    <div class="box video-box">
      <article class="media">
        <div class="media-left">
          <figure class="image">
            <img :src="item.snippet.thumbnails.default.url" alt="Image" />
          </figure>
        </div>
      </article>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ item.snippet.title }}</strong>
            <small>{{ item.snippet.channelTitle }}</small>
          </p>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
  filters: {
    omit: (value) => {
      if (!value) return ''

      if (value.length > 120) {
        return value.substr(0, 120) + '...'
      }

      return value
    },
  },
}
</script>

<style scoped>
.video-box {
  display: flex;
  max-width: 900px;
}
</style>
