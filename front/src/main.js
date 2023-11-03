// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import axios from 'axios'
import lodash from 'lodash'
import router from './router'
import Datepicker from 'vuejs-datepicker';

Vue.use(Vuex, lodash)
Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$urlApi = 'http://projeto_petshop.test:8010/api/'

var store = {
    state: {
        pets: [],
        titulo: 'AC - PetShop',
        usuario: sessionStorage.getItem('usuario') ?
            JSON.parse(sessionStorage.getItem('usuario')) : null,
    },
    getters: {
        getUsuario: state => {
            return state.usuario
        },

        getToken: state => {
            return state.usuario.token
        },

        getPets: state => {
            return state.pets
        },

        getTitulo: state => {
            return state.titulo
        }
    },
    mutations: {
        setUsuario(state, n) {
            state.usuario = n
        },

        setPets(state, n) {
            state.pets = n
        },
    },
}

new Vue({
    el: '#app',
    router,
    components: {App, Datepicker},
    template: '<App/>',
    store: new Vuex.Store(store)
})
