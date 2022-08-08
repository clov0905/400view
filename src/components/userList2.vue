<template>
	<div>
		<!-- tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())) -->
		<h1>{{reMessage}}</h1>
		<!-- <h1>{{id}}</h1> -->
		<div class="table_btn">
		        <el-row>
		          <el-button type="warning"
		                     size="mini"
		                     @click="add_Handler(1)">新增</el-button>
		          <el-button type="warning"
		                     size="mini">批量删除</el-button>
		        </el-row>
		</div>
		 <el-table
		    :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
		    style="width: 100%" :row-class-name="tableRowClassName">
		    <el-table-column
		      label="Date"
		      prop="date">
		    </el-table-column>
		    <el-table-column
		      label="Name"
		      prop="name">
		    </el-table-column>
			<el-table-column
			  label="地址"
			  prop="address">
			</el-table-column>
		    <el-table-column
		      align="right">
		      <template slot="header" slot-scope="scope">
		        <el-input
		          v-model="search"
		          size="mini"
		          placeholder="输入关键字搜索"/>
		      </template>
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="handleEdit(scope.$index, scope.row,2)">Edit</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
		      </template>
		    </el-table-column>
		  </el-table>
		  
		  <el-pagination
			background
		    layout="prev, pager, next"
		    :total="total"
			:current-page="currentPage"
			:page-size="pageSize"
			:page-sizes="pageSizes"
			@current-change="currentChange">
		  </el-pagination>
		  <!-- 定义弹出层 -->
		  <userListAddOrUpd v-if="userListFormVisible"
		                     ref="addOrUpdate">
		                     <!-- @refreshDataList="getData"> -->
		  </userListAddOrUpd>
	</div>
</template>

<script>
	
	//引入弹出层
	import userListAddOrUpd from './userListAddOrUpd.vue'
	
	export default {
		name:'userList',
		props:['id'],
		components:{
			userListAddOrUpd
		},
	    data() {
	      return {
			total:8,
			pageSize:3,
			currentPage:1,
			// 个数选择器（可修改）
			pageSizes:[1,2,3,4],
			flag:'',
	        tableData: [{
	          date: '2016-05-02',
	          name: '王小虎01',
	          address: '上海市普陀区金沙江路 1518 弄'
	        }, {
	          date: '2016-05-04',
	          name: '王小虎02',
	          address: '上海市普陀区金沙江路 1517 弄'
	        }, {
	          date: '2016-05-01',
	          name: '王小虎03',
	          address: '上海市普陀区金沙江路 1519 弄'
	        }, {
	          date: '2016-05-03',
	          name: '王小虎04',
	          address: '上海市普陀区金沙江路 1516 弄'
	        }, {
	          date: '2016-05-03',
	          name: '王小虎05',
	          address: '上海市普陀区金沙江路 1516 弄'
	        }, {
	          date: '2016-05-03',
	          name: '王小虎06',
	          address: '上海市普陀区金沙江路 1516 弄'
	        }, {
	          date: '2016-05-03',
	          name: '王小虎07',
	          address: '上海市普陀区金沙江路 1516 弄'
	        }, {
	          date: '2016-05-03',
	          name: '王小虎08',
	          address: '上海市普陀区金沙江路 1516 弄'
	        }],
	        search: '',
			// 默认隐藏弹出层
			userListFormVisible:false
	      }
	    },
	    methods: {
		  // 新增
		  add_Handler (flag) {
		        // debugger
				 // 显示弹出层
		        this.userListFormVisible = true
		        this.$nextTick(() => {
		        this.$refs.addOrUpdate.init(0,flag);
		     })
		  },
		  //修改
	      handleEdit(index, row,flag) {
			  // 显示弹出层
			this.userListFormVisible = true
			    this.$nextTick(() => {
			        this.$refs.addOrUpdate.init(row,flag);
			    })
	        console.log(index, row); 
	      },
		  //删除
	      handleDelete(index, row) {
			  this.$confirm("是否删除该用户","提示",{
				  confirmButtonText:'确定',
				  cancelButtonText: '取消',
				          type: 'warning'
			  }).then(() => {
			      this.$delete(this.$data.tableData,index);
				  this.$message({
				  	type: 'success',
				  	message: '删除成功'
				  })
			  }).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})
	        console.log(index, row);
	      },
		   tableRowClassName({row, rowIndex}) {
		          if (rowIndex % 2 === 0) {
		            return 'warning-row';
		          } else if (rowIndex % 2 === 1) {
		            return 'success-row';
		          }
		          return '';
			},
			currentChange(val){
				this.$data.currentPage = val
			}
	    },
		// computed计算
		computed: {
			reMessage(){
				return this.$route.params.id;
			}
		},
		 
	  }
</script>

<style>
	.el-table .warning-row {
	    background: oldlace;
	  }
	
	  .el-table .success-row {
	    background: #ffffff;
	  }
</style>
