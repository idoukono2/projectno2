<template>
	<div>
		<ul v-for="imagesUrl in copyrightList">
			<img :src="imagesUrl" alt="">
		</ul>
	</div>
</template>

<script type="text/javascript">
	import store from '@/store/index.js';
	export default{
		name:'realisticView',

		data(){
			return{

			}
		},
		computed:{
			copyrightList(){
				return store.state.realisticView;
			}
		},
		created(){
			store.state.coverSplash = false;
			store.state.navAndTabbarShow = true;
		},
	}
</script>

<style type="text/css" scoped>
	div{
		width:100%;
		height: 100%;
	}

	ul{
		padding: 0px;
		margin: 0px;
	}
	img{
		padding: 0px;
		margin: 0px;
		width: 100%;
		display: inline-block;
	}
</style>