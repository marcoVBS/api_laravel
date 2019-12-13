export default {
    state: {
        me: {},
        authenticated: false,
        urlBack: 'home'
    },
    mutations: {
        AUTH_USER_OK(state, user){
            state.authenticated = true
            state.me = user
        },
        CHANGE_URL_BACK(state, url){
            state.urlBack = url
        },
        AUTH_USER_LOGOUT(state){
            state.me = {}
            state.authenticated = false
        }
    },
    actions: {
        login(context, params){
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                axios.post('/api/auth/login', params)
                    .then(response => {
                        context.commit('AUTH_USER_OK', response.data.user)

                        localStorage.setItem('TOKEN_AUTH', response.data.access_token)

                        let token = localStorage.getItem('TOKEN_AUTH')
                        axios.defaults.headers.common = {Authorization : `Bearer ${token}`}

                        resolve()
                    })
                    .catch(() => reject() )
                    .finally(() => {
                        context.commit('CHANGE_PRELOADER', false)
                    })
            })            
        },

        checkLogin(context){
            context.commit('CHANGE_PRELOADER', true)

            return new Promise((resolve, reject) => {
                const token = localStorage.getItem('TOKEN_AUTH')
                if(!token)
                    return reject()
                
                axios.get('/api/auth/me')
                    .then(response => {
                        context.commit('AUTH_USER_OK', response.data)                       

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

        logout(context){
            
            axios.post('/api/auth/logout')
                .then(() => {
                    context.commit('AUTH_USER_LOGOUT')
                    localStorage.removeItem('TOKEN_AUTH')
                })
                .catch(error => {
                    console.log(error)
                })
            
        }
    }
}