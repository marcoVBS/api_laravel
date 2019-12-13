import Vue from 'vue'
import Vuex from 'vuex'

import Categories from './modules/categories/categories'
import Preloader from './modules/preloader/preloader'
import products from './modules/products/products'
import cart from './modules/cart/cart'
import login from './modules/login/login'
import profile from './modules/users/profile'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        categories: Categories,
        preloader: Preloader,
        products,
        cart,
        login,
        profile
    }
})

export default store