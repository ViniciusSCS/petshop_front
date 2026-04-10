import Vue from 'vue'
import Router from 'vue-router'
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Cadastro from "../template/Cadastro";
import Pets from "../pages/pets/Pets";
import Procedimentos from "../pages/procedimentos/Procedimentos";
import Medicamento from "../pages/medicamento/Medicamento.vue";

Vue.use(Router)

const router = new Router({
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
            name: 'PetsCadastro',
            component: Pets
        },
        {
            path: '/pet/editar/:id',
            name: 'Editar',
            component: Pets
        },
        {
            path: '/procedimento/cadastro/:id',
            name: 'ProcedimentoCadastro',
            component: Procedimentos,
            meta: { requiresAuth: true, requiresVet: true }
        },
        {
            path: '/medicamento/cadastro',
            name: 'MedicamentoCadastro',
            component: Medicamento,
            meta: { requiresAuth: true, requiresVet: true }
        },
    ]
})

router.beforeEach((to, from, next) => {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'))

    if (to.path === '/cadastro') {
        return next()
    }

    // 🔐 precisa estar logado
    if (to.meta.requiresAuth && !usuario) {
        return next('/login')
    }

    // 🧠 precisa ser veterinário
    if (to.meta.requiresVet && Number(usuario.tipo_id) !== 1) {
        return next('/')
    }

    next()
})

export default router
