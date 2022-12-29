<template>
  <modal-componenet>
    <div class="modal__header">
      <div class="modal__title">
          FOYDALANUVCHI QO'SHISH
      </div>
      <div @click="toggle(false)" class="modal__closeBtn">
          <el-icon><Close /></el-icon>
      </div>
    </div>
    <div class="modal__body">
      <el-button @click="toggle(false)">
       Cancel
      </el-button>
    </div>
  </modal-componenet>
  <loader-component></loader-component>
</template>

<script setup>
import loaderComponent from "@/components/LoaderComponent.vue";
import modalComponenet from "@/components/ModalComponenet.vue";

import store from "@/store";

const toggle = (val)=>{
  console.log(val);
  store.commit('setModal', val)
}



</script>
<style lang="scss">

</style>
