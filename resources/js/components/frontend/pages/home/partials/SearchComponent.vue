<template>
    <div>
        <form class="form form-inline" @submit.prevent="search">
           
            <select v-model="category_id" class="form-control">
                <option value="">Selecione</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>

            <input type="text" v-model="filter" placeholder="Pesquisar" class="form-control mr-sm-2">

            <button type="submit" class="btn btn-outline-success">Pesquisar:</button>    
        </form>    
    </div>
</template>

<script>
export default {
    data() {
        return {
            filter: '',
            category_id: ''
        }
    },
    computed: {
        categories(){
            return this.$store.state.categories.items.data
        }
    },
    methods: {
        search(){
            this.$emit('search', {
                filter: this.filter,
                category_id: this.category_id
            })
        }
    },
}
</script>