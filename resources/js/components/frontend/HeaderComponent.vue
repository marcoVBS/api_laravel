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

            <li class="nav-item dropdown show" v-if="user.name">

                <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Olá {{ user.name }}
                </a>

                <div class="dropdown-menu" arial-labelledby="dropdownMenuLink">
                    <router-link class="dropdown-item" :to="{name: 'admin.dashboard'}">Dashboard</router-link>
                    <router-link class="dropdown-item" :to="{name: 'home.profile'}">Meu perfil</router-link>
                    <a href="#" class="dropdown-item" @click.prevent="logout">Sair</a>
                </div>

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