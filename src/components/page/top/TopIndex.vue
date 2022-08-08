<template>
  <div style="font-size: 14px;">
    <div style="background-color: #3e3e3e;">
      <div style="width: 65%;height: 40px;margin: 0 auto;display: flex;">
        <div style="display: flex;flex: 1;">
          <div class="active" @click="homePage">京东商城</div>
          <div class="active">我的订单</div>
          <div class="active">我的京东</div>
          <div class="active">京东会员</div>
          <div class="active">企业采购</div>
          <div class="active">客户服务</div>
          <div class="active">网站导航</div>
          <div class="active">手机京东</div>
          <div class="active">网站无障碍</div>
        </div>
        <div style="width: 278px;text-align: right;display: flex;">
          <div class="active" @click="loginModal">登录</div>
          <div class="active">注册</div>
          <div class="active">消息通知</div>
         

        </div>
      </div>
    </div>
	
	<div style="width: 60%;margin: 20px auto 0 auto;">
		<div style="display: flex;border-radius: 5px;">
			<!-- 京东LOGO -->
			<img @click="homePage" src="../../../../public/img/sprite.png" style="height: 50px;"/>
			<!-- 搜索框 -->
			<div style="line-height: 52px;">
			  <el-input placeholder="请输入内容" class="input-with-select" style="width: 600px;">
			    <el-button slot="append" icon="el-icon-search"></el-button>
			  </el-input>
			</div>
			<!-- 购物车 -->
			<div style="margin-top: 5px;margin-left: 20px;">
				<el-popover
				   placement="top-start"
				   title=""
				   trigger="hover">
				   <div style="">
				     <div class="car-item" v-for="(item,index) in products" :style="'display: flex;'+ (index<products.length-1?'border-bottom: 1px solid #EEEEEE;':'')">
				       <div style="width: 60px;height: 60px;">
				         <el-image
				           style="width: 60px;height: 60px;"
				           :src="item.url">
				         </el-image>
				       </div>
				       <div class="car-product-name">
				         <div style="line-height: 25px;">{{item.name}}</div>
				         <div style="line-height: 25px;">{{item.des}}</div>
				       </div>
				       <div style="font-size: 14px;line-height: 60px;">
				         {{item.price}}元 x{{item.num}}
				       </div>
				       <div style="line-height: 60px;margin-left: 20px;">
				         <i class="del el-icon-close" @click="delCar"></i>
				       </div>
				     </div>
				     <div style="height: 50px;display: flex;">
				       <div>
				         <div style="font-size: 12px;color: gray;">共{{products.length}}件商品</div>
				         <div style="font-size: 20px;color: #ff6700;font-weight: bolder;">7397元</div>
				       </div>
				       <div style="flex: 1;text-align: right;">
				         <el-button type="warning" @click="toShopCar" style="background: #ff6700;">去购物车结算</el-button>
				       </div>
				     </div>
				   </div>
				   <el-button slot="reference" class="shop-car" icon="el-icon-shopping-cart-2">购物车（{{products.length}}）</el-button>
				 </el-popover>
			</div>
		</div>
	</div>

    <div style="width: 60%;margin: 10px 10px 10px 400px;">
      <div style="display: flex;border-radius: 5px;">
        <div style="display: flex;flex: 1;">
          <div class="title1" style="color: red;">秒杀</div>
          <div class="title1" style="color: red;">优惠券</div>
          <div class="title1">PLUS会员</div>
          <div class="title1">品牌闪购</div>
          <div class="title1">拍卖</div>
          <div class="title1">京东家电</div>
          <div class="title1">京东超市</div>
		  <div class="title1">京东生鲜</div>
		  <div class="title1">京东国际</div>
		  <div class="title1">京东云</div>
        </div>
      </div>
    </div>

    <!-- 登录弹窗 -->
    <el-dialog
      title="User Login"
      :visible.sync="box"
      width="400px"
      center>
      <div>
        <el-form class="login-form"
                 status-icon
                 :rules="loginRules"
                 ref="loginForm"
                 :model="loginForm"
                 label-width="0">
          <el-form-item prop="username">
            <el-input size="small"
                      @blur="handleLogin"
                      v-model="loginForm.username"
                      auto-complete="off"
                      placeholder="用户名">
              <i slot="prefix" class="el-icon-user el-icon--right"/>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input size="small"
                      @blur="handleLogin"
                      :type="passwordType"
                      v-model="loginForm.password"
                      auto-complete="off"
                      placeholder="密码">
              <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"/>
              <i slot="prefix" class="el-icon-lock el-icon--right"/>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-row :span="24">
              <el-col :span="12">
                <el-checkbox v-model="loginForm.autoLogin">下次自动登录</el-checkbox>
              </el-col>
              <el-col :span="12" style="text-align: right;">
                <el-button type="primary"
                           style="width: 100px;"
                           @click.native.prevent="handleLogin"
                           class="login-submit">
                           登录
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>

        </el-form>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
      data() {
        return {
           activeIndex: '1',
          activeIndex2: '1',
          box: false,
          loginForm: {
            username: "",
            //密码
            password: "",
            autoLogin: false
          },
          loginRules: {
            username: [
              {required: true, message: "请输入用户名", trigger: "blur"}
            ],
            password: [
              {required: true, message: "请输入密码", trigger: "blur"},
              {min: 1, message: "密码长度最少为6位", trigger: "blur"}
            ]
          },
          passwordType: "password",
          products: [
            {name:'Redmi Note 11T',des:'Pro 6GB+128GB 原子银',price:'1699',num: 1,url:require('../../../../public/img/Redmi_Note.png?width=60&height=60')},
            {name:'Redmi Note 11T',des:'Pro 6GB+128GB 原子银',price:'2699',num: 1,url:require('../../../../public/img/Redmi_Note.png?width=60&height=60')},
            {name:'Redmi Note 11T',des:'Pro 6GB+128GB 原子银',price:'2999',num: 1,url:require('../../../../public/img/Redmi_Note.png?width=60&height=60')},
          ],
        };
      },
      mounted() {
      },
      methods: {
         homePage(){
           this.$router.push({path: '/home/index'});
         },
        //  handleSelect(key, keyPath) {
        //    console.log(key);
        //    if(key == '1'){
        //      this.$router.push({path: '/home/index'});
        //    }else{
        //      this.$router.push({path: '/test/index'});
        //    }

        // },
        loginModal(){
          this.box = true;
        },
        showPassword() {
          this.passwordType === ""
            ? (this.passwordType = "password")
            : (this.passwordType = "");
        },
        handleLogin() {//登录
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              const loading = this.$loading({
                lock: true,
                text: '登录中,请稍后。。。',
                spinner: "el-icon-loading"
              });
              setTimeout(function(){
                loading.close();
              },1000)

            }
          });
        },
        delCar(){//删除购物车
          this.$confirm("确定将选择商品删除?", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              //return remove(id);
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
        },
        toShopCar(){//去购物车结算
          this.$router.push({path: '/car'});
        }
      }
    };
</script>

<style>
  .active{
    line-height: 40px;
    color: #cfcfcf;
    margin-right: 20px;
    font-size: 12px;
  }
  .active:hover{
    cursor: pointer;
    color: #FFFFFF;
  }
  .shop-car{
    background-color: #ff6700;
    border-radius: 0!important;
    border-color: #ff6700;
    color: #FFFFFF;
  }
  .shop-car:hover{
    background-color: #FFFFFF;
    color: #ff6700;
  }
  .car-item{
    padding: 10px 0;
  }
  .car-item:hover .del{
    display: inline-block;
  }
  .del{
    display: none;
    cursor: pointer;
  }
  .del:hover{
    color: red;
  }
  .car-product-name{
    font-size: 14px;
    margin: 0 20px;
  }
  .car-product-name:hover{
    color: #ff6700;
    cursor: pointer;
  }
</style>
