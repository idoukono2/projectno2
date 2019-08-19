<template>
	<div class="bgview">
		<img style="width: 100%;" src="https://xingyb.oss-cn-hangzhou.aliyuncs.com/iosApp/headerbg.png"/>
		<div style="width: 100%;height: 80%;background-color: deepskyblue;position: fixed;bottom: 0px;">
			<div style="position: fixed;bottom: 0px;display: inherit;background-color: white;width: 100%;height: 120px;">
				<button class="startbtnClass" @click="startAnswer">开始答题</button>
				<button :class="{'awrrdbtnClassFirst':!canaward,'awrrdbtnClass': canaward}" @click="getAward">兑奖</button>
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
			    isfirst:true,
				cananswer:false,
				canaward:false
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
				if (ths.cananswer == true){
					ths.$router.push({path:"/answer"});
				} else {
					alert('您已经领取过三次奖品，无法通过答题获取更多奖品')
				}
			},
			getAward(){
				// if (this.canaward == false){
				// 	alert('您必须一次性答对四道题才能够领取精品！')
				// 	return
				// }
				this.$router.push({path:'/award'})
			},
            getisFirstlaunch(){
                return store.state.isFirstlaunch;
            },
			getdata(){
                let url = store.state.baseUrl + 'problem/getStatus'
                let params = {'userId':'1','isFirst':'0'};
                this.$http.post(url,params,{emulateJSON:true}).then((res)=>
                {
                    console.log(res)
					if (res.body.success == true){
						this.cananswer = res.body.data.can_answer
						this.canaward = res.body.data.can_award
						console.log("看赋值")
						console.log(this.cananswer)
						console.log(this.canaward)
					}

				},(err)=>
                {
                    console.log("获取首失败:"+err);
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