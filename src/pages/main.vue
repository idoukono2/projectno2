<template>
	<div >
		<div>首页</div>
        <div @click="itemClick()">去答题页</div>
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
		},

		methods:{
			itemClick(){
                // 去答题页
                console.log("到首页")
                let ths = this
                ths.$router.push({path:"/answer"});
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