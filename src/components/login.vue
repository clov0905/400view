<template>
	<div class="login" id="login">
	    <div class="login_form">
	      <p>后台管理系统</p>
	      <el-tabs v-model="activeName" @tab-click="handleClick" >
	        <el-tab-pane label="登录" name="first">
	          <el-form :model="loginForm" :rules="rules" ref="loginForm" >
	            <el-form-item label="" prop="account" class="elItem">
	              <el-input type="text" autocomplete="off" v-model="loginForm.account" prefix-icon="el-icon-user-solid" placeholder="请输入用户名" ></el-input>
	            </el-form-item>
	            <el-form-item label="" prop="password">
	              <el-input type="password" autocomplete="off" v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password></el-input>
	            </el-form-item>
	            <el-form-item class="btns">
	              <el-button type="primary" @click="goToLogin">登录</el-button>
	              <el-button @click="resetLoginForm">重置</el-button>
	            </el-form-item>
	          </el-form>
	        </el-tab-pane>
	        <el-tab-pane label="注册" name="second">
	            <!-- 注册组件 -->
	          <register></register>
	        </el-tab-pane>
	      </el-tabs>
	    </div>
	  </div>
</template>

<script>
	//引入注册组件
	import register from './register.vue';
	export default {
	  data() {
	    var validateAccount = (rule, value, callback) => {
	      if (value === "") {
	        return callback(new Error("账号不能为空"));
	      }
       //   else if (value === "admin") {
	      //   callback();
	      // } else {
	      //   callback(new Error("请输入正确的用户名"));
	      // }
	    };
	    var validatePassword = (rule, value, callback) => {
	      if (value === "") {
	        callback(new Error("请输入密码"));
	      }
       //  else if (value === "123456") {
	      //   callback();
	      // } else {
	      //   callback(new Error("请输入正确的密码"));
	      // }
	    };
	    return {
	      loginForm: {
	        account: "",
	        password: "",
	      },
	      activeName:'first',//默认显示登录页面
	      rules: {
	        account: [
	          {
	            validator: validateAccount,
	            trigger: "blur",
	          },
	        ],
	        password: [
	          {
	            validator: validatePassword,
	            trigger: "blur",
	          },
	        ],
	      },
	    };
	  },
	  methods: {
      goToLogin:function(){
        const that = this

          that.$axios({
              url: 'userMange/doLogin01',
            	method: 'post',
            	headers: { "Content-Type": "multipart/form-data" },
            	data:{
                 uAcc:that.loginForm.account,
                 uPwd:that.loginForm.password
              }//传值
            }).then(function(response) {
            	console.log('数据接收');
            	console.log(response.data);
              if(response.data === 1 ){
                that.$message({ message: "登陆成功", type: "success" });
                that.$router.replace("/adminIndex");
              }else if(response.data === 0){
                that.$message.error("账号密码不正确");
              }
          });

      },
	// 固定的账户密码判断实现简单的登录跳转功能
	   //  goToLogin() {
	   //    this.$refs["loginForm"].validate((valid) => {
	   //      if (valid) {
	   //        if (
	   //          this.loginForm.account != "admin" ||
	   //          this.loginForm.password != "123456"
	   //        ) {
	   //          this.$message.error("账号密码不正确");
	   //          return false;
	   //        } else {
	   //          this.$message({ message: "登陆成功", type: "success" });
				// // 路由跳转 push--->跳到某个路径下	 replace--->类似重定向
	   //          this.$router.push("/adminIndex");
				// // this.$router.replace("/adminIndex");
	   //        }
	   //      } else {
	   //        this.$message.error("登陆失败");
	   //        return false;
	   //      }
	   //    });
	   //  },
	    resetLoginForm() {
	      this.$refs["loginForm"].resetFields();
	    },
	    handleClick(){}
	  },
	  components:{
	    register
	  }
	};
</script>

<style scoped lang='less'>
.login {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/login/biejing.jpg");//背景图
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  position: relative;
  .login_form {
    width: 400px;
    height: 360px;
    position: absolute;
    left: 52%;
    top: 45%;
    margin-left: -200px;
    margin-top: -150px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #ddd;

    .btns {
      display: flex;
      justify-content: center;
    }
  }
  p {
    font-size: 24px;
    text-align: center;
    font-weight: 600;
  }
}
</style>
