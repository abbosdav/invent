
export const page = {
    state: () => ({
        pages: [],
        menus: [],
    }),

    getters:{
        getPages(state){
            return state.pages
        },

        getMenus(state){
            return state.menus
        },
    },

    mutations:{
        setPages(state, payload){
            state.pages = [{
                _id: '',
                name: "Asosiy menu"
            },...payload]
            
            
        },

        setMenus(state, payload){
            state.menus = payload   
        },

        setPage(state, payload){
            state.pages = [...state.pages, payload]
        },
    },

    actions: {
        createPage(context, payload){
            context.commit('setLoader', true)
            console.log(payload, 'hey');
            context.dispatch('postAxios', {url:'page', data: payload})
            .then(res =>{
                context.commit('setPage', res.data)
                context.commit('setLoader', false)
            })
        },

        allPages(context, payload){
            context.commit('setLoader', true)
            context.dispatch('getAxios', {url:'page', query: payload})
            .then(res =>{
                console.log(res.data);
                setTimeout(()=>{
                    context.commit('setLoader', false)
                },500 )
                context.commit('setPages', res.data)
                context.commit('setMenus', res.data)
                
               

                // context.commit('setLoader', false)
            })
        },
    }
}
