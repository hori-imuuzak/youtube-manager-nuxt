<template>
  <div id="app">
    <TheHeader />
    <div class="columns">
      <TheSidebar />
      <div class="column content">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'
import TheSidebar from '~/components/TheSidebar'

export default {
  components: {
    TheHeader,
    TheSidebar,
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

#app {
  min-height: 100vh;
  background: #FAFAFA;
}

.columns {
  min-height: 100vh;
}
</style>
