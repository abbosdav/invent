import cookie from 'vue-cookies'
import router from '@/router'

export const login = {
    state: () => ({
        user: {},
    }),

    getters:{
        getUser(state){
            return state.user
        },
    },

    mutations:{
        setUser(state, payload){
            state.user = payload
        },
    },

    actions: {
        login(context, payload){
            context.commit('setLoader', true)
            context.dispatch('postAxios', {url:'auth/login', data: payload})
            .then(res =>{
                context.commit('setUser', res.data.user)
                cookie.set('token', `Bearer ${res.data.token}`,'12h')
                router.push('/')
                setTimeout(()=>{
                    context.commit('setLoader', false)
                }, 1000)
            })
        },
        
        check(context){
            context.dispatch('getAxios', {url:'auth/getuser'})
            .then(res=>{
                context.commit('setUser', res.data.user)
                cookie.set('token', `Bearer ${res.data.token}`,'12h')
            })
            
        }
    }
}
