export default {
    actions: {
        reportsProducts(context){
            context.commit('CHANGE_PRELOADER', true)

            return axios.get('/api/reports-products')
                .finally(()=>{
                    context.commit('CHANGE_PRELOADER', false)
                })
        }
    }
}