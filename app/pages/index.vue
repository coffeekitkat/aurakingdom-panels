<script setup lang="ts">
import panelsDb from '../../public/data/panel.json'
import panelsAssetDb from '../../public/panellist.json'

interface Panel {
  id: number
  fd: string
  panel_name: string
  panel_description: string
  isAssetAvailable: boolean
}

interface PanelsAssetDb {
  [key: string]: string
}

const typedPanelsDb = panelsDb as Panel[]
const typedPanelsAssetDb = panelsAssetDb as PanelsAssetDb

function getPanelAssetPath(p: Panel): string | undefined {
  const filename = typedPanelsAssetDb[p.fd]
  return filename
}
</script>

<template>
  <div class="bg-gray-800">
    <h1 class="text-gray-100 pt-4 text-center text-4xl">
      Aura Kingdom Panels
    </h1>

    <GameDescription />

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
        <PanelCard
          v-for="p in typedPanelsDb"
          :key="p.fd"
          :panel="p"
          :asset-path="getPanelAssetPath(p)"
        />
      </div>
    </div>

    <FooterSection />
  </div>
</template>
