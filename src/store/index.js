import { createStore } from 'vuex'
import {modulesList} from './modules.js'


export default createStore({
  state: {
    modal: false,
    load: false,
    query:{},
    counts: 0,
    url: 'http://5.182.26.89:5051',
    header: {},

    count:0
  },

  getters: {
    url(state){
      return state.url
    },

    counts(state){
      return state.counts
    },

    query(state){
      return state.query
    },

    load(state){
      return state.load
    },

    header(state){
      return state.header
    },

    modal(state){
      return state.modal
    },

    getCount(store){
      return store.count
    }
  },

  mutations: {
    setModal(state, payload){
      console.log(payload);
      state.modal = payload
    },

    setLoader(state, payload){
      state.load = payload
    }
  },

  actions: {
    setModal(context,payload){
      context.commit('setModal',payload)
    }
  },
  modules:{
    modulesList, 
  }
})
