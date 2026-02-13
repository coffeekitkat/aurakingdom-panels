<script setup lang="ts">
const appConfig = useAppConfig()

const copyrightYear = computed(() => {
  const yearConfig = appConfig.year
  const startYear = 2021
  return `${startYear} - ${yearConfig}`
})
</script>

<template>
  <div>
    <!-- Donate link Ko-Fi -->
    <div class="flex items-center justify-center pb-4">
      <KofiButton />
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
