<template>
    <div>
        <h1>Edição de categoria</h1>

        <form-category-component 
            :category="category" 
            :updating="true">
        </form-category-component>

    </div>
</template>

<script>
import FormCategoryComponent from './partials/FormCategoryComponent'

export default {
    props: {
        id: {
            require: true
        }
    },
    created(){
        this.$store.dispatch('loadCtegory', this.id)
            .then(response => { this.category = response })
            .catch(error => {
                this.$snotify.error('Categoria não encontrada.', '404')
                
                this.$router.push({name: 'admin.categories'})
            })
    },
    data() {
        return {
            category: {}
        }
    },
    components: {
        FormCategoryComponent
    },
}
</script>

<style scoped>

</style>