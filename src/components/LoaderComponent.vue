<template>
    <div class="loader" v-loading.fullscreen.lock="fullscreenLoading"></div>
</template>
<script setup>
// import { ElLoading } from 'element-plus'
import store from '@/store';
import { computed} from 'vue'


const fullscreenLoading = computed(()=>{
    return store.getters.load
})




</script>