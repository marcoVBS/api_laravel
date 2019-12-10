<template>
    <div class="preloader" v-show="preloader">
        <img src="/img/preloader.gif" alt="Preloader">
    </div>
</template>

<script>
export default {
    computed:{
        preloader(){
            return this.$store.state.preloader.loading
        }
    }
}
</script>

<style scoped>
.preloader{background: #fff; position: absolute; z-index: 999; width: 100%; height: 100%; margin: 0; text-align: center;}
.preloader img{max-width: 500px;}
</style>