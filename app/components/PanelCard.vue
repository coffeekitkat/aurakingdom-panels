<script setup lang="ts">
import { useMouse } from '@vueuse/core';

interface Panel {
  id: number;
  fd: string;
  panel_name: string;
  panel_description: string;
  isAssetAvailable: boolean;
}

interface Props {
  panel: Panel;
  assetPath: string | undefined;
}

defineProps<Props>();

const { sourceType } = useMouse();

const isShareModalOpen = ref(false);

function getImgAlt(p: Panel): string {
  if (!p.isAssetAvailable) {
    return `${p.id} - Asset is not shipped on game client yet`;
  }
  return `${p.fd}-${p.panel_name}`;
}

function resolveAssetPathToRoot(aPath: string | undefined): string | undefined {
  if (!aPath) {
    return undefined;
  }
  if (import.meta.client) {
    return `/${aPath}`;
  }
  return `/${aPath}`;
}

function openShareModal() {
  isShareModalOpen.value = true;
}

function closeShareModal() {
  isShareModalOpen.value = false;
}
</script>

<template>
  <div
    class="group text-center mb-4 mt-2  flex items-center justify-center flex-col w-[480px]"
    :data-id="panel.id"
    :data-asset-id="panel.fd"
  >
    <img
      class="text-slate-400 text-sm"
      :class="{ 'border-dashed border-slate-500 border w-[456px] h-[78px]': !panel.isAssetAvailable }"
      :src="resolveAssetPathToRoot(assetPath)"
      :alt="getImgAlt(panel)"
    >
    <div class="relative w-[480px]">
      <code class="text-blue-400">{{ panel.panel_name }}</code>
      <code class="text-xs absolute text-gray-400 left-3">{{ panel.id }}</code>
      <button
        :class="{
          'opacity-0 group-hover:opacity-100': sourceType === 'mouse',
          'opacity-100': sourceType !== 'mouse',
        }"
        class="text-xs text-gray-400 hover:text-blue-400 transition-all absolute right-3 cursor-pointer"
        @click="openShareModal"
      >
        view
      </button>
    </div>
    <div class="mb-1 text-gray-200">
      {{ panel.panel_description }}
    </div>

    <!-- Share Modal -->
    <ShareModal
      :panel="panel"
      :asset-path="resolveAssetPathToRoot(assetPath)"
      :is-open="isShareModalOpen"
      @close="closeShareModal"
    />
  </div>
</template>
