<template>
    <div>
        <ul class="nav">
            <li class="nav-item">
                <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'home.contact'}" class="nav-link">Contato</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'home.cart'}" class="nav-link">carrinho({{cart.length}})</router-link>
            </li>
            <li class="nav-item" v-if="user.name">
                <router-link :to="{name: 'admin.dashboard'}" class="nav-link">Olá {{ user.name }} (<a @click.prevent="logout">Sair</a>)</router-link>
            </li>
            <li class="nav-item" v-else>
                <router-link :to="{name: 'home.login'}" class="nav-link">Login</router-link>
            </li>
        </ul><hr>
    </div>
</template>

<script>
export default {
    computed: {
        cart(){
            return this.$store.state.cart.items
        },
        user(){
            return this.$store.state.login.me
        }
    },
    methods: {
        logout(){
            this.$store.dispatch('logout')
        }
    },
}
</script>