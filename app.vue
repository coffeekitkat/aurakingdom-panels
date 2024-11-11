<template>
    <div class="bg-gray-800">
      <h1 class="text-gray-100 pt-4 text-center text-4xl">Aura Kingdom Panels</h1>
      <div class="flex pt-12 pb-16 px-16 items-center justify-center">
      
        <div
          class="
            items-start
            justify-center
            flex
            grid
            lg:grid-cols-3
            md:grid-cols-2
            gap-4
          "
        >
          <div
            v-for="p in panelsDb"
            :key="p.fd"
            class="text-center mb-4 mt-2"
            :data-id="p.id"
            :data-asset-id="p.fd"
          >
            <img class="text-slate-400" :class="{'flex items-center justify-center border-dashed border-slate-500 border w-[456px] h-[78px]' : !p.isAssetAvailable }" :src="getPanelAssetPath(p)" :alt="getImgAlt(p)" />
            <div class="relative">
              <code class="text-blue-400"> {{ p.panel_name }}</code >
              <code class="text-xs absolute text-gray-400 right-0">{{ p.id }}</code>
            </div>
            <div class="mb-1 text-gray-200">
              {{ p.panel_description }}
            </div>
          </div>
        </div>
      </div>
  
      <div class="text-xs text-center text-white pb-8">
        <p>&copy; {{ copyrightYear }}</p>
        <p>
          All game content and assets are trademarks and copyrights of X-Legend or
          Aeria Games. This website is not affiliated with X-Legend or Aeria Games.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import panelsAssetDb from '~/public/panellist.json'
  import panelsDb from '~/public/data/panel.json'
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
      
      copyrightYear() { 
        const startYear = 2021
        const yearToday = new Date().getFullYear()
        // return startYear > yearToday ? "2021 - " + yearToday : '2021'
        return startYear >= yearToday ? `${startYear} - ${yearToday}` : `${startYear}`
      }
    },
  
    methods: {
      getImgAlt(p) {
        if(!p.isAssetAvailable) {
          return `${p.id} - Asset Not Available`
        }
        return `${p.fd}-${p.panel_name}`;
      },

      getPanelAssetPath(p) {
        const filename = this.panelsAssetDb[p.fd];
        return filename;
      },
  
      getPanelInfoByFd(fd) {
        return this.panelsDb.find((e) => e.fd == fd)
      },
    },
  }
  </script>
  
<style>
 html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
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

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
  </style>
  