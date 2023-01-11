<template>
    <div class="pages">
        <div class="pages__header">
            <div class="pages__actions">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <el-button type="primary">
                            <el-icon><More/></el-icon>
                        </el-button>
                    </span>
                    <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Form sozlamasi</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <el-button type="success" @click="openModal(true)">
                <el-icon><plus/></el-icon>
            </el-button>
        </div>
        <pre>{{ pageData }}</pre>
    </div>


    <modal-componenet>
        <h2 style="[width:600px, font-size: 45px]">Qo'shish</h2>
        <div class="modal__body">
            
            {{ form }}

            <el-form :model="form" label-width="120px"  @submit.prevent="onSubmit">
                <el-form-item v-for="item in pageData.fields" :key="item.name" :label="item.name">

                    <el-input v-if="item.types == 1" :placeholder="item.placehold"  v-model="form[item.varible]"/>

                    <el-select  v-if="item.types == 2"  filterable placeholder="Select" :name="item.varible" v-model="form[item.varible]">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>

                    <el-radio-group v-if="item.types == 3" :name="item.varible" v-model="form[item.varible]">
                        <el-radio v-for="r in item.radios" :key="r" :value="r.checkboxes" :label="r.name" />
                    </el-radio-group>

                    <el-checkbox-group  v-if="item.types == 4" :name="item.varible" v-model="form[item.varible]">
                        <el-checkbox v-for="c in item.checkboxes" :key="c" :label="c" :value="c" name="type" />
                    </el-checkbox-group>

                    <el-switch  v-if="item.types == 5" :name="item.varible" v-model="form[item.varible]"/>

                    <el-input v-if="item.types == 6"  type="textarea" :name="item.varible" v-model="form[item.varible]"/>

                    <el-date-picker
                        v-if="item.types == 7"
                        :name="item.varible"
                        v-model="form[item.varible]"
                        type="date"
                        placeholder="Pick a date"
                        style="width: 100%"
                    />

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Create</el-button>
                    <el-button>Cancel</el-button>
                </el-form-item>
            </el-form>

        </div>
    </modal-componenet>
    
</template>
<script>
export default {
    components: {
        ModalComponenet
    },
    data: () => ({
        id: '',
        form:{},
        options : [
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
        ],
    }),
    methods: {
        ...mapActions([
            'testPageData'
        ]),

        openModal(val){
            this.$store.dispatch('setModal', val)
        },
        
        onSubmit(){
            // formData.forEach((k,v) => {
            //     console.log(k,v);
            // })
            console.log(this.form);
        },

        async getPage(){
            let res = await this.testPageData(this.$route.params.id)
            if (res.status == 200){
                let {fields} = res.data
                fields.forEach(field => {
                    if (field.types == 4){
                        this.form[field.varible] = []
                    }
                })
            }
        }
    },
    watch: {
        $route(to){
            this.$store.dispatch('pageData', to.params.id)
            this.form = {}
        }
    },
    
    computed:{
        pageData(){
            return this.$store.getters.getPageData
        }
    },
    mounted(){
        this.$store.dispatch('pageData', this.$route.params.id)
        this.getPage()
        this.id = this.$route.params.id
    }
}
import ModalComponenet from '@/components/ModalComponenet.vue';
import { mapActions } from 'vuex';


</script>
<style lang="scss">
@import '../../src/styles/views/pages.scss';

</style>