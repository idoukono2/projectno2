<template>
	<div class="bgview">
		<img style="width: 100%;" src="https://xingyb.oss-cn-hangzhou.aliyuncs.com/iosApp/headerbg.png"/>
		<div style="width: 100%;height: 80%;background-color: deepskyblue;position: fixed;bottom: 0px;">
			<div style="position: fixed;bottom: 0px;display: inherit;background-color: white;width: 100%;height: 120px;">
				<button class="startbtnClass" @click="startAnswer">开始答题</button>
				<button :class="{'awrrdbtnClassFirst':getisFirstlaunch,'awrrdbtnClass': !getisFirstlaunch}" @click="getAward">兑奖</button>
			</div>
		</div>
	</div>
</template>
<!--store.state.isFirstlaunch-->
<script type="text/javascript">
	import Vue from "vue";
	import toolitem from '@/components/Tool-item';
	import store from '@/store/index.js';

	Vue.component("toolitem",toolitem);
	export default{
		name:"toolBar",
		data(){
			return{
			    isfirst:true
			}
		},
		mounted(){
            console.log("到首页")
			this.getdata()
    	},
		computed:{

		},
		methods:{
			startAnswer(){
                // 去答题页
                let ths = this
                ths.$router.push({path:"/answer"});
			},
			getAward(){
				this.$router.push({path:'/award'})
			},
            getisFirstlaunch(){
                return store.state.isFirstlaunch;
            },
			getdata(){
//                let url = store.state.baseUrl + 'problem/getProblemByIndex'
                let url = 'http://192.168.0.107:8080/problem/getProblemByIndex'

                console.log(url)

                let params = {'userId':'1','isFirst':'0'};
                this.$http.get(url,params,{emulateJSON:true}).then((res)=>
                {
                    console.log(res)
                    var realdata = res.data;
                    if (realdata.success) {

                    }else{

                    }
                },(err)=>
                {
                    console.log("获取分享信息网络失败:"+err);
				});
			}
		}
	}

</script>

<style type="text/css" scoped>
	.bgview{
		width: 100%;
		height: 100%;
		background-color: #00b6af;
		position: absolute;
	}
	.startbtnClass{
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
	.awrrdbtnClass{
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
	.awrrdbtnClassFirst{
		margin-left: 20%;
		width: 60%;
		height: 45px;
		background-color: gray;
		line-height: 45px;
		text-align: center;
		margin-bottom: 15px;
		border-radius: 10px;
		font-size: 14px;
	}
</style>