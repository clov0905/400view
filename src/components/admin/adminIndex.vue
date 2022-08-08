<template>
	<div>
		<el-row>
		  <el-col :span="4">
		      <el-menu
		        default-active="2"
		        class="el-menu-vertical-demo"
		        @open="handleOpen"
		        @close="handleClose"
		        background-color="#545c64"
		        text-color="#fff"
		        active-text-color="#ffd04b">
		        <el-submenu index="1">
		          <template slot="title">
		            <i class="el-icon-location"></i>
		            <span>导航一</span>
		          </template>
		          <el-menu-item-group>
		            <template slot="title">分组一</template>
		            <el-menu-item index="1-1">
						<router-link to="/userList/123"> 用户管理</router-link>
					</el-menu-item>
		            <el-menu-item index="1-2">
						<router-link to="/login01"> 选项2</router-link>
					</el-menu-item>
		          </el-menu-item-group>
		          <el-menu-item-group title="分组2">
		            <el-menu-item index="1-3">商品管理</el-menu-item>
                <router-link to="/goods">商品列表</router-link>
		          </el-menu-item-group>
		          <el-submenu index="1-4">
		            <template slot="title">选项4</template>
		            <el-menu-item index="1-4-1">选项1</el-menu-item>
		          </el-submenu>
		        </el-submenu>
		        <el-menu-item index="2">
		          <i class="el-icon-menu"></i>
		          <span slot="title">导航二</span>
		        </el-menu-item>
		        <el-menu-item index="3" disabled>
		          <i class="el-icon-document"></i>
		          <span slot="title">导航三</span>
		        </el-menu-item>
		        <el-menu-item index="4">
		          <i class="el-icon-setting"></i>
		          <span slot="title">导航四</span>
		        </el-menu-item>
		      </el-menu>
		    </el-col>
		  <el-col :span="20">
			  <div class="grid-content bg-purple-light">
				  <el-col :span="20">
				  	<router-view></router-view>
				  </el-col>
			  </div>

		  </el-col>
		</el-row>
	</div>
</template>


<script>
	   export default {
	     data() {
	       return {
	         isCollapse: true
	       };
	     },
	     methods: {
	       handleOpen(key, keyPath) {
	         console.log(key, keyPath);
	       },
	       handleClose(key, keyPath) {
	         console.log(key, keyPath);
	       }
	     }
	   }
</script>

<style>
	  .el-menu-vertical-demo:not(.el-menu--collapse) {
	    width: 200px;
	    min-height: 400px;
	  }
</style>
