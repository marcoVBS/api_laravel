import Vue from 'vue'
import VueRouter from 'vue-router'

import AdminComponent from '../components/admin/AdminComponent'
import DashboardComponent from '../components/admin/pages/dashboard/DashboardComponent'
import CategoriesComponent from '../components/admin/pages/categories/CategoriesComponent'
import AddCategoriyComponent from '../components/admin/pages/categories/AddCategoryComponent'
import EditCategoriyComponent from '../components/admin/pages/categories/EditCategoryComponent'
import ProductsComponent from '../components/admin/pages/products/ProductsComponent'

import SiteComponent from '../components/frontend/SiteComponent'
import HomeComponent from '../components/frontend/pages/home/HomeComponent'
import ContactComponent from '../components/frontend/pages/contact/ContactComponent'
import ProductDetailComponent from '../components/frontend/pages/product/ProductDetailComponent'
import CartComponent from '../components/frontend/pages/cart/CartComponent'

Vue.use(VueRouter)

const routes = [
    {
        path: '/', 
        component: SiteComponent, 
        children: [
            {path: '', component: HomeComponent, name: 'home'},
            {path: 'contato', component: ContactComponent, name: 'home.contact'},
            {path: 'produto/:id', component: ProductDetailComponent, name: 'home.product', props: true},
            {path: 'carrinho', component: CartComponent, name: 'home.cart'}
        ]
    },
    {
        path: '/admin', 
        component: AdminComponent,
        children: [
            {path: '', component: DashboardComponent, name: 'admin.dashboard'},
            {path: 'categories', component: CategoriesComponent, name: 'admin.categories'},
            {path: 'categories/create', component: AddCategoriyComponent, name: 'admin.categories.create'},
            {path: 'categories/:id/edit', component: EditCategoriyComponent, name: 'admin.categories.edit', props: true},

            {path: 'products', component: ProductsComponent, name: 'admin.products'},
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router