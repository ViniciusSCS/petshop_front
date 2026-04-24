<template>
    <site>
        <span slot="principal">
            <div class="container">
                <h2>{{ pet ? "Atualizar Pet" : "Cadastrar Pet" }}</h2>
                <div class="row">
                    <div class="row">
                        <select-custom
                            v-if="isVeterinario"
                            label="Tutor"
                            :options="tutores"
                            optionLabel="name"
                            v-model="user_id"
                        />
                        <select-custom
                            label="Espécie"
                            :options="especies"
                            v-model="especie"
                            @change="racas_select()"
                        />
                        <div class="input-field col s6">
                            <input id="nome" type="text" class="validate" v-model="nome">
                            <label for="nome">Nome</label>
                        </div>
                    </div>
                    <div class="row">
                        <select-custom
                            label="Raça"
                            :options="racas"
                            v-model="raca"
                        />
                        <select-custom
                            label="Sexo"
                            :options="[
                                { id: 'Macho', descricao: 'Macho' },
                                { id: 'Femea', descricao: 'Fêmea' }
                            ]"
                            v-model="sexo"
                        />
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="data_nascimento" type="date" class="validate" v-model="data_nascimento">
                            <label for="data_nascimento">Data de Nascimento</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="data_nascimento" type="date" class="validate" v-model="data_falecimento">
                            <label for="data_nascimento">Data de Falecimento</label>
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
import SelectCustom from "../../components/layouts/SelectCustom.vue";

export default {
    name: "Pets",
    components: {Botao, Site, SelectCustom},
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
                self.data_nascimento = self.pet.data_nascimento
                self.data_falecimento = self.pet.data_falecimento
            }
        }
    },
    computed: {
        isVeterinario() {
            return this.usuario && this.usuario.tipo_id === 1
        }
    },
    mounted() {
        this.usuario = this.$store.getters.getUsuario

        this.especies_select().then(() => {

            if (this.pet) {

                this.especie = this.pet.especie_id

                this.racas_select().then(() => {
                    this.raca = this.pet.raca_id
                })
            }

        })

        if (this.isVeterinario) {
            this.tutores_select()
        }
    },
    data() {
        return {
            usuario: null,

            nome: '',
            raca: '',
            sexo: '',
            peso: '',
            especie: '',
            data_nascimento: '',
            data_falecimento: '',
            user_id: '',
            currentRoute: window.location.pathname,

            pet: false,

            racas: [],
            especies: [],
            tutores: [],
        }
    },
    methods: {
        salvar() {
            var self = this

            let payload = {
                nome: self.nome,
                raca: self.raca,
                especie: self.especie,
                sexo: self.sexo,
                peso: self.peso,
                data_nascimento: self.data_nascimento,
                data_falecimento: self.data_falecimento,
            }

            if (self.usuario && self.usuario.tipo_id === 1) {
                payload.user_id = self.user_id
            }

            let request

            if (self.currentRoute.match(/editar.*/)) {
                request = self.$http.put(
                    self.$urlApi + 'pet/atualizar/' + self.pet.id,
                    payload,
                    { headers: { authorization: "Bearer " + self.$store.getters.getToken } }
                )
            } else {
                request = self.$http.post(
                    self.$urlApi + 'pet/cadastro',
                    payload,
                    { headers: { authorization: "Bearer " + self.$store.getters.getToken } }
                )
            }

            request.then(function (response) {

                if (response.data.status) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: self.currentRoute.match(/editar.*/)
                            ? process.env.PET_ATUALIZADO_SUCESSO
                            : process.env.PET_CADASTRADO_SUCESSO,
                        showConfirmButton: false,
                        timer: 1500
                    })

                    self.clear()
                    self.$store.commit('setPets', response.data)
                    self.$router.push('/')

                } else if (response.data.status == false && response.data.validacao) {

                    let erros = Object.values(response.data.erros).join(' ')

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

            }).catch(function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'ERRO, tente novamente mais tarde!',
                })
            })
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
            self.user_id = ''
        },

        especies_select() {
            var self = this

            return self.$http.get(self.$urlApi + 'especie/select',
                {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                .then(function (response) {
                    if (response.data.status) {
                        self.especies = response.data.especies
                    }
                })
        },

        racas_select() {
            var self = this

            return self.$http.get(self.$urlApi + 'raca/select/' + self.especie,
                {"headers": {"authorization": "Bearer " + self.$store.getters.getToken}})
                .then(function (response) {
                    if (response.data.status) {
                        self.racas = response.data.racas
                    }
                })
        },

        tutores_select() {
            this.$http.get(this.$urlApi + 'user/select', {
                headers: { authorization: "Bearer " + this.$store.getters.getToken }
            }).then(response => {
                this.tutores = response.data.usuarios
            })
        },

        onChangeEspecie() {
            this.raca = ''
            this.racas_select()
        }
    }
}
</script>

<style scoped>

</style>
