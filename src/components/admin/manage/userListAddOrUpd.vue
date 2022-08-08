<template>
	 <el-dialog :title=" !form  ? '新增 ' : '修改' "
	             :close-on-click-modal="false"
	             :visible.sync="userListFormVisible">
	    <el-form ref="form"
	             :model="form"
	             label-width="80px">
	      <el-form-item label="Date">
	        <el-input v-model="form.date"></el-input>
	      </el-form-item>
	      <el-form-item label="Name">
	        <el-input v-model="form.name"></el-input>
	      </el-form-item>
	      <el-form-item label="地址">
	        <el-input v-model="form.address"></el-input>
	      </el-form-item>
	    </el-form>
	    <div slot="footer"
	         class="dialog-footer">
	      <el-button @click="cancleForm()">取 消</el-button>
	      <el-button type="primary"
	                 @click="submitForm()">确 定</el-button>
	    </div>
	  </el-dialog>
</template>

<script>
	export default {
	  name: 'addOrUpdUserListform',
	  data: function () {
	    return {
	      userListFormVisible: false,
	      form: {
	        date: '',
	        name: '',
	        address: '',
	      },
		  flag:''
	    }
	  },
	  methods: {
	    // 编辑和弹出的初始化页面
	    init (row,flag) {
	      // debugger
		  this.$data.flag = flag
		
	      this.form = row || ''
		  
	      // 显示弹出层 
	      this.userListFormVisible = true
	      // 编辑的时候回显
	      this.$nextTick(() => {
				this.form.date = row.date,
				this.form.name = row.name,
				this.form.address = row.address
				// return 1;
	      });
		  
	    },
	    cancleForm () {
	      this.userListFormVisible = false
	    },
		submitForm(){
			// if(this.init())
			//添加
			if(this.$data.flag === 1 ){
				
			}else if(this.$data.flag === 2){
				//修改
				
			}
			console.log(this.$data.flag)
		}
	  }
	}
</script>

<style>
</style>
