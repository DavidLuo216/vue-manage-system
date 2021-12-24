<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="phone">
                    <el-input v-model="param.phone" placeholder="phone">
                        <template #prepend>
                            <el-button icon="el-icon-phone"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">{{ data.buttonLabel }}</el-button>
                </div>
                <div v-if="!data.isNewUser" class="login-tips">还没有账号？马上<a @click="handleLoginChange" style="color: lightskyblue; margin-left: 5px; font-size: medium; cursor: pointer">注册</a></div>
                <div v-if="data.isNewUser" class="login-tips">已有账号？马上<a @click="handleLoginChange" style="color: lightskyblue; margin-left: 5px; font-size: medium; cursor: pointer">登录</a></div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import {UserApi} from "../api/user";

export default {
    setup() {
        const router = useRouter();
        const param = reactive({
            phone: "",
            password: "",
        });
        const data = reactive({
          isNewUser: false,
          buttonLabel: '登录'
        })

        const rules = {
            phone: [
                {
                    required: true,
                    message: "请输入手机号",
                    trigger: "blur",
                },
            ],
            password: [
                { required: true, message: "请输入密码", trigger: "blur" },
            ],
        };
        const login = ref("login");
        const submitForm = () => {
            login.value.validate((valid) => {
                if (valid) {
                  if(data.isNewUser){
                    // 注册
                    const params = {
                      phone: param.phone,
                      password: param.password,
                      type: 0
                    }
                    UserApi.register(params).then(res => {
                      if(res.code === 0){
                        ElMessage.success("注册成功");
                        localStorage.setItem("ms_username", param.phone);
                        router.push("/");
                      }else{
                        ElMessage.error(res.msg)
                      }
                    })
                  }else{
                    // 登录
                    UserApi.login(param).then(res => {
                      if(res.code === 0){
                        ElMessage.success("登录成功");
                        localStorage.setItem("ms_username", param.phone);
                        router.push("/");
                      }else{
                        ElMessage.error(res.msg)
                      }
                    })
                  }
                } else {
                    return false;
                }
            });
        };
        const handleLoginChange = () => {
          data.isNewUser = !data.isNewUser
          if(data.isNewUser){
            data.buttonLabel = '注册'
          }else{
            data.buttonLabel = '登录'
          }
        }

        const store = useStore();
        store.commit("clearTags");

        return {
            param,
            data,
            rules,
            login,
            submitForm,
            handleLoginChange
        };
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(55, 55, 55, 0.5);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>