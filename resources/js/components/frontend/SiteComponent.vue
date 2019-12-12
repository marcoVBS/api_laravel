<template>
    <div>
        
        <header-component></header-component>

        <router-view></router-view>

        <footer-component></footer-component>

    </div>
</template>

<script>
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'

export default {
    components: {
        FooterComponent,
        HeaderComponent
    }
}
</script>