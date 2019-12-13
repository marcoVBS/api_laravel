<template>
    <div>
        <div :class="['form-group', {'hasError' : errors.name}]">
            <div v-if="errors.name">{{ errors.name[0] }}</div>
            <input type="text" class="form-control" v-model="user.name" placeholder="Nome">
        </div>
        <div :class="['form-group', {'hasError' : errors.email}]">
            <div v-if="errors.email">{{ errors.email[0] }}</div>
            <input type="email" class="form-control" v-model="user.email" placeholder="E-mail">
        </div>
        <div :class="['form-group', {'hasError' : errors.password}]">
            <div v-if="errors.password">{{ errors.password[0] }}</div>
            <input type="password" class="form-control" v-model="user.password" placeholder="Senha">
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-success">Enviar</button>
        </div>   
    </div>
</template>

<script>
export default {
    props: ['user', 'errors']
}
</script>

<style scoped>
.hasError{color: red;}
.hasError input{border: 1px solid red;}
</style>