<template>
    <nav :class="cor || ''">
        <div class="nav-wrapper container">
            <router-link :to="url || '/'" class="brand-logo">{{ $store.getters.getTitulo }}</router-link>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <slot/>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
    props: [
        'url',
        'cor',
    ]

}
</script>

<style scoped>

</style>
