<template>
	<div class="listitem">
		<img :src="item.is_selected?item.selected_icon:item.icon" >
		<span  :class="'textcolor'?'buttonlistitem_title':item.is_selected?'itemSelectText':'listitemText'" >{{item.des}}</span>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:"buttonlistitem",
		data(){
			return{

			}
		},
		props:{
			item:Object,
			textcolor:String,
		},
		watch:{
			item:{
				immediate:true,
				handler:function(e){
					// console.log('item:'+e.is_selected);
					// if (this.textcolor && this.textcolor != null) {
					// 	 $(".buttonlistitem_title").css("color","#"+e);
					// }
				}
			},
			textcolor:{
				immediate:true,
				handler:function(e){
					// console.log('color:'+e);
					// $("#buttonlistitem_title").css("color","#"+e);
				}
			},
		}
	}
</script>

<style type="text/css" scoped>
	.listitem{
		text-align: center;
		width: 100%;
		height: 30px;
	}
	.listitem img{
		height: 30px;
		width: 100%;
		left: 0;
		margin-bottom: 0px;
		padding-bottom: 0px;
		position: absolute;
	}
	.listitemText{
		position: relative;
		text-align: center;
		/*float: right;*/
		left: 3%;
		top: 3px;
		white-space: nowrap;
		display: inline;
		width:100%;
		font-family:"黑体";
		margin-top: 0px;
		padding-top: 0px; 
		font-size: 16px;
		color: #00feff;
	}

	.buttonlistitem_title{
		position: relative;
		text-align: center;
		/*float: right;*/
		/*left: 3%;*/
		top: 3px;
		white-space: nowrap;
		display: inline;
		width:100%;
		font-family:"黑体";
		margin-top: 0px;
		padding-top: 0px; 
		font-size: 14px;
		color: #ffffff;
	}

	.itemSelectText{
		position: relative;
		text-align: center;
		/*float: right;*/
		left: 3%;
		top: 3px;
		white-space: nowrap;
		display: inline;
		width:100%;
		font-family:"黑体";
		margin-top: 0px;
		padding-top: 0px; 
		font-size: 16px;
		color: #505050;
	}
	.titleCenter{
		/*text-align: right;*/
	}
</style>