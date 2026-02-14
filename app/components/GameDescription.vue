<script setup lang="ts">
function getLastUpdateDate() {
  const lastUpdateDate = new Date('2026-02-06');
  if (import.meta.client) {
    const lang = window.navigator.language || 'en-US';
    return new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long', day: 'numeric' }).format(lastUpdateDate);
  }
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(lastUpdateDate);
}
</script>

<template>
  <div>
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
  </div>
</template>
