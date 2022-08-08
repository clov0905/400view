//配置路由相关的信息
//1.引入router包 \VUE
import VueRouter from 'vue-router'
import Vue from 'vue'

//2.vue应用router(通过vue.use(插件)安装插件)
Vue.use(VueRouter)

//3.创建路由(router对象)
import AdminLogin from '../components/login.vue'
import AdminRegister from '../components/register.vue'
import JDIndex from '../components/page/index/index.vue'
import AdminIndex from '../components/adminIndex.vue'
import UserList from '../components/userList.vue'
import Power from '../components/power.vue'
// import userListAddOrUpd from '../components/userListAddOrUpd.vue'

const paths = [
		{path:'/',redirect:'/JDIndex'},
		{path:'/JDIndex',component:JDIndex},
		{path:'/login',component:AdminLogin},
		{path:'/register',component:AdminRegister},
    {path:'/power',component:Power},
		{path:'/adminIndex',
			component:AdminIndex,
			children:[
				// {path:'/userList/:id',component:UserList,props:true},
        {path:'/userList',component:UserList},
				{path:'/login01',component:AdminLogin},
        {path:'/power01',component:Power}
				],
		},
		// {path:'/addOrUpdate',component:userListAddOrUpd},
	]

const router = new VueRouter({
	routes: paths
	// [{
	//             path: '/login',
	//             component: AdminLogin
	//         },//注意，这里是routes而不是 routers
	//         {
	//             path: '/register',
	//             component: AdminRegister
	//         }
	//     ]
})

//4.封装给外部使用的对象应用
export default router


