<template>
	<div class="toolitem">
		<img :src="item.is_selected?item.selected_icon:item.icon" >
		<span :class="item.title_center?'titleCenter':''">{{item.des}}</span>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:"toolitem",
		data(){
			return{

			}
		},
		props:{
			item:Object
		}
	}
</script>

<style type="text/css" scoped>
	.toolitem{
		text-align: center;
		width: 30px;
		height: 60px;
	}
	.toolitem img{
		width: 100%;
		height: 30px;
		margin-bottom: 0px;
		padding-bottom: 0px;
	}
	.toolitem span{
		text-align: center;
		float: right;
		white-space: nowrap;
		display: inline-block;
		margin-top: 0px;
		padding-top: 0px; 
		font-size: 10px;
		color: #ffffff;
	}
	.titleCenter{
		text-align: right;
	}
</style>