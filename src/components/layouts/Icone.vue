<template>
    <i :class="tipo + ' fa-' + icone"></i>
</template>

<script>
export default {
    name: "Icone",
    props: [
        'tipo',
        'icone',
    ]
}
</script>

<style scoped>

</style>
