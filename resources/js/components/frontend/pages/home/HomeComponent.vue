<template>
    <div>
        <h1>Produtos</h1>

        <search-component @search="search"></search-component>

        <div class="row">
            <div v-for="product in products.data" :key="product.id" class="col-3 text-center">
                <router-link :to="{name: 'home.product', params: {id: product.id}}">
                    <div v-if="product.image">
                        <img :src="[`/storage/products/${product.image}`]" class="img-list" :alt="product.name">
                    </div>
                    <div v-else>
                        <img src="/img/no-image.png" class="img-list" :alt="product.name">
                    </div>
                    <p>{{product.name}}</p>
                </router-link>
                <button-cart :product="product"></button-cart>
            </div>
        </div>
        
        <pagination-component :pagination="products" @paginate="loadProducts"></pagination-component>

    </div>
</template>

<script>
import PaginationComponent from '../../../layouts/PaginationComponent'
import SearchComponent from './partials/SearchComponent';
import ButtonCartComponent from '../../layouts/ButtonCartComponent'

export default {
    created(){
        if(this.products.data.length == 0)
            this.loadProducts()
    },
    data() {
        return {
            searchData: '',
            category_id: ''
        }
    },
    computed: {
        products(){
            return this.$store.state.products.items
        },
        params(){
            return {
                filter: this.searchData,
                category_id: this.category_id,
                page: this.products.current_page,
            }
        }
    },
    methods: {
        loadProducts(page = 1){
            this.$store.dispatch('loadProducts', {...this.params, page})
        },
        search(values){
            this.searchData = values.filter
            this.category_id = values.category_id

            this.loadProducts()
        }
    },
    components:{
        PaginationComponent,
        SearchComponent,
        ButtonCart: ButtonCartComponent
    }
}
</script>

<style scoped>
.img-list{width: 100px; max-height: 100px;}
</style>