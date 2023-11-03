<template>
    <site>
        <span slot="principal">
            <div class="container">
                <h2>Cadastrar Procedimento</h2>
                <div class="row">
                    <div class="row">
                        <div class="row">
                            <div class="input-field col s6">
                                <label>PET</label>
                                <select class="browser-default" v-model="pet">
                                    <option value="" disabled selected></option>
                                    <option v-for="pet in pet_selecionado" v-bind:value="pet.id">
                                        {{ pet.nome }}
                                    </option>
                                </select>
                            </div>
                            <div class="input-field col s6">
                                <label>
                                    <input name="banho_tosa" type="radio" v-model="banho_tosa" v-bind:value="'Banho'"/>
                                    <span>Banho</span>
                                </label>
                            </div>
                            <div class="input-field col s6">
                                <label>
                                    <input name="banho_tosa" type="radio" v-model="banho_tosa" v-bind:value="'Tosa'"/>
                                    <span>Tosa</span>
                                </label>
                            </div>
                            <div class="input-field col s6">
                                <label>
                                    <input name="banho_tosa" type="radio" v-model="banho_tosa"
                                           v-bind:value="'Banho e Tosa'"/>
                                    <span>Banho & Tosa</span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <label>Vacina</label>
                                <select class="browser-default" v-model="vacina" @change="vacinas_select()">
                                    <option value="" disabled selected></option>
                                    <option v-for="vacina in vacinas" v-bind:value="vacina.id">
                                        {{ vacina.descricao }}
                                    </option>
                                </select>
                            </div>
                            <div class="input-field col s6">
                                <input id="data_vacina" type="date" class="validate" v-model="data_vacina">
                                <label for="data_vacina">Data da Vacinação</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <label>CIRURGIA</label>
                                <div class="row"></div>
                                <div class="input-field col s3">
                                    <label>
                                        <input name="cirurgia" type="radio" value="1" v-model="cirurgia"/>
                                        <span>Sim</span>
                                    </label>
                                </div>
                                <div class="input-field col s3">
                                    <label>
                                        <input name="cirurgia" type="radio" value="0" v-model="cirurgia"/>
                                        <span>Não</span>
                                    </label>
                                </div>
                            </div>
                            <div class="input-field col s6" v-if="cirurgia == true">
                                <label>CASTRADO</label>
                                <div class="row"></div>
                                <div class="input-field col s3">
                                    <label>
                                        <input name="castrado" type="radio" value="1" v-model="castrado"/>
                                        <span>Sim</span>
                                    </label>
                                </div>
                                <div class="input-field col s3">
                                    <label>
                                        <input name="castrado" type="radio" value="0" v-model="castrado"/>
                                        <span>Não</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6" v-if="cirurgia == true">
                                <input id="descricao_cirurgica" type="text" class="validate"
                                       v-model="descricao_cirurgica">
                                <label for="descricao_cirurgica">Qual Cirurgia?</label>
                            </div>
                            <div class="input-field col s6" v-if="castrado == true">
                                <input id="data_castracao" type="date" class="validate" v-model="data_castracao">
                                <label for="data_castracao">Data da Castração</label>
                            </div>
                        </div>
                        <botao acao="salvar"
                               tipo_icone="fas"
                               icone="save"
                               tamanho="s3"
                               v-on:click.native="salvar()">
                        </botao>

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
            </div>

        </span>
    </site>
</template>

<script>
import Site from "../../template/Site";
import Botao from "../../components/layouts/Botao";
import Icone from "../../components/layouts/Icone";

export default {
    name: "Procedimentos",
    components: {Icone, Botao, Site},
    created() {
        var self = this

        self.pet = self.$store.getters.getPets
    },
    mounted: function () {
        this.pets_select()
        this.vacinas_select()
    },
    data() {
        return {
            vacina: '',
            data_vacina: '',
            data_castracao: '',
            descricao_cirurgica: '',

            pet: false,
            castrado: null,
            cirurgia: null,
            banho_tosa: null,

            pet_selecionado: [],
            vacinas: [],
        }
    },

    methods: {
        salvar() {
            var self = this

            self.$http.post(self.$urlApi + 'procedimento/cadastro', {
                pet_id: self.pet,
                vacina: self.vacina,
                castrado: self.castrado,
                cirurgia: self.cirurgia,
                banho_tosa: self.banho_tosa,
                data_vacina: self.data_vacina,
                data_castracao: self.data_castracao,
                descricao_cirurgia: self.descricao_cirurgica,
                user_id: self.$store.getters.getUsuario,
                user_created: self.$store.getters.getUsuario
            }, {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                .then(function (response) {
                    if (response.data.status) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Procedimento cadastrado com sucesso!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        self.$router.push('/')
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Erro ao cadastrar procedimento!',
                        })
                        self.$router.push('/')
                    }
                }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'ERRO, tente novamente mais tarde!',
                })
                self.$router.push('/')
            })

        },

        clear() {
            var self = this
            self.pet = ''
            self.vacina = ''
            self.castrado = ''
            self.cirurgia = ''
            self.banho_tosa = ''
            self.data_vacina = ''
            self.data_castracao = ''
            self.descricao_cirurgica = ''
        },

        pets_select: function () {
            var self = this

            self.$http.get(self.$urlApi + 'pet/select/' + self.pet.id,
                {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                .then(function (response) {
                    if (response.data.status) {
                        self.pet_selecionado = response.data.pets
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

        vacinas_select: function () {
            var self = this

            self.$http.get(self.$urlApi + 'vacina/select',
                {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                .then(function (response) {
                    if (response.data.status) {
                        self.vacinas = response.data.vacinas
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
