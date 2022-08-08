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
      <el-button type="primary" @click="goAddpage">添加商品</el-button>
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
  total:0
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
goAddpage(){
this.$router.push('/goods/add');
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
