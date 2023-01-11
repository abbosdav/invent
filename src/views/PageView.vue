<template>
    <div class="pages">
        <div class="pages__header">
            <div class="pages__actions">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <el-button type="primary">
                            <el-icon>
                                <More/>
                            </el-icon>
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
                <el-icon>
                    <Plus/>
                </el-icon>
            </el-button>
        </div>
        <el-table
            :data="dataTable"
            style="width: 100%"
            border
        >   
            <el-table-column v-for="item in pageData.fields" :key="item" :prop="item.slug" :label="item.label" width="180" />
            <el-table-column prop="status">
                <template #default="scope">
                    <el-dropdown> 
                        <el-button class="el-dropdown-link"> 
                            <el-icon> 
                                <More /> 
                            </el-icon> 
                        </el-button> 
                        <template #dropdown> 
                        <el-dropdown-menu> 
                            <el-dropdown-item @click="editItem(scope.row.id)" type="warning"> 
                                <el-icon class="mr-1"><Edit/></el-icon> 
                                Изменить
                            </el-dropdown-item> 
                            <el-dropdown-item @click="deleteItem(scope.row.id)"> 
                                <el-icon class="mr-1"><Delete/></el-icon> 
                                Удалить
                            </el-dropdown-item> 
                        </el-dropdown-menu> 
                        </template> 
                    </el-dropdown> 
                </template>
                </el-table-column>
            <!-- <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" /> -->
        </el-table>
        <pre>{{ pageData }}</pre>
    </div>


    <modal-componenet>
        <h2 class="modal__title">Qo'shish</h2>
        <div class="modal__body">
            <el-form :model="form" label-width="120px" label-position="top">
                <el-form-item v-for="item in pageData.fields" :key="item.types" :label="item.label">

                    <el-input v-if="item.types == 1" :placeholder="item.place" v-model="form[item.slug]"/>

                    <el-select  v-if="item.types == 2"  filterable placeholder="Select" v-model="form[item.slug]">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>

                    <el-radio-group v-if="item.types == 3" v-model="form[item.slug]">
                        <el-radio v-for="r in item.radioVal" :key="r" :label="r" />
                    </el-radio-group>

                    <el-checkbox-group  v-if="item.types == 4" v-model="form[item.slug]">
                        <el-checkbox v-for="c in item.checkVal" :key="c" :label="c" name="type" />
                    </el-checkbox-group>

                    <el-switch  v-if="item.types == 5"  v-model="form[item.slug]"/>

                    <el-input v-if="item.types == 6" :placeholder="item.areaVal"  type="textarea" v-model="form[item.slug]"/>

                    <el-date-picker
                        v-if="item.types == 7"
                        v-model="form[item.slug]"
                        type="date"
                        placeholder="Pick a date"
                        style="width: 100%"
                    />

                </el-form-item>
                <el-form-item>
                    <el-button v-show="!isEdit" type="primary" @click="onSubmit">Create</el-button>
                    <el-button v-show="isEdit" type="primary" @click="onUpdate">Update</el-button>
                    <el-button>Cancel</el-button>
                </el-form-item>
            </el-form>
            {{ form }}
        </div>
    </modal-componenet>

    
    
</template>
<script>
import ModalComponenet from '@/components/ModalComponenet.vue';
// import store from '@/store';
// import { onMounted, reactive, watch, computed } from 'vue';
// import { useRoute } from 'vue-router'

export default{
    components:{
        ModalComponenet
    },
    data(){
        return{
            isEdit: false,
            form:{},
            options: [
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
            tableData:[
                {
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
            ],
            id: null
        }
    },
    methods:{
        deleteItem(id){
            this.$store.dispatch("delDataTable" , {routeId :this.$route.params.id, itemId: id})
        },

        editItem(itemId){
            this.isEdit = true
            this.getPage()
            this.$store.dispatch('setModal', true)
            this.$store.dispatch("getAxios" , {url:`page/edit/${this.$route.params.id}/${itemId}`})
            .then(res =>{
                this.form = res.data
                this.id = res.data.id
                // Object.keys(res.data).forEach(item => {
                //     this.form[item] = res.data[item]
                // })
            })
        },

        async getPage(){
            let res = await this.$store.dispatch("formData" ,this.$route.params.id)
            if (res.status == 200){
                let {fields} = res.data
                fields.forEach(field => {
                    if (field.types == 4){
                        this.form[field.slug] = []
                    }
                    if (field.types == 5){
                        this.form[field.slug] = 'status'
                    }
                })
            }
        },

        openModal(val){
            this.$store.dispatch('setModal', val)
        },

        onSubmit(){
            this.$store.dispatch('addPageData', {id: this.$route.params.id, data: this.form})
            this.form = {}
            this.$store.dispatch('setModal', false)
        },

        onUpdate(){
            this.$store.dispatch('editDataTable', {slug: `${this.$route.params.id}/${this.id}`, data: this.form})
            this.form = {}
            this.$store.dispatch('setModal', false)
            this.isEdit = false
        },
    },


    computed:{
        pageData(){
            return this.$store.getters.getPageData
        },
        dataTable(){
            return this.$store.getters.getDataTable
        }
    },

    watch: {
        $route(to){
            this.$store.dispatch('pageData', to.params.id)
            this.form = {}
        }
    },



    mounted(){
        this.$store.dispatch('pageData', this.$route.params.id)
        this.getPage(this.$route.params.id)
    },

    // setup(){
    //     const route = useRoute()
    //     let form = reactive({})

    //     const openModal =(val)=>{
    //         store.commit('setModal', val)
    //     }

    //     const resetForm = ()=>{
    //         Object.assign(form, {})
    //         console.log('RESETED' )
    //     }


    //     const getPage = async (id)=>{
    //         let res = await store.dispatch('formData', id)
    //         if (res.status == 200){
    //             let {fields} = res.data
    //             fields.forEach(field => {
    //                 if (field.types == 4){
    //                     form[field.varible] = []
    //                 }
    //             })
    //         }
    //     }

    //     const onSubmit = () => {
    //         console.log(form);
    //         store.dispatch('addPageData', {id: route.params.id, data: {...form}})
    //         form = {}
    //     }

    //     const pageData = computed(()=>{
    //         return store.getters.getPageData
    //     })

    //     watch(
    //         ()=>route.params.id, 
    //         (val)=>{
    //             resetForm()
    //             getPage(val)
    //             store.dispatch('pageData', route.params.id)
    //             console.log(form);
    //         }
    //     )

    //     onMounted(()=>{
    //         store.dispatch('pageData', route.params.id)
    //         getPage(route.params.id)
    //     })

    //     const tableData = [
    //     {
    //         date: '2016-05-03',
    //         name: 'Tom',
    //         address: 'No. 189, Grove St, Los Angeles',
    //     },
    //     {
    //         date: '2016-05-02',
    //         name: 'Tom',
    //         address: 'No. 189, Grove St, Los Angeles',
    //     },
    //     {
    //         date: '2016-05-04',
    //         name: 'Tom',
    //         address: 'No. 189, Grove St, Los Angeles',
    //     },
    //     {
    //         date: '2016-05-01',
    //         name: 'Tom',
    //         address: 'No. 189, Grove St, Los Angeles',
    //     },
    //     ]

    //     const options = [
    //     {
    //         value: 'Option1',
    //         label: 'Option1',
    //     },
    //     {
    //         value: 'Option2',
    //         label: 'Option2',
    //     },
    //     {
    //         value: 'Option3',
    //         label: 'Option3',
    //     },
    //     {
    //         value: 'Option4',
    //         label: 'Option4',
    //     },
    //     {
    //         value: 'Option5',
    //         label: 'Option5',
    //     },
    //     ]
    //      return{
    //         options, pageData, tableData, form,
    //         onSubmit, openModal
    //      }
    // }


}










</script>
<style lang="scss">
@import '../../src/styles/views/pages.scss';

</style>