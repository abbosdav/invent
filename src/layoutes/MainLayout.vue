<template>
    <div class="common-layout main">
      <el-aside class="sidebar">
        <sidebar-componenet/>
      </el-aside>
      <section class="wrapper">
        <el-header>
          <header-componenet/>
        </el-header>
        <el-main id="main">
          <router-view/>
        </el-main>
      </section>
    </div>
  </template>
<script>
import SidebarComponenet from '@/components/SidebarComponenet.vue';
import HeaderComponenet from '@/components/HeaderComponenet.vue';
export default{
    components:{
        HeaderComponenet,
        SidebarComponenet,
    },
    computed: {
       
    },
    watch:{
        $route(){
        document.getElementById('main').scrollTo(0,0)
        }
    }
}
</script>
<style lang="scss">
    @import '../styles/layoutes/main.scss'
</style>
