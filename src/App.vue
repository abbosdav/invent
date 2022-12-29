<template>
  <component :is="layout"/>
</template>
<script>
import { useRoute } from 'vue-router';
import { computed, onMounted } from '@vue/runtime-core';
import cookie from 'vue-cookies'
import EmptyLayout from './layoutes/EmptyLayout.vue';
import MainLayout from './layoutes/MainLayout.vue';
import router from './router';
import store from './store';

export default{
  components:{
    EmptyLayout,
    MainLayout
  },
  setup(){
    const route = useRoute()
    const layout = computed(()=> route.meta.layout + '-layout')
    const checkUser = ()=>{
      if(cookie.isKey('token')){
        let token = cookie.get('token')
        store.dispatch('check', token)
      }else{
        router.push('/login')
      }
    }

    onMounted(()=>{
      document.title = 'CRM - inventory'
      checkUser()
    })

    return{
      layout
    }
  }
}
</script>
<style lang="scss">
  @import './styles/settings/reset.scss';
  @import './styles/settings/grid.scss';
  @import './styles/lib/class.scss';
  @import './styles/main.scss';
</style>
