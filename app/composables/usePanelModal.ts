import type { Ref } from 'vue'

interface Panel {
  id: number
  fd: string
  panel_name: string
  panel_description: string
  isAssetAvailable: boolean
}

export function usePanelModal(panels: Panel[]) {
  const route = useRoute()
  const router = useRouter()

  const selectedPanel: Ref<Panel | null> = ref(null)
  const isModalOpen = ref(false)

  // Watch for route changes to handle /s/:panelId
  watch(() => route.path, (path) => {
    const match = path.match(/^\/s\/(\d+)$/)
    if (match) {
      const panelId = Number(match[1])
      const panel = panels.find(p => p.id === panelId)
      if (panel) {
        selectedPanel.value = panel
        isModalOpen.value = true
      }
    }
  }, { immediate: true })

  function openPanel(panel: Panel) {
    selectedPanel.value = panel
    isModalOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
    selectedPanel.value = null
    // Navigate back to home if we're on a panel URL
    if (route.path.startsWith('/s/')) {
      router.push('/')
    }
  }

  function expandPanel(panel: Panel) {
    router.push(`/s/${panel.id}`)
  }

  return {
    selectedPanel,
    isModalOpen,
    openPanel,
    closeModal,
    expandPanel,
  }
}
