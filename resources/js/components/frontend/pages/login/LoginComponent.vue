<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-8">
                    <div class="card">
                        <div class="card-header">
                            Login
                        </div>
                        <div class="card-body">
                            <form class="form" @submit.prevent="login">
                                <div class="form-group">
                                    <input type="text" class="form-control" v-model="formData.email" placeholder="E-mail">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" v-model="formData.password" placeholder="Senha">
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-success">Entrar</button>
                                    <router-link :to="{name: 'home.register'}">Registrar-se?</router-link>
                                </div>
                            </form>    
                        </div>
                    </div>    
                </div>
            </div>    
        </div>  
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
         login(){
             this.$store.dispatch('login', this.formData)
                .then(() => {
                    this.$router.push({name: 'admin.dashboard'})
                })
                .catch(() => {
                    this.$snotify.error('Falha no login, verifique os dados informados!', "Erro")
                })
         }
    },
}
</script>