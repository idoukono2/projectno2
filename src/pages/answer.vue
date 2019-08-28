<template>
	<div >
		<div class="answerbgview">
			<div>
				<img class="answerlogologoDiv" src="https://resources.xycoder.com/kobelco/images/logo.png"/>
			</div>
			<div>
				<img class="answerTitileDiv" src="https://resources.xycoder.com/kobelco/images/title.png"/>
			</div>

			<div class="answerNum">{{ dataModel.problem_id }}</div>
			<div class="ansbottomBg">
				<div class="anstextClass">{{dataModel.problem_content}}</div>
				<button @click="chooseAnswer(0)" :class="{'answerbtnClass0':!selectStatus0,'selectbtnClass': selectStatus0}">{{answerArray[0].answer_content}}</button>
				<button @click="chooseAnswer(1)" :class="{'answerbtnClass1':!selectStatus1,'selectbtnClass': selectStatus1}">{{answerArray[1].answer_content}}</button>
				<button @click="chooseAnswer(2)" :class="{'answerbtnClass2':!selectStatus2,'selectbtnClass': selectStatus2}">{{answerArray[2].answer_content}}</button>


				<div class="answerbtnbgClass">
					<button class="startbtnClass" @click="submitAnswer">提交</button>
				</div>
			</div>
		</div>
		<!--<XYAlertView :item ="item1" v-if="answerResultstate"></XYAlertView>-->
		<!--<XYAlertView :item ="item" v-else></XYAlertView>-->

		<div class="alertcovers" v-if="answerResultstate">
			<div class="alertimagesbg">
				<img class="alertimages" :src = "itemImage">
				<div class="smallBtnBgview">
				<div class="backsmallBtns" @click="backtoMian">返回</div>
				<div class="nextsmallBtns" @click="nextStep">下一步</div>
				</div>
			</div>
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
                itemImage:'https://resources.xycoder.com/kobelco/images/success.png',
            }
		},
        mounted(){
            console.log("到答题页")
            store.state.isFirstlaunch = false
            console.log("是否首次")
            console.log(store.state.isFirstlaunch)
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
					this.selectStatus0 = true
					this.selectStatus1 = false
					this.selectStatus2 = false
				} else if (index == 1) {
					this.selectStatus0 = false
					this.selectStatus1 = true
					this.selectStatus2 = false
				} else {
					this.selectStatus0 = false
					this.selectStatus1 = false
					this.selectStatus2 = true
				}
				this.answerId = this.answerArray[index].answer_id
				console.log(this.answerId)
			},
            submitAnswer(){
            	if (this.answerId.length==0){
            		alert("请选择答案再提交")
					return
				}
                var goontimestamp = (new Date()).getTime()
                console.log(goontimestamp)

				let url = store.state.baseUrl + 'problem/uploadAnswer'
				console.log(url)
				let params = {'userId':localStorage.getItem('user_id'),'problemId':this.dataModel.problem_id,'answerId':this.answerId,'startTime':this.comeontimestamp,'endTime':goontimestamp};
                console.log(params)
				this.$http.post(url,params,{emulateJSON:true}).then((res)=>
				{
					console.log(res)
					if (res.body.success == true) {
						this.answerResultstate = true
						if (this.dataModel.problem_id == '4'){
							this.itemImage = 'https://resources.xycoder.com/kobelco/images/success_g2.png'
						} else {
							this.itemImage = 'https://resources.xycoder.com/kobelco/images/bingo_g2.png'
						}
						console.log("答对")
						this.answerResult = true
					} else {
						this.answerResultstate = true
						this.answerResult = false
						this.itemImage = 'https://resources.xycoder.com/kobelco/images/fail_g2.png'
						console.log("答错")
					}
					this.selectStatus0 = false
					this.selectStatus1 = false
					this.selectStatus2 = false
					this.answerId = ''
				},(err)=>
				{
					console.log("提交题失败:"+err);
					this.selectStatus0 = false
					this.selectStatus1 = false
					this.selectStatus2 = false
					this.answerId = ''
				});
			},
            getquestiondata(index){
                let url = store.state.baseUrl + 'problem/getProblemByIndex'
                console.log(url)
                let params = {'userId':localStorage.getItem('user_id'),'problemIndex':index};
                this.$http.post(url,params,{emulateJSON:true}).then((res)=>
                {
                    console.log(res)
					if (res.body.success == true) {
						this.dataModel = res.body.data.problemItem
					this.answerArray = this.dataModel.problem_answer
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

				if (this.answerResult == false){
                    this.getquestiondata(1)
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
	@font-face{
		font-family: fzlthtFont;
    	src: url('../assets/style/FZLTHJW.ttf');
	}
	.answerbgview{
		width: 100%;
		height: 100%;
		background-color: #01b6af;
		position: absolute;
	}
	.answerlogologoDiv{
		margin-left: 8%;
		margin-top: 8%;
		width: 85px;
		height: 8%;
	}
	.answerTitileDiv{
		margin-left: 15%;
		margin-top: 8%;
		width: 70%;
	}
	.answerNum{
		font-family: "fzlthtFont";
		position: fixed;
		bottom: calc(75% - 6.5vw);
		left: 14vw;
		width: 13vw;
		height: 13vw;
		line-height: 13vw;
		background-color: red;
		text-align: center;
		border-radius: 6.5vw;
		z-index: 5;
		background-image: url("https://resources.xycoder.com/kobelco/images/round.png");
		background-size:100% 100%;
		color: white;
		font-size: 1.2em;
		text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		*filter: Glow(color=#000, strength=1);
	}
	.ansbottomBg{
		width: 100%;
		height: 75%;
		background-image: url("https://resources.xycoder.com/kobelco/images/bg_1.png");
		background-size:100% 100%;
		position: fixed;
		bottom: 0px;
	}
	.anstextClass{
		font-family: "fzlthtFont";
		margin-left: 13%;
		margin-top: 8%;
		margin-bottom: 6%;
		width: 74%;
		line-height: 6vh;
		font-size: 0.9rem;
		text-align: center;
		font-size: 1rem;
	}
	.answerbtnClass0{
		font-family: "fzlthtFont";
		margin-left: 13%;
		width: 74%;
		height: 8vh;
		line-height: 8vh;
		text-align: left;
		color: white;
		padding-left: 20px;
		background-color: transparent;
		border: none;
		background-image: url("https://resources.xycoder.com/kobelco/images/option1.png");
		background-size:100% 100%;
		margin-bottom: 10px;
		border-radius: 10px;
		font-size: 14px;
		
	}
	.answerbtnClass1{
		font-family: "fzlthtFont";
		margin-left: 13%;
		width: 74%;
		height: 8vh;
		text-align: left;
		color: white;
		padding-left: 20px;
		background-color: transparent;
		border: none;
		background-image: url("https://resources.xycoder.com/kobelco/images/option2.png");
		background-size:100% 100%;
		line-height: 8vh;
		margin-bottom: 10px;
		border-radius: 10px;
		font-size: 14px;
	}
	.answerbtnClass2{
		font-family: "fzlthtFont";
		margin-left: 13%;
		width: 74%;
		height: 8vh;
		text-align: left;
		color: white;
		padding-left: 20px;
		background-color: transparent;
		border: none;
		background-image: url("https://resources.xycoder.com/kobelco/images/option3.png");
		background-size:100% 100%;
		line-height: 8vh;
		margin-bottom: 10px;
		border-radius: 10px;
		font-size: 14px;
	}
	.selectbtnClass{
		font-family: "fzlthtFont";
		margin-left: 13%;
		width: 74%;
		height: 8vh;
		text-align: left;
		color: white;
		padding-left: 20px;
		background-color: darkgray;
		border: none;
		line-height: 8vh;
		margin-bottom: 10px;
		border-radius: 10px;
		font-size: 14px;
		text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		*filter: Glow(color=#000, strength=1);
	}
	.answerbtnbgClass{
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 21%;
	}
	.startbtnClass{
		font-family: "fzlthtFont";
		position: fixed;
		margin-left: 20%;
		width: 60%;
		height: 8vh;
		line-height: 8vh;
		bottom: calc((21% - 8vh) / 2);
		background-image: url("https://resources.xycoder.com/kobelco/images/button1.png");
		background-size:100% 100%;
		text-align: center;
		border-radius: 10px;
		font-size: 1.1em;
		color: white;
		border: none;
		background-color: transparent;
		text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		*filter: Glow(color=#000, strength=1);
	}
	.alertimagesbg{
		/*background-color: lightgray;*/
		margin: 0px;
		padding: 0px;
		position: relative;
		width: 110%;
		left: -5%;
		top:25%;
		text-align: center;
	}
	.alertimages{
		/*background-color: red;*/
		margin: auto;
		padding: 0px;
		position: relative;
		width: 100%;
		top:25%;
		transform:translate(0%,0%);
		text-align: center;
	}
	.smallBtnBgview{
		display: flex;
		position: absolute;
		/*top: 50%;*/
		bottom: 20px;
		left: 22%;
		/*background-color: rebeccapurple;*/
	}
	.backsmallBtns{
		font-family: "fzlthtFont";
		width: 26vw;
		height: 46px;
		background-color: transparent;
		line-height: 46px;
		background-image: url("https://resources.xycoder.com/kobelco/images/button1_small.png");
		background-size:100% 100%;
		border: none;
		text-align: center;
		color: white;
		margin-right: 20px;
		text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		*filter: Glow(color=#000, strength=1);
	}

	.nextsmallBtns{
		font-family: "fzlthtFont";
		width: 26vw;
		height: 46px;
		background-color: transparent;
		line-height: 46px;
		background-image: url("https://resources.xycoder.com/kobelco/images/button2_small.png");
		background-size:100% 100%;
		border: none;
		text-align: center;
		color: white;
		text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		*filter: Glow(color=#000, strength=1);
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