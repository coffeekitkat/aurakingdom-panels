<template>
  <div class="bg-gray-800">
    <h1 class="text-gray-100 pt-4 text-center text-4xl">Aura Kingdom Panels</h1>
    <div class="flex pt-12 pb-16 px-16 items-center justify-center">
    
      <div
        class="
          items-center
          justify-center
          flex
          grid
          lg:grid-cols-3
          md:grid-cols-2
          gap-4
        "
      >
        <div
          v-for="p in panelsAssetDb"
          :key="p.filename"
          class="text-center mb-4"
        >
          <img :src="p.path" :alt="p.filename" />
          <div class="relative">
            <code class="text-blue-400">
            {{ getPanelInfoByFd(p.filename).panel_name }}</code
          >
            <code class="text-xs absolute text-gray-400 right-0">{{ getPanelInfoByFd(p.filename).fd }}</code>
          </div>
          <div class="mb-1 text-gray-200">
            {{ getPanelInfoByFd(p.filename).panel_description }}
          </div>
        </div>
      </div>
    </div>

    <div class="text-xs text-center text-white pb-8">
      <p>&copy; 2016 - {{ yearNow }}</p>
      <p>
        All game content and assets are trademarks and copyrights of X-Legend or
        Aeria Games. This website is not affiliated with X-Legend or Aeria Games.
      </p>
    </div>
  </div>
</template>

<script>
import panelsAssetDb from '~/static/panellist.json'
import panelsDb from '~/static/data/panel.json'
export default {
  data() {
    return {
      panelsAssetDb,
      panelsDb,
    }
  },

  computed: {
    yearNow() {
      return new Date().getFullYear()
    },
  },

  methods: {
    getPanelInfoByFd(fd) {
      return this.panelsDb.find((e) => e.fd == fd)
    },
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
