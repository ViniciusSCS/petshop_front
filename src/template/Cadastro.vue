<template>

    <login-template>
        <span slot="principal">
            <div id="login-page" class="row">
                <grid class="z-depth-6 card-panel" tamanho="12">
                    <div class="row">
                        <grid class="input-field" tamanho="12">
                            <i class="material-icons prefix">people_outline</i>
                            <input class="validate" id="nome" type="text" v-model="name">
                            <label for="nome" data-error="wrong" data-success="right">Nome</label>
                        </grid>
                    </div>

                    <div class="row">
                        <grid class="input-field" tamanho="6">
                            <i class="material-icons prefix">mail_outline</i>
                            <input class="validate" id="email" type="email" v-model="email">
                            <label for="email" data-error="wrong" data-success="right">E-mail</label>
                        </grid>

                        <grid class="input-field" tamanho="6">
                            <i class="material-icons prefix">accessibility</i>
                            <label>Tipo de Cadastro</label>
                            <select class="browser-default" v-model="tipo">
                                  <option value="" disabled selected></option>
                                  <option value="1">Cliente</option>
                                  <option value="2">Veterinário</option>
                            </select>
                        </grid>
                    </div>

                    <div class="row">
                        <grid class="input-field" tamanho="12">
                            <i class="material-icons prefix">lock_outline</i>
                            <input id="password" type="password" v-model="password">
                            <label for="password">Senha</label>
                        </grid>
                    </div>

                    <div class="row">
                        <grid class="input-field" tamanho="12">
                            <i class="material-icons prefix">lock_outline</i>
                            <input id="confirmar_senha" type="password" v-model="password_confirmation">
                            <label for="confirmar_senha">Confirme sua Senha</label>
                        </grid>
                    </div>

                    <div class="row">
                        <grid class="input-field" tamanho="12">
                            <button class="btn waves-effect waves-light col s12" v-on:click="cadastro()">Salvar</button>
                        </grid>
                    </div>

                    <div class="row">
                        <grid class="input-field" tamanho="6 m6 l6">
                            <p class="margin medium-small">
                                <router-link class="btn waves-effect waves-light blue"
                                             to="/login">Já possui conta</router-link>
                            </p>
                        </grid>
                    </div>
                </grid>
            </div>
        </span>
    </login-template>

</template>

<script>
import LoginTemplate from "./LoginTemplate";
import Grid from "../components/layouts/Grid";

export default {
    name: "Cadastro",
    components: {Grid, LoginTemplate},
    data() {
        return {
            name: '',
            email: '',
            tipo: '',
            password: '',
            password_confirmation: '',
        }
    },
    methods: {
        cadastro() {
            var self = this
            self.$http.post(self.$urlApi + 'cadastro', {
                name: self.name,
                email: self.email,
                tipo: self.tipo,
                password: self.password,
                password_confirmation: self.password_confirmation,
            })
                .then(function (response) {
                    if (response.data.status) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Usuário cadastrado com sucesso!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        self.$store.commit('setUsuario', response.data.usuario)
                        sessionStorage.setItem('usuario', JSON.stringify(response.data.usuario))
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
                            text: 'Erro ao cadastrar usuário!',
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
    }
}
</script>

<style scoped>

</style>
