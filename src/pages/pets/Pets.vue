<template>
    <site>
        <span slot="principal">
            <div class="container">
                <h2>{{ pet ? "Atualizar Pet" : "Cadastrar Pet" }}</h2>
                <div class="row">
                    <div class="row">
                        <div class="input-field col s6">
                            <label>Espécie</label>
                            <select class="browser-default" v-model="especie" @change="racas_select()">
                                <option value="" disabled selected></option>
                                <option v-for="especie in especies" :key="especie.id"
                                        v-bind:value="especie.id">{{ especie.descricao }}</option>
                            </select>
                        </div>
                        <div class="input-field col s6">
                            <input id="nome" type="text" class="validate" v-model="nome">
                            <label for="nome">Nome</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <select class="browser-default" v-model="raca">
                                  <option value="" disabled selected></option>
                                  <option v-for="raca in racas" :key="raca.id"
                                          v-bind:value="raca.id">{{ raca.descricao }}</option>
                            </select>
                            <label>Raça</label>
                        </div>
                        <div class="input-field col s6">
                            <label>Sexo</label>
                            <select class="browser-default" v-model="sexo">
                                  <option value="" disabled selected></option>
                                  <option v-bind:value="'Macho'">Macho</option>
                                  <option v-bind:value="'Femea'">Fêmea</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="data_nascimento" type="date" class="validate" v-model="data_nascimento">
                            <label for="data_nascimento">Data de Nascimento</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="peso" type="text" class="validate" v-model="peso">
                            <label for="peso">Peso</label>
                        </div>
                    </div>
                    <botao acao="salvar"
                           tipo_icone="fas"
                           icone="save"
                           tamanho="s3"
                           v-on:click.native="salvar()"
                           v-if="!pet"
                    />
                    <botao acao="Atualizar"
                           cor="orange"
                           tipo_icone="fas"
                           icone="save"
                           tamanho="s3"
                           v-on:click.native="salvar()"
                           v-if="pet"
                    />
                    <botao acao="voltar"
                           cor=""
                           tipo_icone="fas"
                           icone="arrow-left"
                           tamanho="s3"
                           url="/"
                           v-on:click.native="clear()"
                    />
                </div>
            </div>
        </span>
    </site>

</template>

<script>
import Site from "../../template/Site";
import Botao from "../../components/layouts/Botao";
import Login from "../login/Login";

export default {
    name: "Pets",
    components: {Botao, Site},
    created() {
        var self = this

        var verificaRota = self.currentRoute

        if (verificaRota.match(/editar.*/)) {
            var aux = self.$store.getters.getPets
            if (aux.id != null) {
                self.pet = self.$store.getters.getPets
                self.nome = self.pet.nome
                self.sexo = self.pet.sexo
                self.peso = self.pet.peso
                self.raca = self.pet.raca_id
                self.especie = self.pet.especie_id
                self.data_nascimento = self.pet.data_nascimento
            }
        }
    },
    mounted: function () {
        this.especies_select()
        if (this.pet != false)
            this.racas_select()
        else
            this.clear()

    },
    data() {
        return {
            nome: '',
            raca: '',
            sexo: '',
            peso: '',
            especie: '',
            data_nascimento: '',
            data_falecimento: '',
            currentRoute: window.location.pathname,

            pet: false,

            racas: [],
            especies: [],
        }
    },
    methods: {
        salvar() {
            var self = this

            if(self.currentRoute.match(/editar.*/)){
                self.$http.put(self.$urlApi + 'pet/atualizar/' + self.pet.id, {
                    nome: self.nome,
                    raca: self.raca,
                    especie: self.especie,
                    sexo: self.sexo,
                    peso: self.peso,
                    data_nascimento: self.data_nascimento,
                    data_falecimento: self.data_falecimento,
                    usuario: self.$store.getters.getUsuario
                }, {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                    .then(function (response) {

                        if (response.data.status) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: process.env.PET_ATUALIZADO_SUCESSO,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            self.$store.commit('setPets', response.data)
                            self.$router.push('/')
                        } else if (response.data.status == false && response.data.validacao) {
                            var erros = '';
                            for (var e of Object.values(response.data.erros)) {
                                erros += e + ' ';
                            }
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Erro: ' + erros,
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: process.env.PET_CADASTRADO_ERRO,
                            })
                        }
                    }).catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                })
            } else {
                self.$http.post(self.$urlApi + 'pet/cadastro', {
                    nome: self.nome,
                    raca: self.raca,
                    especie: self.especie,
                    sexo: self.sexo,
                    peso: self.peso,
                    data_nascimento: self.data_nascimento,
                    data_falecimento: self.data_falecimento,
                    usuario: self.$store.getters.getUsuario
                }, {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                    .then(function (response) {

                        if (response.data.status) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: process.env.PET_CADASTRADO_SUCESSO,
                                showConfirmButton: false,
                                timer: 1500
                            })
                            this.clear()
                            self.$store.commit('setPets', response.data)
                            self.$router.push('/')
                        } else if (response.data.status == false && response.data.validacao) {
                            var erros = '';
                            for (var e of Object.values(response.data.erros)) {
                                erros += e + ' ';
                            }
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Erro: ' + erros,
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: process.env.PET_CADASTRADO_ERRO,
                            })
                        }
                    }).catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                })
            }
        },

        clear(){
            var self = this

            self.pet = false

            self.nome = ''
            self.raca = ''
            self.sexo = ''
            self.peso = ''
            self.especie = ''
            self.data_nascimento = ''
            self.data_falecimento = ''
        },

        especies_select: function () {
            var self = this

            self.$http.get(self.$urlApi + 'especie/select',
                {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                .then(function (response) {
                    if (response.data.status) {
                        self.especies = response.data.especies
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

        racas_select: function () {
            var self = this

            self.$http.get(self.$urlApi + 'raca/select/' + self.especie,
                {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                .then(function (response) {
                    if (response.data.status) {
                        self.racas = response.data.racas
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
        }
    }
}
</script>

<style scoped>

</style>
