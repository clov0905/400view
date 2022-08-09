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
        <el-button slot="append" icon="el-icon-search" @click="findGoodsByName()"></el-button>
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
      	<span style="margin-left: 10px">{{ scope.row.goodsName}}</span>
      </template>

    </el-table-column>
    <el-table-column label="商品价格(元)" width="180">
      <template slot-scope="scope">
      <!-- 	<i class="el-icon-time"></i> -->
      	<span style="margin-left: 10px">{{ scope.row.goodsPrice}}</span>
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
     @next-click="nextClick"
     @prev-click="prevClick"
      @size-change="handleSizeChange"
       @current-change="currentChange"
     :current-page="currentPage"
     :page-size:="pagesize"
     layout="prev, pager, next,total"
     :total="total">
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



<!-- 新增商品 -->
<!-- <el-dialog :title="addTitle" :visible.sync="addDialogFormVisible">
			<el-form :model="addForm">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
        	<el-input v-model="addForm.goodsName" autocomplete="off"></el-input>
        </el-form-item>
				<el-form-item label="商品价格" :label-width="formLabelWidth">
					<el-input v-model="addForm.goodsPrice" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品描述" :label-width="formLabelWidth">
					<el-input v-model="addForm.goodsDesc" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addDialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addOrUpd()">确 定</el-button>
			</div>
		</el-dialog> -->
</div>
</template>

<script>
export default {
data(){
return{
  // 查询参数对象

  queryInfo:{
    query:'',
    // pagenum:1,
    // pagesize:5,
    goodsName: '',
  },
  // 商品列表
  goodslist:[],
  // 总数据条数
  total:0,
  pagesize:6,
  currentPage:1,
  search: '',
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
  formLabelWidth: '120px',

/*  //新增商品
  addTitle:'新增',
  addForm:{

  },
  addDialogFormVisible:false, */

}
},
// created(){
// this.getGoodsList();
// },
methods:{
  currentChange(val) {
  	this.currentPage = val;
    this.findGoodsByName()
  },
  handleSizeChange(psize) {
      this.pageSize = psize;
      this.findGoodsByName()
  },
  prevClick(){
    this.$data.currentPage=this.$data.currentPage-1
    this.getGoodsList("",(this.$data.currentPage-1)*this.$data.pagesize,this.$data.pagesize)
  },
  nextClick(){
    this.$data.currentPage=this.$data.currentPage+1
    this.getGoodsList("",(this.$data.currentPage-1)*this.$data.pagesize,this.$data.pagesize)
  },
  findGoodsByName(){
     this.getGoodsList(this.$data.search,(this.$data.currentPage-1)*this.$data.pagesize,this.$data.pagesize)
  },
  getGoodsList(goodsName,startPage,singlePageNum){
      this.$axios({
          url: '/goodsMange/findGoodsListByName/',
          method: 'post',
          headers: { "Content-Type": "multipart/form-data" },
          data:{
              goodsName:goodsName,
              startPage:startPage,
              singlePageNum:singlePageNum,
          }//传值
        })
        .then(res=>{
          console.log('数据接收:',res.data.list);
          console.log('数据总量:',res.data.num);
          this.$data.total=res.data.num
          //赋值table绑定的数组
          this.$data.goodslist=res.data.list
          console.log("当前页:",this.$data.currentPage,"页/条:",this.$data.pagesize,"起始:",(this.$data.currentPage-1)*this.$data.pagesize)
        });
  },
// // 根据分页获取对应的商品列表
// async getGoodsList(){
// const {data:res} = await this.$http.get('goods',{params:this.queryInfo});
// if(res.meta.status !== 200){
//   return this.$message.error('获取商品列表失败！');
// }
// this.$message.success('获取商品列表成功!')
// console.log(res.data);
// this.goodslist = res.data.goods;
// this.total = res.data.total;
// },
handleSizeChange(newSize){
this.queryInfo.pagesize = newSize;
this.getGoodsList();
},
handleCurrentChange(newPage){
this.queryInfo.pagenum = newPage;
this.getGoodsList();
},
// 修改(回显)
handleEdit(index, row) {
				this.$data.title = "修改商品"
				this.dialogFormVisible = true
        this.form.goodsName = row.goodsName
				this.form.goodsPrice = row.goodsPrice
				this.form.goodsDesc = row.goodsDesc
				this.$data.form.id = row.id
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
					this.$axios({
					    url: 'goodsMange/delGoods',
					  	method: 'post',
					  	headers: { "Content-Type": "multipart/form-data" },
					    data:{
                 index:row.id
					    }//传值
					  }).then(function(response) {
					  	console.log('数据接收');
					  	console.log(response.data);
					  	if(response.data === 1 ){
					  	  that.$message({ message: "删除成功", type: "success" });
					      //刷新
					      that.getGoodsList();
					  	}else if(response.data === 0){
					  	  that.$message.error("删除失败");
					  	}
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
// 修改/添加 按钮
      addOrUpd(){
        //新增
      	if(this.$data.form.flag == '-1'){
          const that = this
          this.$axios({
              url: 'goodsMange/insertGoods',
            	method: 'post',
            	headers: { "Content-Type": "multipart/form-data" },
              data:{
                 goodsName:this.$data.form.goodsName,
                 // goodsImg:this.$data.form.UName,
                 goodsPrice:this.$data.form.goodsPrice,
                 goodsDesc:this.$data.form.goodsDesc
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
          console.log("")
          //修改
      		const that = this
      		this.$axios({
      		    url: 'goodsMange/updGoods',
      		  	method: 'post',
      		  	headers: { "Content-Type": "multipart/form-data" },
      		    data:{
                 id:this.$data.form.id,
                 goodsName:this.$data.form.goodsName,
                 // goodsImg:this.$data.form.goodsImg,
      		       goodsPrice:this.$data.form.goodsPrice,
      		       goodsDesc:this.$data.form.goodsDesc
      		    }//传值
      		  }).then(function(response) {
      		  	console.log('数据接收');
      		  	console.log(response.data);
      		  	if( response.data === true ){
      		  	  that.$message({ message: "修改成功", type: "success" });
                //刷新
                that.getUserList();
      		  	}else if( response.data === false){
      		  	  that.$message.error("修改失败");
      		  	}
      		});
      		// this.reload()
      		this.dialogFormVisible = false
      	}
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
},

 mounted(){
        console.log("挂载后：数据已挂载到模板中。。。mounted")
        this.getGoodsList("",(this.$data.currentPage-1)*this.$data.pagesize,this.$data.pagesize)
      },



    }

</script>

<style lang="less" scoped>

</style>
