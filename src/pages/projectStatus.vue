<template>
	<div class="alertcover">
		<!-- <div id="statusbg"></div> -->
		<img id="alertimage" src="https://resources.xycoder.com/vrdefault/images/status.png" />
		<!-- <xy-progressbar :percentNum= "$store.state.loadingProgress"></xy-progressbar> -->
		<!-- <span>{{$store.state.loadingProgress}}</span> -->
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import store from '@/store/index.js'

	export default{
		name:'XYAlertView',
		data(){
			return{
				progress:0,
			}
		},
		mounted(){
			// console.log(this.$route.params.projectId);
		},
	}
</script>

<style type="text/css" scoped>
	#alertimage{
		margin: 0px;
		padding: 0px;
		width: 60%;
		top:50%;
        left:50%;
		border-radius: 20px;
		position: absolute;
		transform:translate(-50%,-50%);
        text-align: center;
	}
	.alertcover{
		position: absolute;
		z-index: 8;
		opacity: 1;
		width: 100%;
		height: 100%;
		padding: 0px;
		margin:0px;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		/*opacity: 0.8;*/
		/*background-color: black;*/
		background: rgba(0,0,0,0.5)
	}

</style>