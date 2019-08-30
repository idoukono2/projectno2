<template>
	<div class="bgview">
		<!-- <delaybtn :title="test1" :bgimage="test"></delaybtn> -->
		<div>
			<img class="mainlogologoDiv" src="https://resources.xycoder.com/kobelco/images/logo.png"/>
		</div>
		<div>
			<img class="mainTitileDiv" src="https://resources.xycoder.com/kobelco/images/title_g3.png"/>
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
	import delaybtn from '@/components/DelayBtn'
	import store from '@/store/index.js';
	import encrypt from '@/js/encrypt.js';
	Vue.component("toolitem",toolitem);
	Vue.component("delaybtn",delaybtn);
	(function(){
		window.alert = function(name){
		var iframe = document.createElement("IFRAME");
		iframe.style.display="none";
		iframe.setAttribute("src", 'data:text/plain');
		document.documentElement.appendChild(iframe);
		window.frames[0].window.alert(name);
		iframe.parentNode.removeChild(iframe);
		}
		})();
	export default{
		name:"toolBar",
		data(){
			return{
			    isfirst:true,
				cananswer:true,
				canaward:false,
				had_award:'',
				test1:'test',
				test:'https://resources.xycoder.com/kobelco/images/button1.png'
			}
		},
		mounted(){
            document.body.addEventListener('touchmove', function(e){
                e.preventDefault();
                e.stopPropagation();
            }, { passive: false });

			var _self = this;
            console.log("到首页")
            this.isfirst = this.getisFirstlaunch() ? 1 : 0
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
					alert('您已经参加过活动，机会已用完')

				}
			},
			getAward(){
				// localStorage.removeItem('user_id');
				if (this.canaward == false){
					if (this.had_award == true){
						alert('您已经领取过奖品，每人限领取一次！')
					} else {
						alert('您还未答题，答题成功即可兑奖！')
					}

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
                let params = {'userId':localStorage.getItem('user_id'),'isFirst':this.isfirst};
                this.$http.post(url,params,{emulateJSON:true}).then((res)=>
                {
                    console.log(res)
					if (res.body.success == true){
						this.cananswer = res.body.data.can_answer
						this.canaward = res.body.data.can_award
						this.had_award = res.body.data.had_award
						console.log("看赋值")
						console.log(this.cananswer)
						console.log(this.canaward)

						// this.$options.methods.getSignInfo.bind(this)();
						this.getSignInfo();
					}
				},(err)=>
                {
                    console.log("获取首失败:"+err);
				});
			},
			getSignInfo:function(){
				if (encrypt.platform() == 'wechat') {
					// alert(encodeURIComponent(window.location.href.split('#')[0]));
				//获取分享信息
			        let url = store.state.baseUrl + 'author2/getSignInfo';
			        let params ={
			        	'user_id':localStorage.getItem('user_id'),
			        	'project_id':localStorage.getItem('project_id'),
			        	'url':encodeURIComponent(window.location.href.split('#')[0]),
			        	// 'project_id':localStorage.getItem('project_id'),
			    	}
					console.log(params)
			    	this.$http.post(url,params,{emulateJSON:true}).then((res)=>
		    		{	
		    			var realdata = res.data;
		    			if (realdata.success) {
		    				console.log(realdata.data);
		    				encrypt.shareSdk(realdata.data.appId,realdata.data.timestamp,realdata.data.nonceStr,realdata.data.signature,realdata.data.url);
		    			}else{
		    				// alert("获取分享信息接口失败:" + realdata.message);
		    				console.log("获取分享信息接口失败:" + realdata.message);
		    			}
		    		},(err)=>
		    		{
		    			console.log("获取分享信息网络失败:"+err);
		    			// alert("获取分享信息网络失败:"+err);
		    		});
				}
			}
		}
	}

</script>

<style type="text/css" scoped>
	/* @import './style/index.css'; */
	@font-face{
		font-family: fzlthtFont;
    	src: url('../assets/style/FZLTHJW.ttf');
	}
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
		bottom: 20%;
		right: 11vw;
		width: calc(14vw + 11.5vh);
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
		font-family: 'fzlthtFont','Source Han Sans CN','SimHei';
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
		font-family: 'fzlthtFont','Source Han Sans CN','SimHei';
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
		text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		*filter: Glow(color=#000, strength=1);
	}
	.awrrdbtnClass{
		font-family: 'fzlthtFont','Source Han Sans CN','SimHei';
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
		text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		*filter: Glow(color=#000, strength=1);
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