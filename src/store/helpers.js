import axios from "axios"
import cookie from 'vue-cookies'
import { ElNotification } from 'element-plus'
 

export const helpers = {
    actions: {
        getAxios(context,payload){
            return axios.get(`${context.getters.url}/${payload.url}`,{
                params: payload.search,
                headers:{'Content-Type': 'application/json','Authorization' : cookie.get('token')}
            })
            .catch(e => {
                ElNotification({
                    title: e.response.data.message,
                    type: 'error',
                })
            })
        },

        postAxios(context,payload){
            return axios.post(`${context.getters.url}/${payload.url}`, payload.data, {
                headers:{'Content-Type': 'application/json','Authorization' : cookie.get('token')}})
            .catch(e => {
                console.log(e.response)
                ElNotification({
                    title: e.response.data.message,
                    type: 'error',
                })
            })
        },

        deleteAxios(context, payload){
            return axios.delete(`${context.getters.url}/${payload.url}`, {
                headers:{'Content-Type': 'application/json','Authorization' : cookie.get('token')}})
            .catch(e => {
                ElNotification({
                    title: e.response.data.message,
                    type: 'error',
                })
            })
        },

        putAxios(context,payload){
            return axios.put(`${context.getters.url}/${payload.url}`, payload.data,{
                headers:{'Content-Type': 'application/json','Authorization' : cookie.get('token')}})
            .catch(e => {
                ElNotification({
                    title: e.response.data.message,
                    type: 'error',
                })
            })
        }
    }
}


