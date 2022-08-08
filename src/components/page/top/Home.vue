<template>
  <div id="home">
    <div ><img id="imgstu" src="../assets/imgs/atudent.png" alt="">
      <div style="margin-left: 500px;margin-top: -50px">
        <a href="/Login">登录</a> | <a href="/Regis">注册</a>
          <el-input v-model="input" placeholder="热门搜索:热干面" style="width: 150px">
          </el-input>
        <div style="margin-top: -40px;margin-left: 320px">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
        <a href="/PersonalCenter" style="position: absolute;left: 1210px;top: 110px">个人中心</a>
      </div>
    </div>
<!--    菜单-->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="margin-left: 400px;border-bottom: solid 0px #e6e6e6;">
    <el-menu-item index="1">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">所有商品</template>
      <div style="margin-left: -500px">
        <tr>
          <td><img src="../assets/imgs/a (1).jpg"></td>
          <td><img src="../assets/imgs/a (2).jpg"></td>
          <td><img src="../assets/imgs/a (3).jpg"></td>
          <td><img src="../assets/imgs/a (5).jpg"></td>
          <td><img src="../assets/imgs/a (6).jpg"></td>
          <td><img src="../assets/imgs/a (7).jpg"></td>
          <td><img src="../assets/imgs/a (8).jpg"></td>
        </tr>
      </div>
    </el-submenu>
      <el-submenu index="3">
        <template slot="title">装饰摆件</template>
        <el-menu-item index="3-1">装饰摆件</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">布艺软式</template>
        <el-menu-item index="4-1">布艺软式</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">墙饰壁挂</template>
        <el-menu-item index="5-1">墙饰壁挂</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">蜡艺香薰</template>
        <el-menu-item index="6-1">蜡艺香薰</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">创意家居</template>
        <el-menu-item index="7-1">创意家居</el-menu-item>
      </el-submenu>
    </el-menu>
  <div>
        <el-carousel height="500px">
          <el-carousel-item v-for="item in pics" :key="item.url">
            <img :src="item.url"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    <div style="overflow: hidden">
      <img src="../assets/imgs/i1.jpg" style="margin-top: 10px;transition: all 0.6s">
      <img src="../assets/imgs/i2.jpg" style="margin-left: 8px;transition: all 0.6s">
      <img src="../assets/imgs/i3.jpg" style="margin-left: 8px;transition: all 0.6s">
    </div>
    <div style="width: 1450px;margin-left: 20px">
      <el-divider>《&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;心水 · 特色&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;》</el-divider>
      <div style="overflow: hidden">
        <img src="../assets/imgs/j6.png" height="350px" style="transition: all 0.6s">
        <img src="../assets/imgs/j1.jpg" width="260px" height="350px" style="transition: all 0.6s">
        <img src="../assets/imgs/j2.jpg" style="margin-left: 8px;transition: all 0.6s" width="260px" height="350px" >
      </div>
    </div><!--下划线-->
    <el-divider>《&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;摆件 · 茶艺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;》</el-divider>
    <div style="overflow: hidden">
      <img src="../assets/imgs/j3.jpg" height="350px" style="margin-left: 8px;transition: all 0.6s">
      <img src="../assets/imgs/j5.jpg" width="260px" height="350px" style="margin-left: 8px;transition: all 0.6s">
      <img src="../assets/imgs/j2.jpg" style="margin-left: 8px;transition: all 0.6s" width="260px" height="350px">
    </div>
    <div><img src="../assets/imgs/d.png" width="1500px"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input: '',
      pics: [
        { url: require('../assets/imgs/banner1.jpg') },
        { url: require('../assets/imgs/banner2.jpg') },
        { url: require('../assets/imgs/banner1.jpg') },
        { url: require('../assets/imgs/banner2.jpg') }
      ]
    }
  }
}
</script>

<style scoped>
  div  a{
    text-decoration: none;
  }
  #home{
  height: 130px;
  }
  #imgstu{
    margin-top: 35px;
    margin-left: -800px;
    width: 120px;
  }
  div img:hover{
    transform:scale(1.1)
  }
  /*tr{*/
  /*  display: none;*/
  /*}*/
  /*#myBox:hover tr{*/
  /*  display: block;*/
  /*}*/
</style>
