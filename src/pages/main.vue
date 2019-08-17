<template>
	<div style="width: 100%;height: 100%;background-color: red">
		<!--<img src="https://xingyb.oss-cn-hangzhou.aliyuncs.com/iosApp/dati.jpg"/>-->
        <!--<div @click="itemClick()">去答题页</div>-->
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
	

</style>