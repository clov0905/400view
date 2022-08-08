<template>
  <div style="width: 100%;font-size: 14px;">
    <div style="background-color: #FFFFFF;">
      <div style="width: 60%;margin: 0 auto;">
        <div style="display: flex;margin-top: 20px;">
          <div style="width: 240px;background-color: #b44922;">
            <div class="item" @mouseenter="enter('1')" @mouseleave="leave">
              <div class="item-title">家用电器</div>
              <div class="item-nav"> ＞ </div>
            </div>
            <div class="item" @mouseenter="enter('2')" @mouseleave="leave">
              <div class="item-title">手机/运营商/数码</div>
              <div class="item-nav"> ＞ </div>
            </div>
            <div class="item" @mouseenter="enter('3')" @mouseleave="leave">
              <div class="item-title">电脑/办公</div>
              <div class="item-nav"> ＞ </div>
            </div>
            <div class="item" @mouseenter="enter('4')" @mouseleave="leave">
              <div class="item-title">家居/家具/家装/厨具</div>
              <div class="item-nav"> ＞ </div>
            </div>
            <div class="item" @mouseenter="enter('5')" @mouseleave="leave">
              <div class="item-title">男装/女装/童装/内衣</div>
              <div class="item-nav"> ＞ </div>
            </div>
            <div class="item" @mouseenter="enter('6')" @mouseleave="leave">
              <div class="item-title">美妆/个人清洁/宠物</div>
              <div class="item-nav"> ＞ </div>
            </div>
            <div class="item" @mouseenter="enter('7')" @mouseleave="leave">
              <div class="item-title">女鞋/箱包/钟表/珠宝</div>
              <div class="item-nav"> ＞ </div>
            </div>
            <div class="item" @mouseenter="enter('8')" @mouseleave="leave">
              <div class="item-title">男鞋/运动/户外</div>
              <div class="item-nav"> ＞ </div>
            </div>
            <div class="item" @mouseenter="enter('9')" @mouseleave="leave">
              <div class="item-title">房产/汽车/汽车用品</div>
              <div class="item-nav"> ＞ </div>
            </div>
            <div class="item" @mouseenter="enter('10')" @mouseleave="leave">
              <div class="item-title">母婴/玩具乐器</div>
              <div class="item-nav"> ＞ </div>
            </div>
			<div class="item" @mouseenter="enter('11')" @mouseleave="leave">
			  <div class="item-title">食品/酒类/生鲜/特产</div>
			  <div class="item-nav"> ＞ </div>
			</div>
			<div class="item" @mouseenter="enter('12')" @mouseleave="leave">
			  <div class="item-title">艺术/礼品鲜花/农资绿植</div>
			  <div class="item-nav"> ＞ </div>
			</div>

          </div>

          <div style="flex: 1;position:relative;overflow: hidden;">
			  <!-- 轮播图 -->
            <el-carousel style="position: absolute;height: 100%;width: 100%;">
              <el-carousel-item v-for="url in imgs" :key="url">
                <el-image
                   @click="productDetail"
                   style="width: 100%;height: 100%;"
                  :src="url"
                  :fit="fit">
                </el-image>
              </el-carousel-item>
            </el-carousel>
			
			<!--  -->
            <div v-if="hover" @mouseenter="enter()" @mouseleave="leave" style="height: 100%;box-shadow: 0 50px 5px 0 #eee;position: absolute;background: #FFFFFF;z-index: 9999;width: 100%;padding: 20px 20px 0 20px;border: 1px solid #e0e0e0;overflow: scroll;box-sizing: border-box;">
              <div v-for="(item,index) in prodducts" style="display: inline-block;margin: 0 20px 30px 0;">
                <div style="display: flex;" class="pro-hov-title" @click="productDetail">
                  <img :src="item.img" style="width: 40px;height: 40px;display: inline-block;">
                  <div style="display: inline-block;line-height: 40px;font-size: 16px;">
                    {{item.title}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex;overflow: hidden;margin-top: 20px;">
          <div style="flex: 1;text-align: center;" @click="productDetail">
            <img src="../../../../public/img/b1.png"/>
          </div>
          <div style="flex: 1;text-align: center;" @click="productDetail">
            <img src="../../../../public/img/b2.png"/>
          </div>
          <div style="flex: 1;text-align: center;" @click="productDetail">
            <img src="../../../../public/img/b3.png"/>
          </div>
        </div>
      </div>
    </div>

    <div style="background-color: #EEEEEE;">
      <div style="width: 60%;margin: 0 auto;">
       

        <div style="height: 50px;line-height: 50px;margin-top: 50px;color: gray;display: flex;">
          <div style="font-size: 25px;">手机</div>
          <div style="flex: 1;text-align: right;" class="more">查看全部</div>
        </div>
        <div style="display: flex;">
          <div style="width: calc(20% - 16px);">
            <img src="../../../../public/img/e1.png" style="width: 100%;height: 642px;"/>
          </div>
          <div style="flex: 1;">
            <div style="height: 310px;display: flex;">
              <div v-for="i in 4" class="product" style="width: calc(25% - 16px);border-top: 1px solid #1f84f0;background-color: #fafafa;margin-left: 20px;">
                <div style="text-align: center;">
                  <span style="background-color: #1f84f0;color: #FFFFFF;padding:0 20px;">秒杀</span>
                </div>
                <div style="height: 180px;display: flex;text-align: center;">
                  <img src="../../../../public/img/c1.jpg" style="width: 100%"/>
                </div>
                <div style="text-align: center;text-overflow: ellipsis;line-height: 25px;">
                  红米6 Pro 4GB+32GB
                </div>
                <div style="text-align: center;text-overflow: ellipsis;line-height: 25px;color: gray;">
                  高颜值大电量/异形全面屏/后置
                </div>
                <div style="text-align: center;line-height: 40px;">
                  <span style="color: red;">￥900元</span>
                  <span style="color: gray;text-decoration: line-through;">￥1290元</span>
                </div>
              </div>
            </div>
            <div style="height: 310px;display: flex;margin-top: 20px;">
              <div v-for="i in 4" class="product" style="width: calc(25% - 16px);border-top: 1px solid #1f84f0;background-color: #fafafa;margin-left: 20px;">
                <div style="text-align: center;">
                  <span style="background-color: #1f84f0;color: #FFFFFF;padding:0 20px;">秒杀</span>
                </div>
                <div style="height: 180px;display: flex;text-align: center;">
                  <img src="../../../../public/img/c1.jpg" style="width: 100%"/>
                </div>
                <div style="text-align: center;text-overflow: ellipsis;line-height: 25px;">
                  红米777 Pro 4GB+32GB
                </div>
                <div style="text-align: center;text-overflow: ellipsis;line-height: 25px;color: gray;">
                  高颜值大电量/异形全面屏/后置
                </div>
                <div style="text-align: center;line-height: 40px;">
                  <span style="color: red;">￥900元</span>
                  <span style="color: gray;text-decoration: line-through;">￥1290元</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin: 20px 0;">
          <img src="../../../../public/img/f1.png" style="width: 100%;height: 120px;"/>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
	
  export default {
      data() {
        return {
            fit: 'cover',
            hover: false,
            imgs: [Jpg1,Jpg2,Jpg3],
              prodducts:[],
              prodducts1: [
                {img: Jpg1,title:'Xiaomi Civi 1S'},
              ],
              prodducts2: [
                {img:Jpg2,title:'RedmiBook Pro14 2022'},
               
              ],

        };
      },
      mounted() {
      },
      methods: {
        productDetail(){
          this.$router.push({'path':'/login'});
        },
        enter(id){
          if(id){
            if(id % 2 == 0){
              this.prodducts = this.prodducts1;
            }else{
              this.prodducts = this.prodducts2;
            }
          }
          this.hover = true;
        },
        leave(){
          this.hover = false;
        }

      }
    };
	// 轮播图图片
	import Jpg1 from '../../../../public/img/q.jpg'
	import Jpg2 from '../../../../public/img/q(1).jpg'
	import Jpg3 from '../../../../public/img/q(2).jpg'
</script>

<style>
	/* 自适应全屏banner图 */
  .el-carousel__container {
      height: 100% !important;
    }
</style>
