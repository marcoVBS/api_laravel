import Axios from "axios";

const CONFIGS = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

export default {
    
    loadProducts(context, params){
        context.commit('CHANGE_PRELOADER', true)

        Axios.get('/api/products', {params})
            .then(response => {
                context.commit('LOAD_PRODUCTS', response.data)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                context.commit('CHANGE_PRELOADER', false)
            })
    },

    loadProduct(context, id){
        context.commit('CHANGE_PRELOADER', true)

        return new Promise((resolve, reject) => {
            axios.get(`/api/products/${id}`)
                .then(response => resolve(response.data) )
                .catch(error => reject(error) )
                .finally(() => {
                    context.commit('CHANGE_PRELOADER', false)
                })
        })
    },

    storeProduct(context, formData){
        context.commit('CHANGE_PRELOADER', true)

        return new Promise((resolve, reject) => {
            axios.post('/api/products', formData, CONFIGS)
                .then(response => resolve() )
                .catch(error => reject(error) )
                .finally(() => {
                    context.commit('CHANGE_PRELOADER', false)
                })
        })
    },

    updateProduct(context, formData){
        context.commit('CHANGE_PRELOADER', true)

        formData.append('_method', 'PUT')
        return new Promise((resolve, reject) => {
            axios.post(`/api/products/${formData.get('id')}`, formData, CONFIGS)
                .then(response => resolve() )
                .catch(error => reject(error) )
                .finally(() => {
                    context.commit('CHANGE_PRELOADER', false)
                })
        })
    },

    destroyProduct(context, id){
        context.commit('CHANGE_PRELOADER', true)

        return new Promise((resolve, reject) => {
            axios.delete(`/api/products/${id}`)
                .then(() => resolve() )
                .catch(error => reject(error) )
                .finally(() => {
                    context.commit('CHANGE_PRELOADER', false)
                })
        })
    }

}