<template>
	<div class="tab">
		<!-- <tool v-bind:class="{toolstatus:tabbarstatus}"></tool> -->
		<div class="xy-tabbar" >
			<ul class="tabbar" >
				<!-- <li class="tabbaritem">{{item.title}}</li> -->
				<li  v-for="item in itemsList">
					<tabbaritem v-bind:id="item.index" :item ="item" @item_clicked ="itemClick" >
						{{item.title}}
					</tabbaritem>
				</li>
			</ul>
		</div>
	</div>
	
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import tabbaritem from '@/components/xy-tabbar-item'
	// import toolbar from '@/components/Tool'
	import bus from '@/js/method'
	import store from '@/store/index.js';

	Vue.component('tabbaritem',tabbaritem);
	// Vue.component('tool',toolbar);

	export default {
		name:"XYTarbar",
		data(){
			return{
				tabbarstatus:null,
				selectedIndex:0,
				itemsList:[
					{title:"全景鸟瞰",icon:"https://resources.xycoder.com/vrdefault/images/aerialview.png",selected_icon:"https://resources.xycoder.com/vrdefault/images/aerialview_selected.png" ,index:0,isSelected:false},
					{title:"示范区实景",icon:"https://resources.xycoder.com/vrdefault/images/realistictview.png",selected_icon:"https://resources.xycoder.com/vrdefault/images/realistictview_select.png",index:1,isSelected:this.selectedIndex == 1?true:false},
					{title:"项目简介",icon:"https://resources.xycoder.com/vrdefault/images/shortname.png",selected_icon:"https://resources.xycoder.com/vrdefault/images/shortname_selected.png",index:2,isSelected:this.selectedIndex == 2?true:false},
					{title:"区位优势",icon:"https://resources.xycoder.com/vrdefault/images/position.png",selected_icon:"https://resources.xycoder.com/vrdefault/images/position_selected.png",index:3,isSelected:this.selectedIndex == 3?true:false},
					{title:"版权申明",icon:"https://resources.xycoder.com/vrdefault/images/copyright.png",selected_icon:"https://resources.xycoder.com/vrdefault/images/copyright_selected.png",index:4,isSelected:this.selectedIndex == 4?true:false},
				]
			}
		},

		creat(){

		},
		mounted(){
			let ths = this;
			// console.log(ths.itemsList);
			for (var i = 0; i < ths.itemsList.length; i++) {
				if (ths.selectedIndex == i) {
					ths.itemsList[i].isSelected = true;
				}else{
					ths.itemsList[i].isSelected = false;
				}
			}


			//控制toolbar的显示和隐藏
			bus.$on('toolbarisshow',function(isShow){
				// console.log('toolbar的显示状况是：'+ isShow);
				ths.tabbarstatus = !isShow;
			});
		},
		props:['status'],
		computed:{
			tabbarIndex(){
				return store.state.tabbarIndex;
			},
		},
		watch:{
			tabbarIndex:{
				immediate:true,
				handler:function(e){
					this.itemClick(e);
					//
					store.state.tabbarIndex = 10;
					// console.log('我有监听到tabbar的status值是：'+e);
				}
			}
		},
		methods:{
			itemClick:function(index){

				let ths = this;

				if (index == 0) {
					ths.$router.push({path:"/aerialview"});
				}else if(index == 1){
					ths.$router.push({path:"/realisticView"});
				}else if(index == 2){
					ths.$router.push({path:"/shortName"});
				}else if(index == 3){
					ths.$router.push({path:"/position"});
				}else if(index == 4){
					ths.$router.push({path:"/copyright"});
				}else{
					return;
				}


				ths.selectedIndex = index;
				for (var i = 0; i < ths.itemsList.length; i++) {
				if (ths.selectedIndex == i) {
						ths.itemsList[i].isSelected = true;
					}else{
						ths.itemsList[i].isSelected = false;
					}
				}

			}
		},
	}
</script>

<style scoped>
	.toolstatus{
		visibility: hidden;
	}
	.tab{
		position: fixed;
		display: flex;
		width: 100%;
		height: 49px;
		bottom: 0px;
		left: 0px;
		right: 0px;
	}
	/*tool{
		z-index: 6;
		position: fixed;
		display: flex;
		bottom: 0px;

	}*/
	.xy-tabbar{
		position: fixed;
		display: flex;
		background: white;
		width: 100%;
		height: 49px;
		bottom: 0px;
		left: 0px;
		right: 0px;
	}
	.tabbar{
		/*border-top: 0.04px solid #000000 ;*/
		/*box-shadow:1px #000000;*/
		display: flex;
		width: 100%;
		padding: 0;
		margin:0;
		top: 0;
		left:0;
		bottom:0;
		right: 0;
		justify-content:space-around;
	}

	.tabbar li{
		height: 100%;
		float: left;
		margin:0;
		padding:0;
		flex: 1;
		list-style-type: none;
	}

</style>