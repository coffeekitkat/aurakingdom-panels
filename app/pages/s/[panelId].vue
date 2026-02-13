<script setup lang="ts">
import panelsDb from '../../../public/data/panel.json'
import panelsAssetDb from '../../../public/panellist.json'

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

const route = useRoute()
const panelId = computed(() => Number(route.params.panelId))

const typedPanelsDb = panelsDb as Panel[]
const typedPanelsAssetDb = panelsAssetDb as PanelsAssetDb

const panel = computed(() => {
  return typedPanelsDb.find(p => p.id === panelId.value)
})

function getPanelAssetPath(p: Panel): string {
  const filename = typedPanelsAssetDb[p.fd]
  return `/${filename}` || ''
}

function getImgAlt(p: Panel): string {
  if (!p.isAssetAvailable) {
    return `${p.id} - Asset is not shipped on game client yet`
  }
  return `${p.fd}-${p.panel_name}`
}

// Meta tags for social sharing
const metaTitle = computed(() => {
  if (!panel.value)
    return 'Panel Not Found - Aura Kingdom Panels'
  return `${panel.value.panel_name} - Aura Kingdom Panels`
})

const metaDescription = computed(() => {
  if (!panel.value)
    return 'Panel not found'
  return panel.value.panel_description
})

const ogImage = computed(() => {
  if (!panel.value)
    return ''
  const imagePath = getPanelAssetPath(panel.value)
  // For social sharing, use absolute URL
  if (import.meta.client) {
    return new URL(imagePath, window.location.origin).toString()
  }
  return imagePath
})

const ogUrl = computed(() => {
  if (import.meta.client) {
    return window.location.href
  }
  return `/s/${panelId.value}`
})

const shareUrl = computed(() => {
  if (import.meta.client) {
    return window.location.href
  }
  return `/s/${panelId.value}`
})

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogImage,
  ogUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="bg-gray-800 min-h-screen flex flex-col">
    <!-- Navigation -->
    <div class="pt-4 px-4">
      <NuxtLink to="/" class="text-blue-400 hover:text-blue-300 transition-colors">
        ← Back to all panels
      </NuxtLink>
    </div>

    <!-- Main Content - Centered and takes up remaining space -->
    <div class="flex-1 flex flex-col items-center justify-center px-4">
      <!-- Panel Display -->
      <div v-if="panel" class="flex flex-col items-center justify-center">
        <div class="text-center mb-4 mt-2 flex items-center justify-center flex-col w-[480px]">
          <img
            class="text-slate-400 text-sm select-none"
            :class="{ 'border-dashed border-slate-500 border w-[456px] h-[78px]': !panel.isAssetAvailable }"
            :src="getPanelAssetPath(panel)"
            :alt="getImgAlt(panel)"
          >
          <div class="relative w-[480px]">
            <code class="text-blue-400">{{ panel.panel_name }}</code>
          </div>
          <div class="mb-1 text-gray-200">
            {{ panel.panel_description }}
          </div>
        </div>

        <!-- Share URL -->
        <div class="mt-6 w-full max-w-md">
          <ShareLinkSection :url="shareUrl" />
        </div>
      </div>

      <!-- Panel Not Found -->
      <div v-else class="flex flex-col items-center justify-center">
        <div class="text-center">
          <h2 class="text-gray-100 text-2xl mb-4">
            Panel Not Found
          </h2>
          <p class="text-gray-400 mb-8">
            The panel with ID {{ panelId }} does not exist.
          </p>
          <NuxtLink to="/" class="text-blue-400 hover:text-blue-300 transition-colors">
            Go back to all panels
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Footer - Always at bottom -->
    <div class="mt-8">
      <FooterSection />
    </div>
  </div>
</template>
