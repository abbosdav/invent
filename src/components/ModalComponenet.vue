<template>
    <teleport to="#popup">
        <div class="modal" :class="[modalState ? 'active' : '' ]" v-show="modalState" @click.self="toggle(false)">
            <Transition>
                <div v-if="modalState" class="modal__box active">
                    <slot></slot>
                </div>
            </Transition>
        </div>
    </teleport>
</template>
<script setup>
    import { computed } from "@vue/runtime-core"
    import store from '../store'

    const modalState = computed({
        get() {
           return store.getters.modal
        },
        set(val) {
            val
        }
    })
    const toggle = (val)=>{
        store.commit('setModal', val)
    }
</script>
<style lang="scss">
    @import '@/styles/componenets/modal.scss'
</style>