<template>
	<div >
		<div class="answerbgview">
			<img style="width: 100%;" src="https://xingyb.oss-cn-hangzhou.aliyuncs.com/iosApp/headerbg.png"/>
			<div style="width: 100%;height: 75%;background-color: deepskyblue;position: fixed;bottom: 0px;">
				<div style="position: fixed;bottom: 0px;display: inherit;background-color: white;width: 100%;height: 45px;">
					<button class="answerbtnClass" @click="startAnswer">开始答题</button>
				</div>
			</div>
		</div>
        <!--<div @click="itemClick(1)">去成功页</div>-->
        <!--<div @click="itemClick(0)">去失败页</div>-->
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
	.answerbgview{
		width: 100%;
		height: 100%;
		background-color: #00b6af;
		position: absolute;
	}
	.answerbtnClass{
		margin-left: 20%;
		width: 60%;
		height: 45px;
		background-color: red;
		line-height: 45px;
		text-align: center;
		margin-bottom: 15px;
		border-radius: 10px;
		font-size: 14px;
	}
</style>