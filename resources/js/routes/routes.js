import Vue from 'vue'
import VueRouter from 'vue-router'

import AdminComponent from '../components/admin/AdminComponent'
import DashboardComponent from '../components/admin/pages/dashboard/DashboardComponent'
import CategoriesComponent from '../components/admin/pages/categories/CategoriesComponent'
import AddCategoriyComponent from '../components/admin/pages/categories/AddCategoryComponent'
import EditCategoriyComponent from '../components/admin/pages/categories/EditCategoryComponent'

Vue.use(VueRouter)

const routes = [
    {
        path: '/admin', 
        component: AdminComponent,
        children: [
            {path: '', component: DashboardComponent, name: 'admin.dashboard'},
            {path: 'categories', component: CategoriesComponent, name: 'admin.categories'},
            {path: 'categories/create', component: AddCategoriyComponent, name: 'admin.categories.create'},
            {path: 'categories/:id/edit', component: EditCategoriyComponent, name: 'admin.categories.edit', props: true},
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router