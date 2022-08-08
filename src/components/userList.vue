<template>
	<div id="userList">
		<h1>用户列表</h1>
		<el-button @click="addUser(-1)">添加</el-button>
    <!-- tableData.slice((currentPage-1)*pageSize,currentPage*pageSize) -->
		<el-table :data="tableData.filter(data => !search || data.UAcc.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%"
			:row-class-name="tableRowClassName">
      <el-table-column label="ID" width="180">
      	<template slot-scope="scope">
      	<!-- 	<i class="el-icon-time"></i> -->
      		<span style="margin-left: 10px">{{ scope.row.userId }}</span>
      	</template>
      </el-table-column>
			<el-table-column label="账号" width="180">
				<template slot-scope="scope">
				<!-- 	<i class="el-icon-time"></i> -->
					<span style="margin-left: 10px">{{ scope.row.UAcc }}</span>
				</template>
			</el-table-column>
			<el-table-column label="姓名" width="180">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="top">
            <p>ID: {{ scope.row.userId }}</p>
						<p>姓名: {{ scope.row.UName }}</p>
            <p>电话: {{ scope.row.phone }}</p>
						<p>住址: {{ scope.row.address }}</p>
						<div slot="reference" class="name-wrapper">
							<el-tag size="medium">{{ scope.row.UName }}</el-tag>
						</div>
					</el-popover>
				</template>
			</el-table-column>
      <el-table-column label="身份证" width="180">
      	<template slot-scope="scope">
      	<!-- 	<i class="el-icon-time"></i> -->
      		<span style="margin-left: 10px">{{ scope.row.idNumber }}</span>
      	</template>
      </el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
			<el-table-column
			      align="right">
			      <template slot="header" slot-scope="scope">
			        <el-input
			          v-model="search"
			          size="mini"
			          placeholder="输入关键字搜索"/>
			      </template>
				  </el-table-column>
		</el-table>
		<div class="resource-page">
			<el-pagination background layout="total,prev, pager, next,sizes, jumper" :total="total"
				:page-size="pageSize" :page-sizes="[2, 3, 4, 5]" :current-page="currentPage"
         @size-change="handleSizeChange"
          @current-change="currentChange">
			</el-pagination>

		</div>


		<!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

		<el-dialog :title="title" :visible.sync="dialogFormVisible">
			<el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
        	<el-input v-model="form.UAcc" autocomplete="off"></el-input>
        </el-form-item>
				<el-form-item label="姓名" :label-width="formLabelWidth">
					<el-input v-model="form.UName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="住址" :label-width="formLabelWidth">
					<el-input v-model="form.address" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="身份证" :label-width="formLabelWidth">
					<el-input v-model="form.idNumber" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addPage()">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>

	export default {
    data() {
    	return {
    		// pages: "[2, 3, 4, 5]",
    		pageSize: 5,
    		currentPage: 1,
    		tableData: [],
    		search: '',// 搜索的关键字
        // filterDataShow: [], //储存符合条件的数据
    		total: 0,
    		dialogTableVisible: false,
    		dialogFormVisible: false,
    		title:'修改',
    		form: {
          userId:'',
    			UAcc: '',
          UName: '',
    			address: '',
          idNumber:'',
    			date1: '',
    			date2: '',
    			delivery: false,
    			type: [],
    			resource: '',
    			desc: '',
    			flag:''
    		},
    		formLabelWidth: '120px'
    	}
    },
		methods: {
      async getUserList() {
        const that = this
          // that.$axios({
          //     url: 'admin/selUser01',
          //   	method: 'post',
          //   	headers: { "Content-Type": "multipart/form-data" }

          //   }).then(function(response) {
          //   	console.log('数据接收');
          //   	console.log(response.data.userList);
          //     console.log(response.data.pageCount);
          //     that.total = response.data.pageCount;
          //     that.tableData = response.data.userList;
          // });
          that.$axios.post('admin/selUser01')
          .then(response =>{
               console.log('数据接收');
            // debugger
              	console.log(response.data.userList);

                this.currentPage = 1;
                that.total = response.data.pageCount;
                that.tableData = response.data.userList;
                 console.log(this.tableData+"------------137");
          })

        },
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex % 2 == 0) {
					return 'warning-row';
				} else {
					return '';
				}
				return '';
			},
			handleEdit(index, row) {
				this.$data.title = "修改用户"
				this.dialogFormVisible = true
        this.form.UAcc = row.UAcc
				this.form.UName = row.UName
				this.form.address = row.address
				this.form.idNumber = row.idNumber
				this.$data.form.flag = row.userId
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
				this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$delete(this.$data.tableData, index)
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			currentChange(val) {
				this.currentPage = val;
        
			},
      handleSizeChange(psize) {
          this.pageSize = psize;
      },
			addUser(val){
				this.$data.title = "添加用户"
				this.dialogFormVisible = true
        this.form.UAcc = ""
				this.$data.form.idNumber = ""
				this.$data.form.UName = ""
				this.$data.form.address = ""
				this.$data.form.flag = val
			},
      // 修改/添加 按钮
			addPage(){
				if(this.$data.form.flag == '-1'){
          const that = this
          this.$axios({
              url: 'admin/addUser',
            	method: 'post',
            	headers: { "Content-Type": "multipart/form-data" },
              data:{
                 uAcc:this.$data.form.UAcc,
                 uName:this.$data.form.UName,
                 idNumber:this.$data.form.idNumber,
                 address:this.$data.form.address
              }//传值
            }).then(function(response) {
            	console.log('数据接收');
            	console.log(response.data);
            	if(response.data === 1 ){
            	  that.$message({ message: "添加成功", type: "success" });
                //刷新
                that.getUserList();
            	}else if(response.data === 0){
            	  that.$message.error("添加失败");
            	}
          });
          // this.reload()
					this.dialogFormVisible = false
					console.log(this.$data.form.name)
				}else{

					const that = this
					this.$axios({
					    url: 'admin/updUser01',
					  	method: 'post',
					  	headers: { "Content-Type": "multipart/form-data" },
					    data:{
                 uAcc:this.$data.form.UAcc,
                 updId:this.$data.form.flag,
					       uName:this.$data.form.UName,
					       // idNumber:this.$data.form.idNumber,
					       address:this.$data.form.address
					    }//传值
					  }).then(function(response) {
					  	console.log('数据接收');
					  	console.log(response.data);
					  	if( response.data === 1 ){
					  	  that.$message({ message: "修改成功", type: "success" });
                //刷新
                that.getUserList();
					  	}else if( response.data === 0){
					  	  that.$message.error("修改失败");
					  	}
					});
					// this.reload()
					this.dialogFormVisible = false
				}
			}
		},
    // 生命周期钩子函数
    created() {

    },
    mounted() {
        this.getUserList();
      //  this.searchResource(); //在页面挂载后调用此方法，确保数据与页面发生了交互
    },
    watch: { //监听搜索框内容，当搜索框内容发生变化时调用searchResource方法
        search: {
            handler() {
                console.log("1111111111111----------")
                this.$data.currentPage = 1
                this.$data.total = this.$data.tableData.filter(data => !this.$data.search || data.UAcc.toLowerCase().includes(
                  this.$data.search.toLowerCase())).length
            }

        }

    },
    // computed: {
    //     // showTable计算属性通过slice方法计算表格当前应显示的数据
    //     showTable() {
    //         return this.filterDataShow.slice(
    //             (this.currentPage - 1) * this.pagesize,
    //             this.currentPage * this.pagesize
    //         );
    //     }
    // }
	}
</script>

<style>
	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}

	.page {
		margin-left: 250px;
	}
</style>
