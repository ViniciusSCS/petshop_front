<template>
    <span>
        <header>
            <nav-bar cor="deep-orange">
                <li v-if="usuario"><router-link to="/perfil">{{ usuario.name }}</router-link></li>
                <li v-if="usuario"><a v-on:click="sair()">Sair</a></li>
            </nav-bar>
        </header>
        <main>
            <div class="container">
                <div class="row">
                    <grid tamanho="12">
                        <slot name="principal"/>
                    </grid>
                </div>
            </div>
        </main>
    </span>

</template>

<script>
import NavBar from "../components/layouts/NavBar";
import Grid from "../components/layouts/Grid";

export default {
    name: "LoginTemplate",
    components: {Grid, NavBar},
    data() {
        return {
            usuario: false,
        }
    },
    created() {
        var self = this
        var aux = self.$store.getters.getUsuario
        if (aux) {
            self.$store.getters.getUsuario
            self.$router.push('/')
        }
    },
}
</script>

<style scoped>

</style>
