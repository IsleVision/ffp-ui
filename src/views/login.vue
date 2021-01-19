<template>
  <div class="login">
    <div id="topBox">
      <img id="logo" src="../assets/image/system_name.png"/>
    </div>
    <div id="continer">
      <div id="continer-box">
        <div id="continer-banner">

        </div>
        <div id="login-from-box">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
            <h3 class="title">
              用户登陆
              <span>Login</span>
            </h3>
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="密码"
                @keyup.enter.native="handleLogin"
              >
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                v-model="loginForm.code"
                auto-complete="off"
                placeholder="验证码"
                style="width: 56%"
                @keyup.enter.native="handleLogin"
              >
                <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
              </el-input>
              <div class="login-code">
                <img :src="codeUrl" @click="getCode" class="login-code-img"/>
              </div>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
              <el-button
                :loading="loading"
                size="medium"
                type="primary"
                style="width:100%;"
                @click.native.prevent="handleLogin"
              >
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--  底部  -->
    <div class="el-login-footer">
      <ul id="footer-ui">
        <li>
          建设单位：陕西省扶贫开发办公室
        </li>
        <li>
          承建单位：中国电信陕西分公司
        </li>
        <li>
          陕B2-20070053
        </li>
        <li>
          Copyright © 2015 - 2020
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { getCodeImg } from "@/api/login";
  import Cookies from "js-cookie";
  import { encrypt, decrypt } from '@/utils/jsencrypt'

  export default {
    name: "Login",
    data() {
      return {
        codeUrl: "",
        cookiePassword: "",
        loginForm: {
          username: "admin",
          password: "admin123",
          rememberMe: false,
          code: "",
          uuid: ""
        },
        loginRules: {
          username: [
            { required: true, trigger: "blur", message: "用户名不能为空" }
          ],
          password: [
            { required: true, trigger: "blur", message: "密码不能为空" }
          ],
          code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
        },
        loading: false,
        redirect: undefined
      };
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true
      }
    },
    created() {
      this.getCode();
      this.getCookie();
    },
    methods: {
      getCode() {
        getCodeImg().then(res => {
          // debugger
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        });
      },
      getCookie() {
        const username = Cookies.get("username");
        const password = Cookies.get("password");
        const rememberMe = Cookies.get('rememberMe')
        this.loginForm = {
          username: username === undefined ? this.loginForm.username : username,
          password: password === undefined ? this.loginForm.password : decrypt(password),
          rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
        };
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.loginForm.rememberMe) {
              Cookies.set("username", this.loginForm.username, { expires: 30 });
              Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
              Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
            } else {
              Cookies.remove("username");
              Cookies.remove("password");
              Cookies.remove('rememberMe');
            }
            this.$store.dispatch("Login", this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
            }).catch(() => {
              this.loading = false;
              this.getCode();
            });
          }
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  #topBox{
    width: 100vw;
    height: 9vh;
    background-color: rgb(255, 255, 255);
  }
  #continer{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 82.5vh;
    background-image: url("../assets/image/login_bg.png");
    background-size: cover;
    background-position: center;
  }
  #logo{
    margin-left: 1vw;
    margin-top: 1.5vh;
    color: rgb(51, 51, 51);
  }
  #continer-box{
    width: 1200px;
    height: 69.5vh;
    display: flex;
    justify-content: center;
  }
  #footer-ui li{
    list-style: none;
    float: left;
    color: rgb(255, 255, 255);
    margin-right: 20px;
    font-size: 1em;
  }
  #continer-banner{
    width: 700px;
    height: 69.5vh;
    background-image:url("../assets/image/login_banner.png");
  }
  .title {
    height: 60px;
    color: #3F7559;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 0;
  }
  .title span {
    color: #CCCCCC;
  }
  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 300px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
  #login-from-box{
    width: 500px;
    height: 69.5vh;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /*.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../assets/image/login-background.jpg");
    background-size: cover;
  }*/

  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 40%;
    height: 38px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .el-login-footer {
    z-index: 10;
    position: absolute;
    bottom: 0px;
    width: 100vw;
    height: 8.5vh;
    background-color: rgb(51, 51, 51);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-code-img {
    height: 38px;
  }
</style>
