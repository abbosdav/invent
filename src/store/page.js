import { ElNotification } from 'element-plus'

export const page = {
    state: () => ({
        pages: [],
        menus: [],
        pageData: {},
        dataTable: []
    }),

    getters:{
        getPages(state){
            return state.pages
        },

        getMenus(state){
            return state.menus
        },
        getPageData(state){
            return state.pageData
        },
        getDataTable(state){
            return state.dataTable
        }
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
            state.menus = [...state.menus, payload]    
        },

        setPageFields (state, payload){
            state.pageData = payload
        },

        setPageTable(state, payload){
            state.dataTable = payload
        },

        setAddItem(state, payload){
            state.dataTable.push(payload)
        },
        setEditItem(state, payload){
            let index = state.dataTable.findIndex(item => item.id == payload.data.id)
            if(index !== -1){
                state.dataTable[index] = payload.data
            }
        },
        setDelItem(state, payload){
            let index = state.dataTable.findIndex(item => item.id == payload.data)
            if(index !== -1){
                state.dataTable.splice(index, 1)
            }
        }
    },

    actions: {
        createPage(context, payload){
            context.commit('setLoader', true)
            context.dispatch('postAxios', {url:'page', data: payload})
            .then(res =>{
                console.log(res.data, 'response')
                context.commit('setPage', res.data)
                context.commit('setLoader', false)
            })
        },

        allPages(context, payload){
            context.commit('setLoader', true)
            context.dispatch('getAxios', {url:'page', query: payload})
            .then(res =>{
                context.commit('setPages', res.data)
                context.commit('setMenus', res.data)   
                setTimeout(()=>{
                    context.commit('setLoader', false)
                }, 500)                              
            })
        },

        pageData(context, payload){
            context.dispatch('getAxios', {url:`page/find/${payload}`}).then(res =>{
                context.commit('setPageFields', res.data)
                context.commit('setPageTable', res.data.datas)
            })
        },
        
        formData(context, payload){
            return context.dispatch('getAxios', {url:`page/find/${payload}`})
        },

        addPageData(ctx, pay){
            ctx.dispatch('postAxios', {url:'page/table/'+pay.id, data: pay.data})
            .then(res=> {
                ctx.commit('setAddItem', res.data) 
                ElNotification({
                    title: 'Успешно добавлен',
                    type: 'success',
                })
            })
        }, 

        editDataTable(ctx, pay){
            ctx.dispatch('putAxios', {url:`page/update/${pay.slug}`, data: pay.data}).then(res=> {
                console.log(res, 'ishladi');
                ctx.commit('setEditItem', {data: res.data})
                ElNotification({
                    title: 'Успешно изменён',
                    type: 'success',
                })
            })
        },

        delDataTable(ctx, pay){
            ctx.dispatch('deleteAxios', {url:`page/delete/${pay.routeId}/${pay.itemId}`})
            .then(res=> {
                ctx.commit('setDelItem', {data: res.data})
                ElNotification({
                    title: 'Успешно удалён',
                    type: 'success',
                })
            })
        },
    }
}
