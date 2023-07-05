<template>
    <span slot="principal">
        <div class="container">
            <div class="row"></div>
            <div class="row">
                <botao acao="Cadastrar Pet"
                       tipo_icone="fas"
                       cor="blue"
                       icone="plus"
                       tamanho="s3"
                       url="/pet/cadastro"
                />

                <botao acao="Cadastrar Medicamento"
                       tipo_icone="fas"
                       cor="blue"
                       icone="plus"
                       tamanho="s3"
                       url="/medicamento/cadastro"

                />

                <grid tamanho="12">
                    <table class="responsive-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Espécie</th>
                                <th>Raça</th>
                                <th>Data Nascimento</th>
                                <th>Idade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody v-if="pets.length > 0">
                            <tr v-for="pet in pets" :key="pet.id">
                                <td>{{ pet.nome }}</td>
                                <td>{{ pet.especie.descricao }}</td>
                                <td>{{ pet.raca.descricao }}</td>
                                <td>{{ pet.data_nascimento }}  {{ pet.data_falecimento ? " - " + pet.data_falecimento : "" }}</td>
                                <td>{{ pet.idade }}</td>
                                <td>
                                    <botao tipo_icone="fas"
                                           icone="clipboard-check"
                                           titulo="Cadastrar Procedimentos"
                                           v-on:click.native="procedimento(pet.id)"
                                    />
                                    <botao tipo_icone="fas"
                                           icone="edit"
                                           titulo="Editar Pet"
                                           cor="orange"
                                           v-on:click.native="editar(pet.id)"
                                    />
                                    <botao tipo_icone="fas"
                                           icone="cross"
                                           titulo="Falecido"
                                           cor="red"
                                    />
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td></td>
                                <td class="">Nenhum pet cadastrado</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="text-center">
                        <paginacao :source="paginacao"
                                   @navegacao="navegacao"
                        />
                    </div>
                </grid>
            </div>
        </div>
    </span>

</template>

<script>
import Site from "../../template/Site";
import Grid from "../../components/layouts/Grid";
import Botao from "../../components/layouts/Botao";
import Paginacao from "../../components/layouts/Paginacao";

export default {
    name: "PetsListar",
    components: {Paginacao, Botao, Grid, Site},
    data() {
        return {
            usuario: false,
            pets: [],
            paginacao: {},
        }
    },
    methods: {
        navegacao(page) {
            var self = this

            self.$http.get(self.$urlApi + 'pet/listar?page=' + page,
                {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                .then(function (response) {
                    if (response.data.status) {
                        self.pets = response.data.pets.data
                        self.paginacao = response.data.pets
                    } else
                        sweetAlert(response.data.erro)
                })
                .catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                })

        },

        editar(id) {
            var self = this

            self.$http.get(self.$urlApi + 'pet/editar/' + id,
                {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                .then(function (response) {
                    self.pet = response.data.pet
                    self.$store.commit('setPets', response.data.pet)
                    self.$router.push('/pet/editar/' + id)
                })
                .catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                })
        },

        procedimento(id) {
            var self = this

            self.$http.get(self.$urlApi + 'pet/editar/' + id,
                {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                .then(function (response) {
                    self.pet = response.data.pet
                    self.$store.commit('setPets', response.data.pet)
                    self.$router.push('/procedimento/cadastro/' + id)
                })
                .catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                })

        }
    },
    created() {
        var self = this
        var aux = self.$store.getters.getUsuario
        if (aux) {
            self.usuario = self.$store.getters.getUsuario
            self.$http.get(self.$urlApi + 'pet/listar',
                {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                .then(function (response) {
                    if (response.data.status) {
                        self.pets = response.data.pets.data
                        self.paginacao = response.data.pets
                    } else
                        sweetAlert(response.data.erro)
                })
                .catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                })
        } else {
            self.$router.push('/login').catch(err => {
            })
        }
    },
}
</script>

<style scoped>

</style>
