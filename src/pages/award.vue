<template>
	<div >
		<div>领奖页</div>
        <div @click="itemClick()">去首页</div>
		<div @click="alertShow()">去领奖</div>

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
                ths.$router.push({path:"/main"});
            },
			getaward(){
				let url = store.state.baseUrl + 'problem/getAward'
				console.log(url)
				let params = {'userId':'1','isFirst':'0'};
				this.$http.post(url,params,{emulateJSON:true}).then((res)=>
				{
					console.log(res)
					if (res.body.success == true) {
						console.log("领奖成功")
						this.$router.push({path:"/main"});
					}else {
						alert(res.body.message)
					}
				},(err)=>
				{
					console.log("兑奖失败:"+err);
				});
			},
			alertShow(){
				var a=confirm("兑奖按钮需要由工作人员当面操作，用户个人操作无效！");
				if(a){
					console.log("继续下一题");
					this.getaward()
				}
				else{
					this.$router.push({path:"/main"});
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