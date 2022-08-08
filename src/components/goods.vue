<template>
<div>
    <!-- 面包屑导航区域 -->
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
</el-breadcrumb>

    <!-- 卡片视图区域 -->
<el-card>
     <!-- 搜索与添加区域 -->
  <el-row :gutter="20">
    <el-col :span="8">
      <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
        <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="addGoods(-1)">添加商品</el-button>
    </el-col>
  </el-row>

  <!-- table表格区域 -->
  <el-table :data="goodslist" border stripe :row-class-name="tableRowClassName">
    <el-table-column label="ID" width="180">
    	<template slot-scope="scope">
    	<!-- 	<i class="el-icon-time"></i> -->
    		<span style="margin-left: 10px">{{ scope.row.id }}</span>
    	</template>
    </el-table-column>
    <el-table-column label="商品名称" width="180" >
      <template slot-scope="scope">
      <!-- 	<i class="el-icon-time"></i> -->
      	<span style="margin-left: 10px">{{ scope.row.goodsName }}</span>
      </template>

    </el-table-column>
    <el-table-column label="商品价格(元)" width="180">
      <template slot-scope="scope">
      <!-- 	<i class="el-icon-time"></i> -->
      	<span style="margin-left: 10px">{{ scope.row.goodsPrice }}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column label="商品图片" prop="goodsImg" width="100px"></el-table-column> -->
    <el-table-column label="商品描述" width="180">
      <template slot-scope="scope">
      <!-- 	<i class="el-icon-time"></i> -->
      	<span style="margin-left: 10px">{{ scope.row.goodsDesc }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">编辑</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页区域 -->
  <el-pagination
    background
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>

</el-card>

<!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

		<el-dialog :title="title" :visible.sync="dialogFormVisible">
			<el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
        	<el-input v-model="form.goodsName" autocomplete="off"></el-input>
        </el-form-item>
				<el-form-item label="商品价格" :label-width="formLabelWidth">
					<el-input v-model="form.goodsPrice" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品描述" :label-width="formLabelWidth">
					<el-input v-model="form.goodsDesc" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addOrUpd()">确 定</el-button>
			</div>
		</el-dialog>

</div>
</template>

<script>
export default {
data(){
return{
  // 查询参数对象
  queryInfo:{
    query:'',
    pagenum:1,
    pagesize:5,
  },
  // 商品列表
  goodslist:[],
  // 总数据条数
  total:0,
  // 添加修改页面标题
  title:'修改',
  form: {
            id:'',
      			goodsName: '',
            goodsPrice: '',
      			goodsDesc: '',
      			delivery: false,
      			resource: '',
      			flag:''
      		},
  // 添加修改页面显示
  dialogFormVisible: false,
  formLabelWidth: '120px'
}
},
created(){
this.getGoodsList();
},
methods:{
// 根据分页获取对应的商品列表
async getGoodsList(){
const {data:res} = await this.$http.get('goods',{params:this.queryInfo});
if(res.meta.status !== 200){
  return this.$message.error('获取商品列表失败！');
}
this.$message.success('获取商品列表成功!')
console.log(res.data);
this.goodslist = res.data.goods;
this.total = res.data.total;
},
handleSizeChange(newSize){
this.queryInfo.pagesize = newSize;
this.getGoodsList();
},
handleCurrentChange(newPage){
this.queryInfo.pagenum = newPage;
this.getGoodsList();
},
// 修改
handleEdit(index, row) {
				this.$data.title = "修改商品"
				this.dialogFormVisible = true
        this.form.goodsName = row.goodsName
				this.form.goodsPrice = row.goodsPrice
				this.form.goodsDesc = row.goodsDesc
				this.$data.form.flag = row.id
				console.log(index, row);
			},
// 删除
async handleDelete(index, row) {
				console.log(index, row);
				this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$delete(this.$data.goodslist, index)
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
      // 商品添加
      addGoods(val){
      	this.$data.title = "添加商品"
      	this.dialogFormVisible = true
        this.$data.form.goodsName = ""
      	this.$data.form.goodsPrice = ""
      	this.$data.form.goodsDesc = ""
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
    }



}
</script>

<style lang="less" scoped>

</style>
