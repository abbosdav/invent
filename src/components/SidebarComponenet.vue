<template>
    <aside class="aside">
        <!-- <img src="@/assets/logo.png" alt="" class="aside__logo"> -->
        <h3>LOGO COMPANY</h3>
        <el-divider/>
        <div class="aside__menu menu">
            <ul class="menu__list">
                <li class="menu__item" v-for="(item) in menus" @click="toRoure(item._id)" :key="item._id">
                    
                    <el-icon><component :is="item.icon"/></el-icon>
                    <span>
                        {{ item.name }}
                    </span>
                </li>
            </ul>
            <div class="menu__add">
                <el-divider/>
                <router-link to="/settings" class="settings__link">
                    <el-icon><plus/></el-icon>
                    <span>
                        New page
                    </span>
                </router-link> 
            </div>
        </div>

        <div :class="`aside__links ${toggle == 0 ? 'active' : ''}`">
            
        </div>
    </aside>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import store from '@/store';
    import { computed } from '@vue/reactivity';
import router from '@/router';



    const menus = computed({
        get(){
            return store.getters.getMenus
        },
        set(value){
            value
        },
    })

    const toggle = ref(0);
    const toRoure = (id)=>{
        router.push(id)
    }
   
    onMounted(()=> store.dispatch('allPages'))

</script>


<style lang="scss">
@import '@/styles/part/aside.scss';
</style>