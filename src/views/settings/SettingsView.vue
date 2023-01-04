<template>
    <div class="settings" @click.self="icon_state = false">
        <h2 class="settings__title" v-show="active == 0">
         SAHIFA QO'SHISH
        </h2>
        <h2 class="settings__title" v-show="active == 1">
         SAHIFA SOZLAMALARI
        </h2>
        <h2 class="settings__title" v-show="active == 2">
         SAHIFA MA'LUMOTLARI
        </h2>
        <div class="settings__steps">
            <el-steps :active="active" finish-status="success">
                <el-step title="Step 1" />
                <el-step title="Step 2" />
                <el-step title="Step 3" />
            </el-steps>
        </div>

        <div class="settings__fields">
            <el-form
                ref="pageRef"
                :model="page"
                label-width="100px"
                label-position="top"
            >


                <div class="stemp__one" v-show="active == 0">
                    <el-form-item label="Icon" class="icon">
                        <el-button  @click="icon_state = !icon_state">
                            <el-icon>
                                <component :is="page.icon"/>
                            </el-icon>
                        </el-button>
                        <ul class="icon__collection" @click.self="icon_state = true" v-show="icon_state">
                            <li class="icon__item" v-for="(item, index) in icons" :key="index" @click="upIcon(item)">
                                <el-icon>
                                    <component :is="item"/>
                                </el-icon>
                            </li>
                        </ul>
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
                        <el-button type="primary" @click="next">Next</el-button>
                    </el-form-item>
                </div>


                <div class="stemp__two" v-show="active == 1">
                    <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item
                        label="Maydon nomi:"
                        >
                            <el-input
                                v-model.number="page.fieldName"
                                type="text"
                                autocomplete="off"
                            />
                        </el-form-item></el-col>
                    <el-col :span="6">
                        <el-form-item
                        label="Maydon o'zgaruvchisi:"
                        >
                            <el-input
                                v-model.number="page.fieldName"
                                type="text"
                                autocomplete="off"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                        label="Maydon tipi:"
                        >
                            <el-select v-model="page.fieldType" filterable placeholder="Select">
                                <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item
                            v-show="page.fieldType == 1"
                            label="Placeholder:"
                        >
                            <el-input
                                v-model="page.fieldPlaceholder"
                                type="text"
                                autocomplete="off"
                            />
                        </el-form-item>
                        <el-form-item
                            v-show="page.fieldType == 2"
                            label="Source data:"
                        >
                            <el-select v-model="value" filterable placeholder="Select">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item
                            v-show="page.fieldType == 3"
                            label="Radio variantlari:"
                        >
                            <el-select
                                v-model="page.fieldRadio"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                :reserve-keyword="false"
                                placeholder="Choose tags for your article"
                            >
                            </el-select>
                        </el-form-item>

                        <el-form-item
                            v-show="page.fieldType == 4"
                            label="Checkbox qiymatlari:"
                        >
                            <el-select
                                v-model="page.fieldCheck"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                :reserve-keyword="false"
                                placeholder="Choose tags for your article"
                            >
                            </el-select>
                        </el-form-item>
                        <el-form-item
                            v-show="page.fieldType == 5"
                            label="Switch:"
                        >
                        <el-switch
                            v-model="page.fieldSwitch"
                            class="mb-2"
                            active-text="Active"
                            inactive-text="Unactive"
                        />
                        
                        </el-form-item>
                        <el-form-item
                            v-show="page.fieldType == 6"
                            label="Placeholder:"
                        >
                        <el-input
                            v-model="page.fieldArea"
                            type="text"
                            autocomplete="off"
                        />
                        
                        </el-form-item>
                    </el-col>
                </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="next">Next</el-button>
                    </el-form-item>
                </div>
                <div class="stemp__two" v-show="active == 2">
                    stemp three
                    <el-form-item>
                        <el-button type="success" @click="submitForm(pageRef)">Submit</el-button>
                    </el-form-item>
                </div>
                
            </el-form>
        </div>  
    </div>
</template>
<script setup>
import store from "@/store";
import { reactive, ref, computed} from "vue";


const active = ref(0)
const icon_state = ref(false)

const icons = ['menu','Plus', 'minus',
 'setting',
 'setting',
 'setting',
 'setting',
 'setting',
 'setting',
 'setting',
 'setting',
 'setting',
 'setting',
 'setting',
 'setting',
 'setting',
 'setting',
 'setting',
 'setting',
 'setting',
  'house', 
  'CirclePlus',
 'setting',
  'house', 
  'CirclePlus',
 'setting',
  'house', 
  'CirclePlus',
 'setting',
  'house', 
  'CirclePlus',
 'setting',
  'house', 
  'CirclePlus',
 'setting',
  'house', 
  'CirclePlus',
 'setting',
  'house', 
  'CirclePlus',
 'setting',
  'house', 
  'CirclePlus',
 'setting',
  'house', 
  'CirclePlus',
 'setting',
  'house', 
  'CirclePlus',
 'setting',
  'house', 
  'CirclePlus',
 'setting',
  'house', 
  'CirclePlus',

]

const next = () =>{
    active.value ++
}

const menus = computed({
        get(){
            return store.getters.getPages
        },
        set(value){
            value.push({parent: '', name: 'Asosiy menu'})
        },
    })



const pageRef = ref(null)
const page = reactive({parent: '',  icon: 'Menu', fieldType: 1, fieldRadio:[]})
// const err = ref("")

// const toggle = (val)=>{
//   store.commit('setModal', val)

// }

// Type lar uchun options

const types = [
    {label: 'Input', value: 1},
    {label: 'Select', value: 2},
    {label: 'Radio', value: 3},
    {label: 'Checkbox', value: 4},
    {label: 'Switch', value: 5},
    {label: 'Textarea', value: 6},
]

// Select uchun option
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
// Select optionlari

const upIcon = (val)=>{
    page.icon = val
    icon_state.value = false
    console.log(page.icon);
}

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
