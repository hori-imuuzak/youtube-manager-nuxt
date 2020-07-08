<template>
  <section class="section">
    <div class="container">
    </div>
  </section>
</template>

<script lang="ts">
import ROUTES from '~/routes/api'

export default {
  async fetch({ store }: any) {
    const payload = {
      uri: ROUTES.GET.POPULARS,
    }

    await store.dispatch('fetchPopularVideos', payload)
  },
}
</script>
