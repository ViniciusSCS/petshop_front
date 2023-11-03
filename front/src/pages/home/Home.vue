<template>
    <site>
        <span slot="principal">
            <pets-listar/>
        </span>
    </site>
</template>

<script>
import Pets from "../pets/Pets";
import Site from "../../template/Site";
import PetsListar from "../pets/PetsListar";

export default {
    name: "Home",
    components: {Pets, PetsListar, Site},
    data() {
        return {
            pets: [],
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
}
</script>

<style scoped>

</style>
