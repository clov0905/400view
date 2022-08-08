<template>
	<div id="register">
		 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
		    <el-form-item label="" prop="acc">
				<el-input type="text" autocomplete="off" v-model="ruleForm.acc" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
			  </el-form-item>
		    <el-form-item label="" prop="pass">
			  <el-input type="password" autocomplete="off" v-model="ruleForm.pass" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password></el-input>
			  </el-form-item>
		    <el-form-item label="" prop="checkPass">
				<el-input type="password" autocomplete="off" v-model="ruleForm.checkPass" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password></el-input>
			  </el-form-item>
		    <el-form-item class="btns">
		      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
		      <el-button @click="resetForm('ruleForm')">重置</el-button>
		    </el-form-item>
		  </el-form>
	</div>
</template>

<script>
	
	export default {
	  data() {
	    var validatePass = (rule, value, callback) => {
	      if (value === "") {
	        callback(new Error("请输入密码"));
	      } else {
	        if (this.ruleForm.checkPass !== "") {
	          this.$refs.ruleForm.validateField("checkPass");
	        }
	        callback();
	      }
	    };
	 
	    var validatePass2 = (rule, value, callback) => {
	      if (value === "") {
	        callback(new Error("请再次输入密码"));
	      } else if (value !== this.ruleForm.pass) {
	        callback(new Error("两次输入密码不一致!"));
	      } else {
	        callback();
	      }
	    };
	 
	    return {
	      activeName: "second",
	      ruleForm: {
	        acc: "",
	        pass: "",
	        checkPass: "",
	      },
	      rules: {
	        acc: [
	          { required: true, message: "请输入您的用户名", trigger: "blur" },
	          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
	        ],
	        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
	        checkPass: [
	          { required: true, validator: validatePass2, trigger: "blur" },
	        ],
	      },
	    };
	  },
	 
	  methods: {
	    submitForm(formName) {
	      this.$refs[formName].validate((valid) => {
	        if (valid) {
	          this.$message({
	            type: "success",
	            message: "注册成功",
	          });
	          // this.activeName: 'first',
	        } else {
	          console.log("error submit!!");
	          return false;
	        }
	      });
	    },
	 
	    resetForm(formName) {
	      this.$refs[formName].resetFields();
	    },
	  },
	};

</script>

<style >
	.btns {
	      display: flex;
	      justify-content: center;
	}
</style>
