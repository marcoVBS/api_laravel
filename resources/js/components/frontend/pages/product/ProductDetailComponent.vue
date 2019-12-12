<template>
    <div>
        <h1>{{product.name}}</h1>
        <div v-if="product.image">
            <img :src="[`/storage/products/${product.image}`]" class="img-product" :alt="product.name">
        </div>
        <div v-else>
            <img src="/img/no-image.png" class="img-product" :alt="product.name">
        </div>
        <p>{{product.description}}</p>
    </div>
</template>

<script>
export default {
    props: ['id'],
    created(){
        this.loadProduct()
    },
    data() {
        return {
            product: {}
        }
    },
    methods: {
        loadProduct(){
            this.$store.dispatch('loadProduct', this.id)
                .then(response => {
                    this.product = response
                })
        }
    },
}
</script>

<style scoped>
.img-product{width: 500px; max-height: 500px;}
</style>