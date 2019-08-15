<template>
	<div class="toolBar">
		<ul >
			<li v-for="(item,itemindex) in itemsList" @click="itemClick(itemindex)">
				<toolitem :item="item"></toolitem>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	import Vue from "vue";
	import toolitem from '@/components/Tool-item';
	import store from '@/store/index.js';

	Vue.component("toolitem",toolitem);
	export default{
		name:"toolBar",
		data(){
			return{
			}
		},

		computed:{
			itemsList(){
				return [
					{des:"陀螺仪",icon:"https://resources.xycoder.com/vrdefault/images/gyroscopeG.png",selected_icon:"https://resources.xycoder.com/vrdefault/images/gyroscope_selectedG.png",is_selected:store.state.gyroscope,title_center:true},
					{des:"全景漫游",icon:"https://resources.xycoder.com/vrdefault/images/roamG.png",selected_icon:"https://resources.xycoder.com/vrdefault/images/roam_selectedG.png",is_selected:store.state.autoRoam,title_center:true},
					{des:"喜欢·"+store.getters.favorite,icon:"https://resources.xycoder.com/vrdefault/images/like-noG.png",selected_icon:"https://resources.xycoder.com/vrdefault/images/likeG.png",is_selected:store.state.isLiked},
					{des:"人气·"+store.getters.pageview,icon:"https://resources.xycoder.com/vrdefault/images/pageviewGG.png",selected_icon:"https://resources.xycoder.com/vrdefault/images/pageviewGG.png",is_selected:true},
				]
			},
			pageview(){
				return store.state.pageView;
			},
			favorite(){
				return store.state.favorite;
			}
		},

		methods:{
			itemClick(index){
				if (index == 0) {
					//切换陀螺仪
					store.state.gyroscope = !store.state.gyroscope;
				}else if(index == 1){
					//切换全景漫游
					store.state.autoRoam = !store.state.autoRoam;
				}else if(index == 2){
					if (store.state.isLiked) {
						//爱心满天飞
						this.$options.methods.loveheartfly();
					}else{
						//点赞
						let url = store.state.baseUrl + 'project/addLike';
						let params = {'project_id':localStorage.getItem('project_id'),
									  'type':(localStorage.getItem('user_id') && localStorage.getItem('user_id') != null)?1:2,
									  'user_id':localStorage.getItem('user_id')
										};
										// alert(localStorage.getItem('user_id'));
						this.$http.post(url,params,{emulateJSON:true}).then((res)=>
						{
						  var realdata = res.data;
						  if (!realdata.success) {
						    alert(realdata.message);
						  }else{
						      // console.log(realdata['authorize_url']);
						      // window.location.href = realdata.data.authorize_url;
						    store.state.favorite = store.state.favorite +1;
							store.state.isLiked = !store.state.isLiked;
						  }
						},(err)=>
						{
						  console.log(err);
						  alert('点赞失败，'+err);
						});
					}
				}else{
					//浏览量，啥也不做
					return;
				}
			},
			loveheartfly(){
				console.log("爱心满天飞");

				
			}
		}
	}

</script>

<style type="text/css" scoped>
	ul{
		padding:0px; 
	}
	li{
		list-style-type: none;
	}

	canvas {
		display: block;
		position: absolute;
		bottom: 100px;
		right: -24px;
		z-index: 20;
		cursor: pointer;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
</style>