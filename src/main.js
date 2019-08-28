// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'
import { Button, Select,Progress} from 'element-ui';

import store from '@/store/index.js'

import bus from '@/js/method'
import encrypt from '@/js/encrypt.js'
//微信sdk
import wx from 'weixin-js-sdk'




Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Select)
Vue.use(Progress)

localStorage.setItem('project_id','eg4wh0s4ki2')
localStorage.setItem('user_id','1')
//启动图的显示隐藏
emb.changeCallback = (progress)=>{
  store.state.loadingProgress = progress;
  // console.log(progress);
  if (progress >=100) {
    // setTimeout(function(){
      store.state.coverSplash = false;
      store.state.panoPicResourceLoadComplete = true;
    // },0);
  }
}

emb.littleplanetended = (ended)=>{
  if (ended) {
    // console.log("小行星动画结束");
    store.state.navAndTabbarShow = true;
  }
}

emb.logohotspotclick = (index)=>{
  // console.log('实景跳转'+ index);
  store.state.tabbarIndex = index;
  // this.$router.push({path:"/floorBook"});
}


//组件切换之前
router.beforeEach((to, from, next) => {

  let _self = this;
  // alert(window.location.href.split('#')[0]);
  //初始化陀螺仪和全景漫游状态
  if (to.path != '/main') {
    store.state.autoRoam = false;
    store.state.gyroscope = false;
    store.state.panoPicResourceLoadComplete = false;
    next();
  }

  // console.log('目标路由：'+ to.meta.title);
  if (encrypt.platform() == 'wechat') {//是否微信浏览器
    if (to.path == '/author' && localStorage.getItem('user_id')) {
      //用户返回到认证页，让其到首页
      next({path:'/main'});
      return false;
    }else if((!localStorage.getItem('user_id') || localStorage.getItem('user_id') == null) && to.path != '/author'){
      next({path:'/author',});
      return false;
    }else{
      next();
    }
  }else{
    // alert("请在微信打开");
    // return false;
    next();
  }

  
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
      // document.title = to.meta.title;
  }
})

//组件切换之后
router.afterEach((to, from, next) => {
	// console.log('目标路由：'+ to.params);
	//如果是切换到全景首页，倒计时隐藏tabbar
	// console.log('组件被激活');
})


/* eslint-disable no-new */
let object = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

//全局参数
 // new Vue();
Vue.prototype.bus = object;
//’isSpan‘  全景的交互模式
//toolbarisshow 工具栏的显示与否
bus.$emit('toolbarisshow',true);



function getUserInfoWithCode(code){
  let url = store.state.baseUrl + 'author2/getUserInfoIdByCode';
    let params = {'code':code};
    this.$http.post(url,params,{emulateJSON:true}).then((res)=>
    {
      var realdata = res.data;
      if (!realdata.success) {
        alert(realdata.message);
      }else{
        alert(res);
        store.state.user = realdata.data;
        console.log(realdata);
        localStorage.setItem('user_id',store.state.user.user_id);
        // window.location.href = realdata.data.authorize_url;
      }
    },(err)=>
    {
      console.log(err);
      alert(err);
    });
}

function AuthorUrl(){
  let url = store.state.baseUrl + 'author2/getAuthorUrl';
  let params = {'project_id':localStorage.getItem('project_id')};
  this.$http.post(url,params,{emulateJSON:true}).then((res)=>
  {
    var realdata = res.data;
    if (!realdata.success) {
      alert(realdata.message);
    }else{
      console.log(realdata['authorize_url']);
      window.location.href = realdata.data.authorize_url;
    }
  },(err)=>
  {
    console.log(err);
    alert(err);
  });
}


