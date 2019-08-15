<template>
	<div >
		<div>答题页</div>
        <div @click="itemClick(1)">去成功页</div>
        <div @click="itemClick(0)">去失败页</div>
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
			itemClick(success){
                // 去答题页
                let ths = this
                if (success == 0) {
                    ths.$router.push({path:"/failure"});
                }else if(success == 1){
                    ths.$router.push({path:"/success"});
                }
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