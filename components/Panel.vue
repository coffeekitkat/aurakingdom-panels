<template>
    <div>
        <img :src="src" v-bind="$attrs">
    </div>
</template>
<script>
export default {
    props: [
        'src'
    ]
}
</script>