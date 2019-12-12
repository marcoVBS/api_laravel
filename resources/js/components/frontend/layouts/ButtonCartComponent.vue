<template>
    <div>
        <button v-if="inCart" class="btn btn-danger" @click.prevent="removeCart">Remover</button>
        <button v-else class="btn btn-info" @click.prevent="addCart">Adicionar</button>
    </div>
</template>

<script>
export default {
    props: ['product'],
    computed: {
        inCart(){
            return this.$store.state.cart.items.indexOf(this.product) > -1
        }
    },
    methods: {
        addCart(){
            this.$store.commit('ADD_PRODUCT_CART', this.product)
        },
        removeCart(){
            this.$store.commit('REMOVE_PRODUCT_CART', this.product)
        }
    },
}
</script>