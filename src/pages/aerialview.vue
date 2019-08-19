<template>
	<div id="panot">
		<!-- 缓存全景页面状态 -->
		<keep-alive include="XYPanoView">
			<xy-pano-view ></xy-pano-view>
		</keep-alive>
		<toolBar v-show="$store.getters.navAndTabbarShow"></toolBar>

		<button-list id="vtourclass" v-show="$store.getters.navAndTabbarShow" :itemsList="itemsList" :mark="vtourclass" :textcolor="textcolor"></button-list>
	</div>
</template>
<script type="text/javascript">
	// var panoJS=require("../js/pano.js");
	import Vue from 'vue';
	import PanoView from '@/components/VTour';
	import toolBar from '@/components/Tool';
	import bus from '@/js/method';
	import buttonlist from '@/components/ButtonList.vue';
	import store from '@/store/index.js';
	import encrypt from '@/js/encrypt.js';
	// import test from './static/pano/plugins/actionPlugin.js';
	// import test from '@/js/test.js';


	Vue.component('button-list',buttonlist);
	Vue.component('xy-pano-view',PanoView);
	Vue.component('toolBar',toolBar);
	export default{
		name:'Aerialview',
		data(){
			return{
				// itemsList:[
				// 	{des:"交通网络",icon:"./static/images/button_noselect.png",selected_icon:"./static/images/button_select.png",is_selected:true},
				// 	{des:"文旅商业",icon:"./static/images/button_noselect.png",selected_icon:"./static/images/button_select.png",is_selected:false},
				// 	{des:"医疗教育",icon:"./static/images/button_noselect.png",selected_icon:"./static/images/button_select.png",is_selected:false},
				// ],
				vtourclass:"vtourclass",
				textcolor:"ffffff",
				currentClass:null,
			}
		},
		computed:{
			itemsList(){
				return store.state.hostspotClass;
			},
			navAndTabbarShow(){
				return store.state.navAndTabbarShow;
			},
			panoPicResourceLoadComplete(){
				return store.state.panoPicResourceLoadComplete;
			}
		},
		created(){
			// console.log(this.$route.params.projectId);

			bus.$off('buttonlist-item-select');
			bus.$on("buttonlist-item-select",this.buttonListItemClick);
		},
		mounted(){
			var _self = this;

			// this.hiddenButton();
			// console.log($('#panot'));
			if (!store.state.dataRequestComplete) {
				// console.log("请求一次数据");
		        let url = store.state.baseUrl + 'project/getById';
		        let params = {'project_id':localStorage.getItem('project_id'),'user_id':localStorage.getItem('user_id')};
		        // alert(params);
		        // console.log(localStorage.getItem('project_id'));
		        this.$http.post(url,params,{emulateJSON:true}).then((res)=>{
		            // console.log(res.data);
		            var realdata = res.data;
					if (!realdata.success) {
						alert(realdata.message);
					}else{
						store.state.dataRequestComplete = true;
						// console.log(realdata.data);
						var data1 = realdata.data; 
						store.state.projectUserPhone = data1.project_linkman_phone;
						store.state.projectName = data1.project_name;
						store.state.projectXml = data1.panoXml;
						store.state.copyrightList = ['https://resources.xycoder.com/copyright/images/1/copyright1.png'];
						store.state.realisticView = ['https://resources.xycoder.com/realisticview/iamges/1/1903191524.jpg'];
						store.state.shortname = ['https://resources.xycoder.com/shortname/images/1/19031915241.jpg'];
						store.state.pageView = data1.pageView;
						store.state.favorite = data1.favourite;
						store.state.isLiked = data1.is_liked;
						store.state.bg_music = data1.bg_music;
						store.state.stateAlert = data1.project_status == 1?false:true;
						

						// console.log(data1.project_status);
						var  classes = data1.hostspot_class;
						var hotspotsclass = new Array();
						for (var i = 0; i < classes.length; i++) {
							var hsclass = new Object();
							hsclass.des = data1.hostspot_class[i].hostspotclass_title;
							hsclass.icon = data1.hostspot_class[i].hostspotclass_image;
							hsclass.selected_icon = data1.hostspot_class[i].hostspotclass_select_iamge;
							hsclass.class_name = data1.hostspot_class[i].hostspotclass_name;
							hsclass.is_selected = (i == 0)?true:false;

							hotspotsclass.push(hsclass);
						}
						store.state.hostspotClass = hotspotsclass;

						//分享相关数据
						store.state.projectShareTitle = data1.project_share_title,
						store.state.projectShareIcon = data1.project_share_icon,
						store.state.projectShareDetail = data1.project_share_detail,
						store.state.projectShareLinkurl = data1.project_share_linkurl,
						// console.log(data1);

						_self.getSignInfo();

						document.title = store.state.projectName;


						// 	console.log(_self.currentClass);

						// 	console.log(_self.navAndTabbarShow);
						// if (this.navAndTabbarShow) {
						// 	console.log(_self.currentClass);
						// 	encrypt.hiddenAllHotspotExcept(this.currentClass);//
						// }

					}
		        },(err)=>{
		            console.log(err);
		            // alert(err);
		        });
			}
		},
		beforeDestroy: function () {
			store.state.krpano = null;
		},
		watch:{
			navAndTabbarShow:{
				immediate:true,
				handler:function(e){
					if (e && this.currentClass && this.currentClass != null) {
						// console.log("来源是：navAndTabbarShow");
						encrypt.hiddenAllHotspotExcept(this.currentClass);
					}
				}
			},
			panoPicResourceLoadComplete:{
				immediate:true,
				handler:function(e){
					if (e && store.state.navAndTabbarShow) {
						encrypt.hiddenAllHotspotExcept(this.currentClass);
					}
				}
			}
		},
		methods:{
			buttonListItemClick:function(object){
				// console.log(object.class);
				if (object.class == this.vtourclass) {
					if (store.state.hostspotClass.length >0) {
						var itemclass = store.state.hostspotClass[object.index];
						// console.log("点击了："+itemclass.class_name);

						this.currentClass = itemclass.class_name;
						if (store.getters.navAndTabbarShow) {
							// console.log("怎么会不执行呢？"+this.currentClass +store.state.krpano);

							encrypt.hiddenAllHotspotExcept(this.currentClass);
						}
						// console.log("初始化了currentClass："+this.currentClass);
					}

				}
			},
			getSignInfo:function(){
				if (encrypt.platform() == 'wechat') {
					// alert(encodeURIComponent(window.location.href.split('#')[0]));
				//获取分享信息
			        let url = store.state.baseUrl + 'author/getSignInfo';
			        let params ={
			        	'user_id':localStorage.getItem('user_id'),
			        	'project_id':localStorage.getItem('project_id'),
			        	'url':encodeURIComponent(window.location.href.split('#')[0]),
			        	// 'project_id':localStorage.getItem('project_id'),
			    	}

			    	this.$http.post(url,params,{emulateJSON:true}).then((res)=>
		    		{	
		    			var realdata = res.data;
		    			if (realdata.success) {
		    				// alert(realdata.data.url);
		    				encrypt.shareSdk(realdata.data.appId,realdata.data.timestamp,realdata.data.nonceStr,realdata.data.signature,realdata.data.url);
		    			}else{
		    				// alert("获取分享信息接口失败:" + realdata.message);
		    				console.log("获取分享信息接口失败:" + realdata.message);
		    			}
		    		},(err)=>
		    		{
		    			console.log("获取分享信息网络失败:"+err);
		    			// alert("获取分享信息网络失败:"+err);
		    		});
				}
			}
		}
	}

</script>


<style type="text/css">
	#panot{
		/*display: block;*/
		width: 100%;
		height: 100vh;
		background: #eeeeee;
		position: relative;
		/*left: 0px;
		right: 0px;*/
		/*bottom: 0px;*/
		/*top: 0px;*/
	}
	xy-pano-view{
		position: absolute;
		background: green;
		width: 100%;
		height: 100%;
	}
	.toolBar{
		position: absolute;
		float: right;
		right: 10px;
		top: 20%;
	}

	#vtourclass{
		left: 20px;
		top: 60px;
		bottom: auto;
	}

	#vtourclass >>> span{
		color: red;
	}

	/*#panot >>> .buttonlist{
		bottom: auto;
	}*/
</style>