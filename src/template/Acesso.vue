<template>
    <div id="login-page" class="row">
        <grid class="z-depth-6 card-panel" tamanho="12">
            <div class="row">
                <grid class="input-field" tamanho="12">
                    <i class="material-icons prefix">mail_outline</i>
                    <label for="email" data-error="wrong" data-success="right">E-mail</label>
                    <input class="validate" id="email" type="email" v-model="email">
                </grid>
            </div>

            <div class="row">
                <grid class="input-field" tamanho="12">
                    <i class="material-icons prefix">lock_outline</i>
                    <label for="password">Senha</label>
                    <input class="validate" min="6" id="password" type="password" v-model="password">
                </grid>
            </div>

            <div class="row">
                <grid class="input-field login-text" tamanho="12 m12 l12">
                    <label>
                        <input type="checkbox"/>
                        <span>Manter Conectado</span>
                    </label>
                </grid>
            </div>

            <div class="row">
                <grid class="input-field" tamanho="12">
                    <botao acao="entrar"
                           tipo_icone="fas"
                           icone="paper-plane"
                           tamanho="s12"
                           v-on:click.native="acessar()">
                    </botao>
                </grid>
            </div>

            <div class="row">
                <grid class="input-field" tamanho="6 m6 l6">
                    <p class="margin medium-small">
                        <router-link class="btn waves-effect waves-light blue" to="/cadastro">Criar nova conta
                        </router-link>
                    </p>
                </grid>
            </div>
        </grid>
    </div>
</template>

<script>
import Grid from "../components/layouts/Grid";
import Botao from "../components/layouts/Botao";

export default {
    name: "Acesso",
    components: {Botao, Grid},
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        acessar() {
            var self = this

            self.$http.post(self.$urlApi + 'login', {
                email: self.email,
                password: self.password
            })
                .then(function (response) {
                    if (response.data.status) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Usuário ' + response.data.usuario.name + ' logado com sucesso!!',
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
                        self.$router.push('/')
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Nome de usuário ou senha incorretos. Por favor tente novamente!',
                        })
                        self.$router.push('/')
                    }
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'ERRO, tente novamente mais tarde!',
                    })
                    self.$router.push('/')
                })
        }
    }
}
</script>

<style scoped>

</style>
