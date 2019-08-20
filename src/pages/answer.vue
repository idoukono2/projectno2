<template>
	<div >
		<div class="answerbgview">
			<img style="width: 100%;" src="https://xingyb.oss-cn-hangzhou.aliyuncs.com/iosApp/headerbg.png"/>
			<div style="width: 100%;height: 75%;background-color: deepskyblue;position: fixed;bottom: 0px;">
				<div class="answertitleClass">{{dataModel.problem_content}}</div>
				<!--<div style="position: fixed;bottom: 110px;display: inherit;width: 100%;">-->
					<button @click="chooseAnswer(0)" :class="{'answerbtnClass0':!selectStatus0,'selectbtnClass': selectStatus0}">{{answerArray[0].answer_content}}</button>
					<button @click="chooseAnswer(1)" :class="{'answerbtnClass1':!selectStatus1,'selectbtnClass': selectStatus1}">{{answerArray[1].answer_content}}</button>
					<button @click="chooseAnswer(2)" :class="{'answerbtnClass2':!selectStatus2,'selectbtnClass': selectStatus2}">{{answerArray[2].answer_content}}</button>

				<!--</div>-->
				<!--<div style="position: fixed;bottom: 25px;display: inherit;width: 100%;height: 45px;">-->
					<button class="submitbtnClass" @click="submitAnswer">提交</button>
				<!--</div>-->
			</div>
		</div>
		<!--<XYAlertView :item ="item1" v-if="answerResultstate"></XYAlertView>-->
		<!--<XYAlertView :item ="item" v-else></XYAlertView>-->
		<div class="alertcovers" v-if="answerResultstate">
			<img id="alertimages" :src = "itemImage">
			<div style="width: 100px;height: 45px;background-color: rebeccapurple;" @click="backtoMian">返回</div>
			<div style="width: 100px;height: 45px;background-color: red;" @click="nextStep">下一步</div>

		</div>
	</div>
</template>

<script type="text/javascript">
	import Vue from "vue";

	import store from '@/store/index.js';

	export default{
		name:"answer",
		data(){
			return{
                answerResultstate:false,
				answerResult:true,
				dataModel:{},
                answerArray:[],
				selectStatus0:false,
				selectStatus1:false,
				selectStatus2:false,
				questionId:'',
                answerId:'',
                comeontimestamp:'',
                itemImage:'https://resources.xycoder.com/vrdefault/images/status.png',
            }
		},
        mounted(){
            console.log("到答题页")
			var comeontimestamp = (new Date()).getTime()
			this.comeontimestamp = comeontimestamp

			console.log(comeontimestamp)
			this.getquestiondata(1)
        },
		computed:{
		},

		methods:{
            chooseAnswer(index){
                console.log(index)
				if (index == 0){
					console.log("A")
					this.selectStatus0 = true
					this.selectStatus1 = false
					this.selectStatus2 = false
				} else if (index == 1) {
					console.log('B')
					this.selectStatus0 = false
					this.selectStatus1 = true
					this.selectStatus2 = false
				} else {
					console.log('C')
					this.selectStatus0 = false
					this.selectStatus1 = false
					this.selectStatus2 = true
				}
				this.answerId = this.answerArray[index].answer_id
				console.log(this.answerId)

			},
            submitAnswer(){
                var goontimestamp = (new Date()).getTime()
                console.log(goontimestamp)

				let url = store.state.baseUrl + 'problem/uploadAnswer'
				console.log(url)
				let params = {'userId':'1','problemId':this.dataModel.problem_id,'answerId':this.answerId,'startTime':this.comeontimestamp,'endTime':goontimestamp};
                console.log(params)
				this.$http.post(url,params,{emulateJSON:true}).then((res)=>
				{
					console.log(res)
					if (res.body.success == true) {
						this.answerResultstate = true
						this.itemImage = 'https://resources.xycoder.com/vrdefault/images/status.png'
						console.log("答对")
						this.answerResult = true
					} else {
						this.answerResultstate = true
						this.answerResult = false
						this.itemImage = 'https://xingyb.oss-cn-hangzhou.aliyuncs.com/iosApp/headerbg.png'
						console.log("答错")
					}
				},(err)=>
				{
					console.log("提交题失败:"+err);
				});
			},
            getquestiondata(index){
                let url = store.state.baseUrl + 'problem/getProblemByIndex'
                console.log(url)
                let params = {'userId':'1','problemIndex':index};
                this.$http.post(url,params,{emulateJSON:true}).then((res)=>
                {
                    console.log(res)
					if (res.body.success == true) {
						this.dataModel = res.body.data.problemItem
					this.answerArray = this.dataModel.problem_answer
                    console.log("数据源")
                    console.log(this.dataModel)
					}
                },(err)=>
                {
                    console.log("获取题失败:"+err);
                });
            },
			backtoMian(){
				this.$router.push({path:"/main"});
			},
			nextStep(){
				console.log("下一步")
				this.answerResultstate = false

				this.selectStatus0 = false
				this.selectStatus1 = false
				this.selectStatus2 = false

				if (this.answerResult == false){
					return
				}
				if (this.dataModel.problem_id == '4'){
					this.$router.push({path:"/award"});
					return
				}
				var index = parseInt(this.dataModel.problem_id) + 1
				this.getquestiondata(index)
			},
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
	.answertitleClass{
		margin-left: 20%;
		width: 60%;
		/*height: 90px;*/
		background-color: red;
		text-align: center;
		font-size: 14px;
		align-items: center;
		line-height: 30px;
		margin-bottom: 40px;
	}
	.answerbtnClass0{
		margin-left: 15%;
		width: 70%;
		height: 45px;
		background-color: #ff7b51;
		line-height: 45px;
		text-align: center;
		margin-bottom: 15px;
		border-radius: 10px;
		font-size: 14px;
	}
	.answerbtnClass1{
		margin-left: 15%;
		width: 70%;
		height: 45px;
		background-color: #48d2dd;
		line-height: 45px;
		text-align: center;
		margin-bottom: 15px;
		border-radius: 10px;
		font-size: 14px;
	}
	.answerbtnClass2{
		margin-left: 15%;
		width: 70%;
		height: 45px;
		background-color: #6f8eff;
		line-height: 45px;
		text-align: center;
		margin-bottom: 15px;
		border-radius: 10px;
		font-size: 14px;
	}
	.selectbtnClass{
		margin-left: 15%;
		width: 70%;
		height: 45px;
		background-color: gray;
		line-height: 45px;
		text-align: center;
		margin-bottom: 15px;
		border-radius: 10px;
		font-size: 14px;
	}
	.submitbtnClass{
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

	#alertimages{
		margin: 0px;
		padding: 0px;
		width: 60%;
		top:50%;
		left:50%;
		border-radius: 20px;
		position: absolute;
		transform:translate(-50%,-50%);
		text-align: center;
	}
	.alertcovers{
		position: absolute;
		z-index: 8;
		opacity: 1;
		width: 100%;
		height: 100%;
		padding: 0px;
		margin:0px;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		background: rgba(0,0,0,0.5)
	}
</style>