<template>
    <div class="settings">
        <h2 class="settings__title">
         SAHIFA QO'SHISH
        </h2>
        <div class="settings__fields">
            <el-form
                ref="pageRef"
                :model="page"
                label-width="100px"
                label-position="top"
            >
                <el-form-item
                    label="Icon nomini kiriting."
                    prop="icon"
                    :rules="[{ required: true, message: 'Icon nomi to\'ldirilmagan' }]"
                    >
                        <el-input
                            v-model="page.icon"
                            type="text"
                            autocomplete="off"
                        />
                </el-form-item>
                <el-form-item
                    label="Sahifa nomini kiriting."
                    prop="name"
                    :rules="[{ required: true, message: 'Sahifa nomi to\'ldirilmagan' }]"
                    >
                        <el-input
                            v-model="page.name"
                            type="text"
                            autocomplete="off"
                        />
                </el-form-item>
                <!-- <el-form-item
                label="Sahifa slug nomi (lotin harflarida)."
                prop="slug"
                :rules="[
                    { required: true, message: 'Slug nomi to\'ldirilmagan' }
                ]"
                >
                    <el-input
                        v-model="page.slug"
                        type="text"
                        autocomplete="off"
                        @input="checkLetter(page.name)"
                    />
                    <span class="err__text">{{ err }}</span>
                </el-form-item> -->
                
                <el-form-item label="Sahifa chiqish joyini kirirting">
                    <el-select v-model="page.parent" filterable placeholder="Select">
                        <el-option
                        v-for="item in menus"
                        :key="item.value"
                        :label="item.name"
                        :value="item._id"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item
                    label="Sahifani menuda joylashish tartibi"
                    >
                        <el-input
                            v-model.number="page.order"
                            type="text"
                            autocomplete="off"
                        />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm(pageRef)">Submit</el-button>
                </el-form-item>
            </el-form>
        </div>  
    </div>
</template>
<script setup>
import store from "@/store";
import { reactive, ref, computed} from "vue";



// const + = [
//   {
//     value: '',
//     label: 'Asosiy menyuda',
//   },
//   {
//     value: 'Option2',
//     label: 'Sozlamalar menyusida',
//   },
//   {
//     value: '63ad7e25f69a85ba51c9e788',
//     label: 'Home',
//   },
//   {
//     value: '63ad7eb1f69a85ba51c9e78c',
//     label: 'Sett',
//   },
//   {
//     value: 'Option5',
//     label: 'Option5',
//   },
// ]

const menus = computed({
        get(){
            return store.getters.getPages
        },
        set(value){
            value.push({parent: '', name: 'Asosiy menu'})
        },
    })



const pageRef = ref(null)
const page = reactive({parent: ''})
// const err = ref("")

// const toggle = (val)=>{
//   store.commit('setModal', val)
// }


const submitForm = async (formEl)=>{
    console.log(formEl)
    if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                store.dispatch('createPage', page)
            } else {
                console.log('error submit!', fields)
            }
        })
}

// const checkLetter = (str)=>{
//     if(str.length == 0){
//         err.value = ""
//     }
// }


</script>

<style lang="scss">
@import '../../styles/views/settings.scss';
</style>
