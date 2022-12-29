<template>
    <header class="header">
        <el-container>
            <h2>Hayrli kech Adminbek</h2>
            <el-input class="ml-a" v-model="search" placeholder="Qidiruv" clearable />
            <el-button class="ml-1">
                <el-icon><bell/></el-icon>
            </el-button>
            <el-button type="warning"  @click="exit()">
                <el-icon><switch-button/></el-icon>
            </el-button>
        </el-container>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import cookie from 'vue-cookies'
import router from '@/router';
const search = ref('')

const exit = ()=>{
    ElMessageBox.confirm(
    'Siz tizimdan chiqmoqchimisiz?',
    'Warning',
    {
      confirmButtonText: 'Ha',
      cancelButtonText: "Yo'q",
      type: 'warning',
      
    })
    .then(() => {
        router.push('/login')
        cookie.remove('token')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: "Operatsiya to'xtatildi",
      })
    })
}

</script>

<style lang="scss">
@import '@/styles/part/header.scss';
</style>