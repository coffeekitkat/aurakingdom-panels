<template>
  <div class="bg-gray-800">
    <div class="flex p-16 items-center justify-center">
      <div
        class="
          items-center
          justify-center
          flex
          grid
          lg:grid-cols-3
          md:grid-cols-2
          gap-4
        "
      >
        <div v-for="p in panelsDb" :key="p.filename" class="text-center mb-2">
          <img :src="p.path" :alt="p.filename" />
          <code class="text-blue-400">{{ p.filename }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import panelsDb from '~/static/panellist.json'

export default {
  data() {
    return {
      panelsDb,
    }
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
