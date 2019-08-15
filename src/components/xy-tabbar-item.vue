<template>
	<div class="xy-tabbar-item" >
		<a v-if = "item.isSelected" v-on:click = "click">
			<img  v-bind:src = "item.selected_icon">
			<span :class="{itemtitle:!item.isSelected,itemselectedtitle:item.isSelected}" >
				{{item.title}}
			</span>
		</a>
		<a v-else v-on:click = "click">
			<img  v-bind:src = "item.icon" >
			<span class="item-title" >
				{{item.title}}
			</span>
		</a>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'',
		data(){
			return {

			}
		},

		props:['item'],
		mounted(){
			// console.log(this.item.icon);
		},
		methods:{
			click(){
				this.$emit("item_clicked",this.$el.id);
			}
		}
	}
</script>

<style scoped>
	a{
		display: block;
	}
	.xy-tabbar-item{
		text-align: center;
	}
	img{
		margin-top: 5px;
		width: 25px;
		height: 25px;
		/*background: yellow;*/
	}
	span{
		margin:0;
		padding:0;
		margin-top: -3px;
		display: block;
		width: 100%;
		font-size: 8px;
	}
	.item-title{
		margin:0;
		padding:0;
		margin-top: -3px;
		display: block;
		width: 100%;
		font-size: 8px;
		color: black;
	}
	.itemselectedtitle{
		margin:0;
		padding:0;
		margin-top: -3px;
		display: block;
		width: 100%;
		font-size: 8px;
		color: #0080ff;
	}
</style>