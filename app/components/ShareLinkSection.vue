<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

interface Props {
  url: string;
}

const props = defineProps<Props>();

const copyStatus = ref<'idle' | 'copied'>('idle');
const { copy } = useClipboard();

async function copyToClipboard() {
  if (!import.meta.client)
    return;

  try {
    await copy(props.url);
    copyStatus.value = 'copied';
    setTimeout(() => {
      copyStatus.value = 'idle';
    }, 2000);
  }
  catch (error) {
    console.error('Failed to copy:', error);
  }
}
</script>

<template>
  <div>
    <label class="text-gray-400 text-sm mb-2 block">Share Link</label>
    <div class="flex gap-2">
      <input
        type="text"
        :value="url"
        readonly
        class="flex-1 bg-gray-700 text-gray-200 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
      <button
        class="px-4 py-2 rounded text-sm font-medium transition-colors"
        :class="copyStatus === 'copied'
          ? 'bg-green-600 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'"
        @click="copyToClipboard"
      >
        {{ copyStatus === 'copied' ? 'Copied!' : 'Copy' }}
      </button>
    </div>
  </div>
</template>
