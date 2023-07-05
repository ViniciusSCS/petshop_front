import Vue from 'vue'
import Router from 'vue-router'
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Cadastro from "../template/Cadastro";
import Pets from "../pages/pets/Pets";
import Procedimentos from "../pages/procedimentos/Procedimentos";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/cadastro',
            name: 'Cadastro',
            component: Cadastro
        },
        {
            path: '/pet/cadastro',
            name: 'Cadastro',
            component: Pets
        },
        {
            path: '/pet/editar/:id',
            name: 'Editar',
            component: Pets
        },
        {
            path: '/procedimento/cadastro/:id',
            name: 'Cadastro',
            component: Procedimentos
        },
        // {
        //     path: '/medicamento/cadastro',
        //     name: 'Cadastro',
        //     component: Medicamento
        // },
    ]
})
