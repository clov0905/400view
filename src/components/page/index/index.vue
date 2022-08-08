<template>
  <div style="width: 100%;height: 100%;overflow: auto;">
    <top></top>
    <centre></centre>
    <foot></foot>
  </div>
</template>

<script>
  import top from "../top/TopIndex.vue";
  import centre from "../centre/CentreIndex.vue"
  import foot from "../foot/FootIndex.vue";

  export default {
      components: {
        top,
		centre,
        foot
      },
      name: "index",
      data() {
        return {
        };
      },
      mounted() {
      },
      methods: {
      }
    };
</script>

<style>
	.title1{
	  cursor: pointer;
	  font-size: 16px;
	  line-height: 50px;
	  color: #8a8a8a;
	  margin-left: 20px;
	}
	.title1:hover{
	  color: red;
	}
	.item{
	  cursor: pointer;
	  height: 40px;
	  line-height: 40px;
	  padding: 0 0 0 10px;
	  color: #FFFFFF;
	  display: flex;
	}
	.item:hover{
	  background-color: #e37a2f;
	}
	.item-title{
	  flex: 1;
	}
	.item-nav{
	  width: 10px;
	  margin-right: 20px;
	}
	
	.product{
	  transition: transform 2s ease 1s;
	}
	.product:hover{
	  cursor: pointer;
	  margin-top: -10px;
	}
	.more:hover{
	  cursor: pointer;
	  color: red;
	}
	img{
	  cursor: pointer;
	}
	.pro-hov-title{
	  margin-left: 10px;
	  color: #333;
	  cursor: pointer;
	}
	.pro-hov-title:hover{
	  color: #e37a2f;
	}
</style>
