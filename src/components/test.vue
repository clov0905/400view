<template>
  div class="table_resource" style="text-align:center">
              <el-table :data="showTable" border style="width: 100%">
                  <el-table-column type="index"  prop="order" label="序号" width="150" align="center">
                  </el-table-column>
                  <el-table-column type="selection" width="55" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="名称" width="120" align="center">
                  </el-table-column>
                  <el-table-column prop="unit" label="单位" width="120" align="center">
                  </el-table-column>
                  <el-table-column prop="quantity" label="数量" width="120" align="center">
                  </el-table-column>
                  <el-table-column prop="unitPrice" label=" 单价" width="120" align="center">
                  </el-table-column>
                  <el-table-column prop="totalPrice" label="总价(元)" width="120" align="center">
                      <div slot-scope="scope">
                          {{scope.row.totalPrice=scope.row.quantity*scope.row.unitPrice}}
                      </div>
                  </el-table-column>
                  <el-table-column prop="remarks" label="备注" width="338" align="center">
                  </el-table-column>
              </el-table>
          </div>
   
          <div class="resource-page">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :page-sizes="[3,5,15]" :page-size="pagesize" :pager-count="7"
                  layout=" prev, pager, next,sizes, jumper" :total="filterDataShow.length">
              </el-pagination>
          </div>
</template>

<script>
   var vm = new Vue({
          el: '#app',
          data: {
              keywords: '', // 搜索的关键字
              filterDataShow: [], //储存符合条件的数据
   
              tableData: [{
                      index: '1',
                      name: '圆珠笔',
                      unit: '支',
                      quantity: '45',
                      unitPrice: '2',
                      remarks: '物资充足'
                  },
                  {
                      index: '2',
                      name: '纸张',
                      unit: '页',
                      quantity: '52',
                      unitPrice: '4',
                      remarks: '物资充足'
                  },
                  {
                      index: '3',
                      name: '椅子',
                      unit: '把',
                      quantity: '34',
                      unitPrice: '6',
                      remarks: '物资充足'
                  },
                   ...
              ], //分页前的数据
              pagesize: 4,
              currentPage: 1,
          },
          methods: {
              searchResource() {
                  this.currentPage = 1; //将当前页设置为1，确保每次都是从第一页开始搜
                  let filterKeywords = this.keywords.trim();
                  let filerReasource = this.tableData.filter(item => { //过滤全部数据
                      if (item.name.includes(filterKeywords)) {
                          return item
                      }
                  })
                  this.filterDataShow = filerReasource; //将符合条件的内容赋给filterDataShow
              },
              onSubmit() {},
              handleSizeChange(psize) {
                  this.pagesize = psize;
              },
              handleCurrentChange(currentPage) {
                  this.currentPage = currentPage;
              }
   
          },
          mounted() {
              this.searchResource(); //在页面挂载后调用此方法，确保数据与页面发生了交互
          },
          watch: { //监听搜索框内容，当搜索框内容发生变化时调用searchResource方法
              keywords: {
                  handler() {
                      this.searchResource()
                  }
   
              }
   
          },
          computed: {
              //showTable计算属性通过slice方法计算表格当前应显示的数据
              showTable() {
                  return this.filterDataShow.slice(
                      (this.currentPage - 1) * this.pagesize,
                      this.currentPage * this.pagesize
                  );
              }
          }
   
      })

</script>

<style>
</style>
