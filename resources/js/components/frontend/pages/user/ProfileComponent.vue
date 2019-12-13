<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-8">
                    <div class="card">
                        <div class="card-header">
                            Atualizar perfil
                        </div>
                        <div class="card-body">
                            <form class="form" @submit.prevent="updateProfile">
                                <user-form :user="formData" :errors="errors"></user-form>
                            </form>    
                        </div>
                    </div>    
                </div>
            </div>    
        </div>  
    </div>
</template>

<script>
import FormUserComponent from './partials/FormUserComponent'

export default {
    data() {
        return {
            errors: {}
        }
    },
    computed: {
        formData(){
            return this.$store.state.login.me
        }
    },
    methods: {
        updateProfile(){
            this.$store.dispatch('update', this.formData)
                .then(() => {
                    this.$router.push({name: 'admin.dashboard'})
                    this.$snotify.success('Perfil atualizado com sucesso!')
                })
                .catch(error => {
                    this.errors = error.response.data.errors
                })
        }
    },
    components: {
        UserForm: FormUserComponent
    }
}
</script>