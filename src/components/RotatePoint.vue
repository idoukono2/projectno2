<template>
	<div class="rotatePoint" v-bind:style="cssData">
			<img id="rotate_img" v-bind:style="imageCss" :src="item.positionpoint_bg_image">
			<span>{{item.positionpoint_text}}</span>
		</div>
</template>

<script type="text/javascript">
	import Vue from "vue";
	import store from '@/store/index.js';

	export default{
		name:"rotatePoint",
		data(){
			return{
				cssData:{
					width:this.item.positionpoint_radius*2 +'px',
					height:this.item.positionpoint_radius*2 +'px',
					left:(this.item.positionpoint_centerX + "%") - (this.item.positionpoint_radius + 'px'),
					top:(this.item.positionpoint_centerY + "%") - (this.item.positionpoint_radius + 'px'),
					position: "absolute",

				},
				imageCss:{
					height: "100%",
					width: "100%",
					display: "inline",
					position: "relative",
			        animation: "spin 3s linear infinite",
				}
			}
		},
		computed:{
		},
		props:{
			item:Object
		},
		watch:{
			item:{
				immediate:true,
				handler:function(e){
					//计算left top
					var centerX = e.positionpoint_centerX + "%";
					var centerY = e.positionpoint_centerY + "%";
					var radius = e.positionpoint_radius + "px";
					this.cssData.left = "calc(" + centerX  + " - " + radius + ")";
					this.cssData.top = "calc(" + centerY  + " - " + radius + ")";

					var scend = parseInt(Math.random()*2,10)+2;
					this.imageCss.animation = "spin "+  scend +"s linear 0s infinite normal none running";
					// console.log(this.imageCss.animation);
				}
			}
		},
		mounted(){
			// console.log(store.state.positionSelectIndex);
		},
		methods:{
			
		}
	}

</script>

<style type="text/css" >
	.rotatePoint{
		width:80px;
		height: 80px;
		left: 100px;
		top: 100px;
		position: absolute;
		/*left: calc(item.centerX - item.radius/2) + 'px';
		right: : calc(item.centerY - item.radius/2) + 'px';
		width: calc(item.radius) +'px';
		height:calc(item.radius) +'px';*/
	}
	#rotate_img{
		height: 100%;
		width: 100%;
		display: inline;
		position: relative;

		/*-webkit-animation: spin 3s linear infinite;*/
        animation: spin 3s linear infinite;
	}

	.rotatePoint span{
		position: absolute;
	    top: 50%;
	    left: 50%;
	    width: 60%;
	    /*height:60%;*/
	    font-size: 10px;
	    transform:scale;
	    text-align: center;
	    word-break: break-word;
	    /* height: 100%; */
	    /* text-align: center; */
	    margin: 0 auto;
	    color: #ffffff;
	    transform: translate(-50%,-50%);
	}

	@keyframes spin {
        0%   {
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        25% {
            -webkit-transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            transform: rotate(90deg);
        }
        50% {
            -webkit-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            transform: rotate(180deg);
        }
        75% {
            -webkit-transform: rotate(270deg);
            -ms-transform: rotate(270deg);
            transform: rotate(270deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>