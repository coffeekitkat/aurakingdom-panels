<script setup lang="ts">
interface Panel {
  id: number
  fd: string
  panel_name: string
  panel_description: string
  isAssetAvailable: boolean
}

interface Props {
  panel: Panel
  assetPath: string | undefined
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const shareUrl = computed(() => {
  if (import.meta.client) {
    return `${window.location.origin}/s/${props.panel.id}`
  }
  return `/s/${props.panel.id}`
})

const isExpanded = ref(false)

function closeModal() {
  emit('close')

  if (isExpanded.value && import.meta.client) {
    // Navigate back when closing expanded view
    window.history.back()
  }

  // Reset expanded state
  isExpanded.value = false
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}

function expandView() {
  if (!import.meta.client)
    return

  isExpanded.value = !isExpanded.value

  if (isExpanded.value) {
    // Check if window.history API is available
    if (!window.history || !window.history.pushState) {
      // navigate normally if not available
      navigateTo(`/s/${props.panel.id}`)
    }
    else {
    // Change URL without navigation using History API
      window.history.pushState({}, '', `/s/${props.panel.id}`)
    }
  }
  else {
    if (!window.history || !window.history.pushState) {
      // navigate normally if not available
      navigateTo('/')
    }
    else {
      // Change URL back to home without navigation
      window.history.pushState({}, '', '/')
    }
  }
}

// Handle popstate (browser back button)
if (import.meta.client) {
  onMounted(() => {
    const handlePopState = () => {
      if (props.isOpen && isExpanded.value) {
        isExpanded.value = false
        emit('close')
      }
    }
    window.addEventListener('popstate', handlePopState)

    onUnmounted(() => {
      window.removeEventListener('popstate', handlePopState)
    })
  })
}

function getImgAlt(p: Panel): string {
  if (!p.isAssetAvailable) {
    return `${p.id} - Asset is not shipped on game client yet`
  }
  return `${p.fd}-${p.panel_name}`
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
        :class="isExpanded ? 'p-0' : 'p-4'"
        @click="handleBackdropClick"
      >
        <div
          class="bg-gray-800 w-full relative overflow-auto transition-all duration-500 ease-in-out"
          :class="isExpanded ? 'max-w-full max-h-full h-full rounded-none flex flex-col' : 'max-w-[520px] mx-4 rounded-lg p-6'"
        >
          <!-- Header Buttons -->
          <div class="absolute top-4 right-4 flex items-center gap-2 z-10">
            <!-- Expand/Collapse Button -->
            <button
              class="text-gray-400 hover:text-white transition-colors"
              @click="expandView"
            >
              <svg v-if="!isExpanded" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
              </svg>
            </button>

            <!-- Close Button -->
            <button
              class="text-gray-400 hover:text-white transition-colors"
              @click="closeModal"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Expanded View (matches /s/:panelId page) -->
          <template v-if="isExpanded">
            <!-- Main Content - Centered -->
            <div class="flex-1 flex flex-col items-center justify-center px-4 pt-16">
              <div class="flex flex-col items-center justify-center">
                <div class="text-center mb-4 mt-2 flex items-center justify-center flex-col w-[480px]">
                  <img
                    class="text-slate-400 text-sm select-none"
                    :class="{ 'border-dashed border-slate-500 border w-[456px] h-[78px]': !panel.isAssetAvailable }"
                    :src="assetPath"
                    :alt="getImgAlt(panel)"
                  >
                  <div class="relative w-[480px] mt-2">
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
            </div>

            <!-- Footer -->
            <div class="mt-8">
              <FooterSection />
            </div>
          </template>

          <!-- Normal View (compact with share link) -->
          <template v-else>
            <div class="pt-8">
              <!-- Panel Preview -->
              <div class="flex flex-col items-center mb-6">
                <img
                  class="text-slate-400 text-sm select-none"
                  :class="{
                    'border-dashed border-slate-500 border w-[456px] h-[78px]': !panel.isAssetAvailable,
                  }"
                  :src="assetPath"
                  :alt="getImgAlt(panel)"
                >
                <div class="mt-2 text-center">
                  <code class="text-blue-400 text-sm">{{ panel.panel_name }}</code>
                  <p class="text-gray-300 mt-1 text-xs">
                    {{ panel.panel_description }}
                  </p>
                </div>
              </div>

              <!-- Share URL -->
              <div class="mb-4 w-[480px] mx-auto">
                <ShareLinkSection :url="shareUrl" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-gray-800,
.modal-leave-active .bg-gray-800 {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-gray-800,
.modal-leave-to .bg-gray-800 {
  transform: scale(0.95);
}
</style>
