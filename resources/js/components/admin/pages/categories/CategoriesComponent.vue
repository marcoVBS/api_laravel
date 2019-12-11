<template>
    <div>
        <h1>Listagem de categorias</h1>

        <div class="row">
            <div class="col">
                <router-link :to="{name: 'admin.categories.create'}" class="btn btn-success">Cadastrar</router-link>
            </div>
            <div class="col">
                <search @search="search" ></search>
            </div>
        </div>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category, index) in categories.data" :key="index">
                    <th>{{ category.id }}</th>
                    <th>{{ category.name }}</th>
                    <th>
                        <router-link :to="{name: 'admin.categories.edit', params : {id: category.id}}" class="btn btn-info">Editar</router-link>
                        <a href="#" class="btn btn-danger" @click.prevent="comfirmDestroy(category)" >Deletar</a>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import SearchComponent from '../../layouts/SearchComponent'

export default {
    created(){
        this.loadCategories()
    },
    data() {
        return {
            name: ''
        }
    },
    computed: {
        categories(){
            return this.$store.state.categories.items
        }
    },
    methods: {
        loadCategories(){
            this.$store.dispatch('loadCategories', {name : this.name})
        },
        comfirmDestroy(category){
            this.$snotify.error(`Deseja realmente deletar a categoria: ${category.name}`, 'Deletar?', {
                timeout: 10000,
                closeOnClick: true,
                buttons: [
                    {text: 'Não', action: (toast) => this.$snotify.remove(toast.id)},
                    {text: 'Sim', action: (toast) => {this.$snotify.remove(toast.id); setTimeout(() => {
                        this.destroy(category)
                    }, 500); }},
                ]
            })
        },
        destroy(category){
            this.$store.dispatch('destroyCategory', category.id)
            .then(() => {
                this.$snotify.success(`Sucesso ao deletar a categoria: ${category.name}.`)

                this.loadCategories()
            })
            .catch(error => {
                console.log(error)

                this.$snotify.error('Falha ao deletar categoria.', 'Erro')
            })
        },
        search(filter){
            this.name = filter

            this.loadCategories()
        }
    },
    components: {
        search: SearchComponent
    }
}
</script>

<style>
    
</style>