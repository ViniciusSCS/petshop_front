<template>
    <span>
        <header>
            <nav-bar cor="deep-orange">
                <li v-if="usuario">{{ usuario.name }}</li>
                <li v-if="usuario"><a v-on:click="sair()">Sair <i class="material-icons right">power_settings_new</i></a></li>
            </nav-bar>
        </header>

        <main>
            <slot name="principal"/>
        </main>
    </span>

</template>

<script>
import NavBar from "../components/layouts/NavBar";

export default {
    name: "Site",
    components: {NavBar},
    data() {
        return {
            usuario: false,
        }
    },
    created() {
        var self = this
        var aux = self.$store.getters.getUsuario
        if (aux) {
            self.usuario = self.$store.getters.getUsuario
        } else {
            self.$router.push('/login').catch(err => {})
        }
    },
    methods: {
        sair() {
            var self = this
            self.$store.commit('setUsuario', null)
            sessionStorage.clear()
            self.usuario = false
            self.$router.push('/login').catch(err => {})
        },
    }
}
</script>

<style scoped>

</style>
