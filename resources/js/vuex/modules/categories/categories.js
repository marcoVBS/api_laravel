export default {
    state:{
        items: {
            data: []
        }
    },
    mutations: {
        LOAD_CATEGORIES(state, categories){
            state.items = categories
        }
    }, 
    actions:{
        loadCategories(context, params){
            context.commit('CHANGE_PRELOADER', true)

            axios.get('/api/categories', {params})
                .then(response => {
                    context.commit('LOAD_CATEGORIES', response)
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    context.commit('CHANGE_PRELOADER', false)
                })
        },

        loadCtegory(context, id){
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.get(`/api/categories/${id}`)
                    .then(response => resolve(response.data) )
                    .catch(error => reject(error) )
                    .finally(() => {
                        context.commit('CHANGE_PRELOADER', false)
                    })
            })
        },

        storeCategory(context, params){
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.post('/api/categories', params)
                    .then(response => resolve() )
                    .catch(error => reject(error) )
                    .finally(() => {
                        context.commit('CHANGE_PRELOADER', false)
                    })
            })

        },

        updateCategory(context, params){
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.put(`/api/categories/${params.id}`, params)
                    .then(response => resolve() )
                    .catch(error => reject(error) )
                    .finally(() => {
                        context.commit('CHANGE_PRELOADER', false)
                    })
            })
        },

        destroyCategory(context, id){
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.delete(`/api/categories/${id}`)
                    .then(response => resolve() )
                    .catch(error => reject(error) )
                    .finally(() => {
                        context.commit('CHANGE_PRELOADER', false)
                    })
            })
        }

    },
    getters: {
        
    }
}