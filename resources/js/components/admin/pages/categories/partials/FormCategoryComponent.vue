<template>
    <div>

        <form class="form" @submit.prevent="onSubmit">
            <div :class="['form-group', {'hasError' : errors.name}]">
                <div v-if="errors.name">{{ errors.name[0] }}</div>
                <input type="text" v-model="category.name" class="form-control" placeholder="Nome da categoria">
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Enviar</button>
            </div>
        </form>
        
    </div>
</template>

<script>
export default {
    props: {
        category: {
            require: false,
            type: Object|Array,
            default: () => {
                return {
                    id: '',
                    name: ''
                }
            }
        },
        updating: {
            require: false,
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            errors: {}
        }
    },
    methods: {
        onSubmit(){
            const action = this.updating ? 'updateCategory' : 'storeCategory'
            
            this.$store.dispatch(action, this.category)
                .then(() => {
                    this.$snotify.success('Sucesso ao cadastrar!')

                    this.$router.push({ name: 'admin.categories' })
                })
                .catch(error => {
                    this.$snotify.error('Falha ao cadastrar!', 'Erro')

                    this.errors = error.response.data.errors
                })
        }
    },
}
</script>

<style scoped>
.hasError{color: red;}
.hasError input{border: 1px solid red;}
</style>