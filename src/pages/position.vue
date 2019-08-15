<template>
	<div id="position_cotent" >
		<!-- <h1>区位优势</h1> -->
		<img id="backMap" src="https://resources.xycoder.com/position/images/eg4wh0s4ki2/background3.png">
		<pageview :advantageList="advantageList" ></pageview>
		<button-list :itemsList="itemsList"></button-list>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import store from '@/store/index.js';
	import pagesView from '@/components/PagesView.vue';
	import buttonlist from '@/components/ButtonList.vue';


	Vue.component('pageview',pagesView);
	Vue.component('button-list',buttonlist);
	export default{
		name:'Position',
		data(){
			return{
				advantageList:[],
				itemsList:[
					{des:"交通网络",icon:"./static/images/button_noselect.png",selected_icon:"./static/images/button_select.png",is_selected:true},
					{des:"文旅商业",icon:"./static/images/button_noselect.png",selected_icon:"./static/images/button_select.png",is_selected:false},
					{des:"医疗教育",icon:"./static/images/button_noselect.png",selected_icon:"./static/images/button_select.png",is_selected:false},
				]
			}
		},
		created(){
			store.state.coverSplash = false;//启动页隐藏
			store.state.navAndTabbarShow = true;
		},
		methods:{
			// selectIndexChanged:function(index){
			// 	console.log(index);
			// }
		},

		beforeDestroy: function () {
			// console.log("");
			//重置按钮list index值
    		store.state.positionSelectIndex = 0;
		},
		mounted(){
			//获取区位信息
			let url = store.state.baseUrl + 'project/getPositionInfo';
	        let params = {'project_id':localStorage.getItem('project_id')};
	        // console.log(params);
	        this.$http.post(url,params,{emulateJSON:true}).then((res)=>{
	            // console.log(res.data);
	            var realdata = res.data;
				if (!realdata.success) {
					alert(realdata.message);
				}else{
					// console.log(realdata.data);
					this.advantageList = realdata.data;
					// var data1 = realdata.data;
					// store.state.projectUserPhone = data1.project_linkman_phone;
					// store.state.projectXml = data1.panoXml;
					// store.state.copyrightList = ['http://resources.xycoder.com/copyright/images/1/copyright1.png'];
					// store.state.pageView = data1.pageView;
					// store.state.favorite = data1.favourite;
					// store.state.isLiked = data1.is_liked;
					// store.state.bg_music = data1.bg_music;
				}
	        },(err)=>{
	            console.log(err);
	            alert(err);
	        });
		}
	}
</script>

<style type="text/css">

	#position_cotent{
		padding:0px;
		margin: 0px;
		width: 100%;
		height: 100%;
		/*height: calc(100% - 49px);*/
		bottom: 0px;
		top: 0px;
		left: 0px;
		position: absolute;
		
	}
	#backMap{
		position: fixed;
		/*display: flex;*/
		padding: 0;
		margin:0;
		width: 100%;
		height: 100%;
		/*height: calc(100% - 49px);*/
		/*bottom: 49px;*/
		top: 0;
		left: 0;
		right: 0;
	}
	/*#position_cotent >>> button-list{
		z-index: 22;
		position: fixed;
		position: absolute;
		float: right;
		right: 10px;
		top: 20%;
	}*/
</style>