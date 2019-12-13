import Axios from "axios"

const actions = {
    register(context, params){
        context.commit('CHANGE_PRELOADER', true)

        return new Promise((resolve, reject) => {
            Axios.post('/api/auth/register', params)
                .then(response => {
                    context.commit('AUTH_USER_OK', response.data.user)

                    let token = response.data.access_token

                    localStorage.setItem('TOKEN_AUTH', token)

                    axios.defaults.headers.common = {Authorization : `Bearer ${token}`}

                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
                .finally(() => {
                    context.commit('CHANGE_PRELOADER', false)
                })
        })
    },

    update(context, params){
        context.commit('CHANGE_PRELOADER', true)

        return new Promise((resolve, reject) => {
            Axios.put('/api/auth/update', params)
                .then(response => {
                    context.commit('AUTH_USER_OK', response.data.user)

                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
                .finally(() => {
                    context.commit('CHANGE_PRELOADER', false)
                })
        })
    },
}

export default {
    actions: actions
}