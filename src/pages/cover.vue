<template>
	<div class="cover">
		<img id="cover-image" src="https://resources.xycoder.com/vrdefault/images/coverG.png" />
		<xy-progressbar :percentNum= "$store.state.loadingProgress"></xy-progressbar>
		<!-- <span>{{$store.state.loadingProgress}}</span> -->
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import store from '@/store/index.js';
	import xyprogressbar from '@/components/progressContainer'

	Vue.component('xy-progressbar',xyprogressbar)
	export default{
		name:'XYSplash',
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
	#cover-image{
		margin: 0px;
		padding: 0px;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		position: absolute;
		background-color: #ffffff;
	}
	.cover{
		/*background-color:red;*/
		position: absolute;
		z-index: 7;
		opacity: 1;
		width: 100%;
		height: 100%;
		padding: 0px;
		margin:0px;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;

		background-color: black;
	}
	.cover >>> #xy-progressbar{
		width: 60%;
    	top: 80%;
    	left: 20%;

	}

</style>