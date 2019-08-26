<template>
	<div class="bgview">
		<div>
			<img class="mainlogologoDiv" src="https://resources.xycoder.com/kobelco/images/logo.png"/>
		</div>
		<div>
			<img class="mainTitileDiv" src="https://resources.xycoder.com/kobelco/images/title.png"/>
		</div>
		<img class="mainsmallPeople" src="https://resources.xycoder.com/kobelco/images/img1.png"/>
		<div class="mainbottomBg">
			<p class="maintextClass">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 针对参观神钢展位的嘉宾，我们希望他们能够参观完神钢所有的重要区域，包括：SK210D多功能解体机，SK210D汽车解体机，SK350DLC抓钢机和室内共4个区域。同时，鼓励客户了解神钢的产品和技术。</p>
			<div class="btnbgClass">
				<button class="startbtnClass" @click="startAnswer">开始答题</button>
				<!--<button :class="{'awrrdbtnClassFirst':!canaward,'awrrdbtnClass': canaward}" @click="getAward">兑奖</button>-->
				<button class="awrrdbtnClass" @click="getAward">兑奖</button>
			</div>
		</div>
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
			    isfirst:true,
				cananswer:true,
				canaward:true
			}
		},
		mounted(){
            console.log("到首页")

            this.isfirst = this.getisFirstlaunch()
            console.log("是否首次")
            console.log(this.isfirst)
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
				if (this.canaward == false){
					alert('您必须一次性答对四道题才能够领取精品！')
					return
				}
				this.$router.push({path:'/award'})
			},
            getisFirstlaunch(){
                return store.state.isFirstlaunch;
            },
			getdata(){
                let url = store.state.baseUrl + 'problem/getStatus'
				// true 1第一次进入 false0未出去状态
                let params = {'userId':'1','isFirst':this.isfirst};
                this.$http.post(url,params,{emulateJSON:true}).then((res)=>
                {
                    console.log(res)
					if (res.body.success == true){
//						this.cananswer = res.body.data.can_answer
//						this.canaward = res.body.data.can_award
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
		background-color: #01b6af;
		position: absolute;
	}
	.mainlogologoDiv{
		margin-left: 8%;
		margin-top: 8%;
		width: 85px;
		height: 8%;
	}
	.mainTitileDiv{
		margin-left: 15%;
		margin-top: 8%;
		width: 70%;
	}
	.mainsmallPeople{
		position: fixed;
		bottom: 21%;
		right: 11vw;
		width: 36vw;
		z-index: 5;
	}
	.mainbottomBg{
		z-index: 4;
		width: 100%;
		height: 75%;
		background-image: url("https://resources.xycoder.com/kobelco/images/bg_1.png");
		background-size:100% 100%;
		position: fixed;
		bottom: 0px;
	}
	.maintextClass{
		margin-left: 15%;
		width: 70%;
		line-height: 32px;
		font-size: 0.9rem;
	}
	.btnbgClass{
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 21%;
	}
	.startbtnClass{
		/*font-family: '兰亭中黑';*/
		position: fixed;
		margin-left: 20%;
		width: 60%;
		height: 7vh;
		line-height: 7vh;
		bottom: calc((21% - 14vh) / 3 * 2 + 7vh);
		background-image: url("https://resources.xycoder.com/kobelco/images/button1.png");
		background-size:100% 100%;
		text-align: center;
		border-radius: 10px;
		font-size: 15px;
		color: white;
		border: none;
		background-color: transparent;
	}
	.awrrdbtnClass{
		position: fixed;
		margin-left: 20%;
		width: 60%;
		height: 7vh;
		line-height: 7vh;
		bottom: calc((21% - 14vh) / 3);
		background-image: url("https://resources.xycoder.com/kobelco/images/button2.png");
		background-size:100% 100%;
		text-align: center;
		border-radius: 10px;
		font-size: 15px;
		color: white;
		border: none;
		background-color: transparent;
	}
	.awrrdbtnClassFirst{
		margin-left: 20%;
		width: 60%;
		height: 50px;
		background-image: url("https://resources.xycoder.com/kobelco/images/button2.png");
		background-size:100% 100%;
		background-color: lightgray;
		line-height: 50px;
		text-align: center;
		margin-bottom: 10px;
		border-radius: 10px;
		font-size: 15px;
		color: white;
		border: none;
		background-color: transparent;
	}
</style>