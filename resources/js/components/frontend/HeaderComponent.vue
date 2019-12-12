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
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        cart(){
            return this.$store.state.cart.items
        }
    },
}
</script>