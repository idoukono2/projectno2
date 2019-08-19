import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store/index.js';

import VueResource from 'vue-resource'
import HelloWorld from '@/components/HelloWorld'
import Navigation from '@/components/Navigation'
import XYTarbar from '@/components/xy-tabbar'

import progressbar from '@/components/progressContainer'
import XYSplash from '@/pages/cover'
import XYAlertView from '@/pages/projectStatus'

import Author from '@/pages/author'
import Main from '@/pages/main'
import Answer from '@/pages/answer'
import Failure from '@/pages/failure'
import Success from '@/pages/success'
import Award from '@/pages/award'



import Alert from '@/components/Alert'
// import Index from '@/pages/index'

Vue.config.debug = true;

Vue.use(Router)
Vue.use(VueResource)

//注册组件
Vue.component('XYSplash',XYSplash);
Vue.component('Navigation',Navigation);
Vue.component('XYTarbar',XYTarbar);
Vue.component('XYAlertView',XYAlertView);
// Vue.component('projectStatus',projectStatus);

// Vue.component('progressbar',progressbar);


//注册路由
 export default new Router({
  routes: [
    {
      path:'/author',
      name:'Author',
      component:Author,
      meta:{
        title:'用户登录'
      }
    },
    {
      path:'/main',
      name:'Main',
      component:Main,
      meta:{
        title:"开始页",
        keepAlive: true
      }
    },
    {
      path:'/failure',
      name:'Failure',
      component:Failure,
      meta:{
        title:"失败页"
      }
    },
    {
      path:'/success',
      name:'Success',
      component:Success,
      meta:{
        title:"成功页"
      }
    },
    {
      path:'/award',
      name:'Award',
      component:Award,
      meta:{
        title:"奖励页"
      }
    },
    {
      path:'/answer',
      name:'Answer',
      component:Answer,
      meta:{
        title:"答题页"
      }
    },
      {
          path:'/projectStatus',
          name:'XYAlertView',
          component:XYAlertView,
          meta:{
              title:"状态"
          }
      },
    {
      path: "/",
      name:'Index',
      redirect: function(to){
        // localStorage.setItem('project_id',to.params.projectId);
        // store.state.projectId = to.params.projectId;
        // console.log(store.state.projectId);
        console.log("重定向到首页")
        return "/main";
      }
    }
  ]
})



