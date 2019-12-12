<template>
    <div>
        <h2>Carrinho de compras</h2>

        <div class="row">
            <div v-for="product in productsCart" :key="product.id" class="col-3 text-center">
                <div v-if="product.image">
                    <img :src="[`/storage/products/${product.image}`]" class="img-list" :alt="product.name">
                </div>
                <div v-else>
                    <img src="/img/no-image.png" class="img-list" :alt="product.name">
                </div>
                <p>{{product.name}}</p>
                <button class="btn btn-danger" @click.prevent="removeCart(product)">Remover</button>
                <hr>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    computed: {
        productsCart(){
            return this.$store.state.cart.items
        }
    },
    methods: {
        removeCart(product){
            this.$store.commit('REMOVE_PRODUCT_CART', product)
        }
    },
}
</script>

<style scoped>
.img-list{width: 100px; max-height: 100px;}
</style>