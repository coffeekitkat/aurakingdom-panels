<script>
import panelsDb from '../public/data/panel.json'
import panelsAssetDb from '../public/panellist.json'

export default {

  setup() {
    const appConfig = useAppConfig()
    return {
      appConfig,
    }
  },
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

    copyrightYear() {
      const yearConfig = this.appConfig.year
      const startYear = 2021
      const yearToday = new Date().getFullYear()
      // return startYear > yearToday ? "2021 - " + yearToday : '2021'
      // return startYear >= yearToday ? `${startYear}` : `${startYear} - ${yearToday}`
      return `${startYear} - ${yearConfig}`
    },

    getLastUpdateDate() {
      const lastUpdateDate = new Date('2026-02-06')
      if (import.meta.client) {
        const lang = window.navigator.language || 'en-US'
        return new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long', day: 'numeric' }).format(lastUpdateDate)
      }
      return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(lastUpdateDate)
    },
    getImgAlt(p) {
      if (!p.isAssetAvailable) {
        return `${p.id} - Asset is not shipped on game client yet`
      }
      return `${p.fd}-${p.panel_name}`
    },

    getPanelAssetPath(p) {
      const filename = this.panelsAssetDb[p.fd]
      return filename
    },

    getPanelInfoByFd(fd) {
      return this.panelsDb.find(e => e.fd == fd)
    },
  },
}
</script>

<template>
  <div class="bg-gray-800">
    <h1 class="text-gray-100 pt-4 text-center text-4xl">
      Aura Kingdom Panels
    </h1>
    <p class="text-gray-300 text-center pt-2 px-4 text-sm">
      These panels are from and for Aura Kingdom US version and not for Aura Kingdom: Impact or any other version.
      You can download the game Aura Kingdom from <a class="text-blue-400 underline" href="https://www.x-legend.com/online/aurakingdom/" target="_blank">X-Legend website</a>
    </p>

    <!-- Last Update (manually updated) -->
    <p class="text-gray-300 text-center pt-2 px-4 text-xs">
      Updated at: <span class="text-gray-400">
        {{ getLastUpdateDate() }}
      </span>
    </p>

    <div class="flex pt-12 pb-16 px-16 items-center justify-center">
      <div
        class="
            items-start
            justify-center
            grid
            lg:grid-cols-3
            md:grid-cols-2
            gap-4
          "
      >
        <div
          v-for="p in panelsDb"
          :key="p.fd"
          class="text-center mb-4 mt-2  flex items-center justify-center flex-col w-[480px]"
          :data-id="p.id"
          :data-asset-id="p.fd"
        >
          <img class="text-slate-400 text-sm" :class="{ 'border-dashed border-slate-500 border w-[456px] h-[78px]': !p.isAssetAvailable }" :src="getPanelAssetPath(p)" :alt="getImgAlt(p)">
          <div class="relative w-[480px]">
            <code class="text-blue-400"> {{ p.panel_name }}</code>
            <code class="text-xs absolute text-gray-400 right-0">{{ p.id }}</code>
          </div>
          <div class="mb-1 text-gray-200">
            {{ p.panel_description }}
          </div>
        </div>
      </div>
    </div>

    <div>
      <!-- Donate link Ko-Fi -->
      <div class="flex items-center justify-center pb-4">
        <KofiButton />
      </div>

      <div class="text-xs text-center text-white pb-8">
        <p>&copy; {{ copyrightYear() }}</p>
        <p>
          All game content and assets are trademarks and copyrights of X-Legend or
          Aeria Games. This website is not affiliated with X-Legend or Aeria Games.
        </p>
      </div>
    </div>
  </div>
</template>
