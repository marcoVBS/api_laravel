import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'

import AdminComponent from '../components/admin/AdminComponent'
import DashboardComponent from '../components/admin/pages/dashboard/DashboardComponent'
import CategoriesComponent from '../components/admin/pages/categories/CategoriesComponent'
import AddCategoriyComponent from '../components/admin/pages/categories/AddCategoryComponent'
import EditCategoriyComponent from '../components/admin/pages/categories/EditCategoryComponent'
import ProductsComponent from '../components/admin/pages/products/ProductsComponent'
import ProductReportComponent from '../components/admin/pages/reports/ProductReportComponent'

import SiteComponent from '../components/frontend/SiteComponent'
import HomeComponent from '../components/frontend/pages/home/HomeComponent'
import ContactComponent from '../components/frontend/pages/contact/ContactComponent'
import ProductDetailComponent from '../components/frontend/pages/product/ProductDetailComponent'
import CartComponent from '../components/frontend/pages/cart/CartComponent'
import LoginComponent from '../components/frontend/pages/login/LoginComponent'
import RegisterComponent from '../components/frontend/pages/user/RegisterComponent'
import ProfileComponent from '../components/frontend/pages/user/ProfileComponent'

Vue.use(VueRouter)

const routes = [
    {
        path: '/', 
        component: SiteComponent, 
        children: [
            {path: '', component: HomeComponent, name: 'home'},
            {path: 'contato', component: ContactComponent, name: 'home.contact'},
            {path: 'produto/:id', component: ProductDetailComponent, name: 'home.product', props: true},
            {path: 'carrinho', component: CartComponent, name: 'home.cart'},
            {path: 'login', component: LoginComponent, name: 'home.login', meta: {auth: false}},
            {path: 'registro', component: RegisterComponent, name: 'home.register', meta: {auth: false}},
            {path: 'perfil', component: ProfileComponent, name: 'home.profile', meta: {auth: true}},
        ]
    },
    {
        path: '/admin', 
        component: AdminComponent,
        meta: { auth: true },
        children: [
            {path: '', component: DashboardComponent, name: 'admin.dashboard'},
            {path: 'categories', component: CategoriesComponent, name: 'admin.categories'},
            {path: 'categories/create', component: AddCategoriyComponent, name: 'admin.categories.create'},
            {path: 'categories/:id/edit', component: EditCategoriyComponent, name: 'admin.categories.edit', props: true},

            {path: 'products', component: ProductsComponent, name: 'admin.products'},
            {path: 'products-reports', component: ProductReportComponent, name: 'admin.products.report'},
        ],
    },
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    //bloquear únicas rotas rotas 
    if(to.meta.auth && !store.state.login.authenticated){
        store.commit('CHANGE_URL_BACK', to.name)

        return router.push({name: 'home.login'})
    }

    //Bloquear grupos de rotas
    if(to.matched.some(record => record.meta.auth) && !store.state.login.authenticated){
        store.commit('CHANGE_URL_BACK', to.name)

        return router.push({name: 'home.login'})
    }

    //bloquear rota de login para usuário já logado 
    if(to.meta.hasOwnProperty('auth') && !to.meta.auth && store.state.login.authenticated){
        return router.push({name: 'admin.dashboard'})
    }

    next()
})

export default router