require('./bootstrap');
window.Vue = require('vue');

import Snotify from 'vue-snotify'

import router from './routes/routes'
import store from './vuex/store'

Vue.use(Snotify)

Vue.component('preloader-component', require('./components/layouts/PreloaderComponent').default);

const app = new Vue({
    router,
    store,
    el: '#app',
});

store.dispatch('loadCategories')

store.dispatch('checkLogin')
    .then(() => {
        router.push({name: store.state.login.urlBack})
    })