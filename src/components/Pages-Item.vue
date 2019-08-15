<template>
	<div id="advantage_item">
		<img :src="item.position_advantage_url" alt="" id="adventage_img">
		<rotatePoint v-for="(item,itemindex) in item.position_point" :key="itemindex"  :item="item"></rotatePoint>
		<!-- <div id="descript">
			<img src="http://resources.xycoder.com/vrdefault/images/descriptionBorder.png" alt="" id="adventageBg">
			<div id="descript_text">
				<span id="title">{{item.position_title}}</span>
				<span id="des">{{item.position_des}}</span>
				<span id="detail">{{item.position_detail}}</span>
			</div>
		</div> -->
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import rotatePoint from '@/components/rotatePoint.vue';

	Vue.component('rotatePoint',rotatePoint);
	export default{
		name:'pagesViewitem',
		data(){
			return {
				pointList:[
					{title:"123456",iamge:"https://resources.xycoder.com/vrdefault/images/rotate.png",centerX:34,centerY:51,radius:25},
					{title:"avjydadv",iamge:"https://resources.xycoder.com/vrdefault/images/rotate.png",centerX:19,centerY:41,radius:33}
				]
				// item:{title:"123456",iamge:"http://resources.xycoder.com/vrdefault/images/rotate.png",centerX:100,centerY:100,radius:50}
			}
		},
		props:['item'],
	}

</script>

<style type="text/css" scoped>
	#advantage_item{
		height: 100%;
		width:100%;
		position: relative;
	}
	#adventage_img{
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: 0;
		padding:0;
		width: 100%;
		height: 100%;
	}
	#descript{
		position: absolute;
		bottom: 70px;
		width: 80%;
		/*margin-left:auto;
		margin-right:auto;*/
		left: 50%;
		transform: translateX(-50%); 
	}
	#descript img{
		/*position: relative;*/
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: 0;
		padding:0;
		width: 100%;
		height: 100%;
		position: absolute;
	}
	#descript_text{
		position: relative;
		margin:30px;
		margin-left: 40px;
		margin-right: 40px;
		/*background-color: #000000;*/
		height: auto;
		top: 0;
		left: 0;
	}

	#descript_text span{
		color: #eeeeee;
		display: block;
	}
	#title{
		font-size: 14px;
		padding-bottom: 5px;
	}
	#des{
		font-size: 12px;
		padding-bottom: 5px;
	}
	#detail{
		font-size: 8px;
	}
</style>