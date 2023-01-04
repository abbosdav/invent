<template>
    <div class="pages">
        <div class="pages__header">
            <div class="pages__actions">
                <el-button>Default</el-button>
                <el-button type="primary">Primary</el-button>
                <el-button type="success">Success</el-button>
                <el-button type="info">Info</el-button>
                <el-button type="warning">Warning</el-button>
                <el-button type="danger">Danger</el-button>
            </div>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-button type="primary" :icon="More" circle />
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="openModal(true)">Form sozlamasi</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <modal-componenet/>
</template>
<script setup>
import ModalComponenet from '@/components/ModalComponenet.vue';
import store from '@/store';
import {More} from '@element-plus/icons-vue'

const openModal =(val)=>{
    console.log(val);
    store.commit('setModal', val)
}



</script>
<style lang="scss">
@import '../../src/styles/views/pages.scss';

</style>