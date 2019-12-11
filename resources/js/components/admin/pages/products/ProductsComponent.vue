<template>
    <div>
        <h1>Listagem de Produtos</h1>  

        <div class="row">
            <div class="col">
                <button class="btn btn-success" @click.prevent="create">Cadastrar</button>
            </div>
            <div class="col">
                <search-component @search="search"></search-component>
            </div>
        </div>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products.data" :key="index">
                    <td>{{ product.id }}</td>
                    <td>
                        <div v-if="product.image">
                            <img :src="[`/storage/products/${product.image}`]" class="img-list" :alt="product.name">
                        </div>
                    </td>
                    <td>{{ product.name }}</td>
                    <td>
                        <a href="#" @click.prevent="edit(product.id)" class="btn btn-info">Editar</a>
                        <a href="#" @click.prevent="comfirmDestroy(product)" class="btn btn-danger" >Deletar</a>
                    </td>
                </tr>
            </tbody>
        </table> 

        <pagination :pagination="products" @paginate="loadProducts" ></pagination>

        <vodal :show="showModal" animation="zoom" :width="600" :height="600" @hide="closeModal">
            <form-product-component :product="product" :update="update" @success="success"></form-product-component>
        </vodal>

    </div>
</template>

<script>
import Vodal from 'vodal';

import PaginationComponent from '../../../layouts/PaginationComponent'
import SearchComponent from '../../layouts/SearchComponent'
import FormProductComponent from './partials/FormProductComponent'

export default {
    created(){
        this.loadProducts(1)
    },
    data() {
        return {
            dataSearch: '',
            showModal: false,
            product: {
                id: '',
                name: '',
                description: '',
                category_id: ''
            },
            update: false
        }
    },
    computed: {
        products(){
            return this.$store.state.products.items
        },
        params(){
            return {
                page: this.products.current_page,
                filter: this.dataSearch
            }
        }
    },
    methods:{
        loadProducts(page){
            this.$store.dispatch('loadProducts', {...this.params, page})
        },
        search(filter){
            this.dataSearch = filter
            this.loadProducts(1)
        },
        create(){
            this.update = false
            this.reset()
            this.showModal = true
        },
        reset(){
            this.product = {
                id: '',
                name: '',
                description: '',
                category_id: ''
            }
        },
        closeModal(){
            this.showModal = false
        },
        success(){
            this.closeModal()
            this.loadProducts(1)
        },
        edit(id){
            this.reset()

            this.$store.dispatch('loadProduct', id)
                .then(response => {
                    this.product = response
                    this.showModal = true
                    this.update = true
                })
                .catch(error => {
                    this.$snotify.error('Erro ao carregar produto.', 'Erro')
                })
        },
        comfirmDestroy(product){
            this.$snotify.error(`Deseja realmente deletar o produto: ${product.name}`, 'Deletar?', {
                timeout: 10000,
                closeOnClick: true,
                buttons: [
                    {text: 'Não', action: (toast) => this.$snotify.remove(toast.id)},
                    {text: 'Sim', action: (toast) => {this.$snotify.remove(toast.id); setTimeout(() => {
                        this.destroy(product)
                    }, 500); }},
                ]
            })
        },
        destroy(product){
            this.$store.dispatch('destroyProduct', product.id)
            .then(() => {
                this.$snotify.success(`Sucesso ao deletar o produto: ${product.name}.`)

                this.loadProducts(1)
            })
            .catch(error => {
                this.$snotify.error('Falha ao deletar produto.', 'Erro')
            })
        },
    },
    components: {
        pagination: PaginationComponent,
        SearchComponent,
        Vodal,
        FormProductComponent
    }
}
</script>

<style scoped>
.img-list{width: 100px;}
</style>