<template>
    <router-link :class="'btn waves-effect waves-light ' + cor + ' col ' + tamanho" :to="''+ url +''" :title="titulo">
        {{ acao }}
        <i :class="tipo_icone + ' fa-' + icone + ' ' + tamanho_icone"></i>
    </router-link>

</template>

<script>
export default {
    name: "Botao",
    props: [
        'cor',
        'url',
        'acao',
        'icone',
        'titulo',
        'tamanho',
        'tipo_icone',
        'tamanho_icone',
    ],
}
</script>

<style scoped>
.btn{
    margin: 0 5px;
}
</style>
