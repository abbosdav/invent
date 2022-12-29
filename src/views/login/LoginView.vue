<template>
    <div class="common-layout">
        <el-container class="auth">
            <el-aside class="auth__left">
                <div class="auth__top">
                    <img src="@/assets/logo.png" alt="">
                </div>
                <el-form
                    :model="loginForm"
                    ref="loginFormRef"
                    label-position="top"
                    :rules="rules"
                >
                    <el-form-item label="Login" prop="login">
                        <el-input v-model="loginForm.login" />
                    </el-form-item>
                    <el-form-item label="Parol" prop="password">
                        <el-input type="password" show-password v-model="loginForm.password"/>
                    </el-form-item>
                    <el-button  type="success"  @click="submitForm(loginFormRef)">Вход</el-button>
                </el-form>
            </el-aside>
            <el-main class="auth__right">
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity';
import { useStore } from 'vuex';


        const store = useStore()
        const loginFormRef = ref(null)
        const loginForm = reactive({
            login: '',
            password: ''
        })

        const rules = reactive({
            login:[
                { required: true, message: 'Login kiritilmagan', trigger: 'blur' },
                { min: 3, message: 'Kamida 3 ta belgidan iborat bo\'lishi kerak!', trigger: 'blur'}
            ],
            password:[
                { required: true, message: 'Parol kiritilmagan', trigger: 'blur' },
                { min: 5, message: 'Kamida 5 ta belgidan iborat bo\'lishi kerak!', trigger: 'blur'}
            ],
        })

        const submitForm = async (formEl) => {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    store.dispatch('login', loginForm)
                } else {
                    console.log('error submit!', fields)
                }
            })
        }
</script>

<style lang="scss" scoped>
@import '../../styles/views/login.scss'
</style>