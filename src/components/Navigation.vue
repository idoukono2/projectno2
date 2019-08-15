<template>
	<div class="person-nav">
		<music-player :musicstatus='musicStatus'></music-player>
		<div id="logo" >
			<a @click = userClick>
				<img id="logo_img" v-bind:src="image" alt="">
				<!-- <span id="logo_title">{{title}}</span> -->
			</a>
		</div>
		<div :class="musicStatus?'sound':'silence'">
			<a @click = "musicBtnClick()">
				<img id="sound_img" :src=" musicStatus?'https://resources.xycoder.com/vrdefault/images/musicG.png':'https://resources.xycoder.com/vrdefault/images/music_closeG.png'">
			</a>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import musicPlayer from '@/components/MusicPlayer';
	import store from '@/store/index.js';

	Vue.component('music-player',musicPlayer);

	export default {
		name:"Navigation",
		data(){
			return {
				musicStatus:true,
				image:"https://resources.xycoder.com/vrdefault/images/phoneG.png",
				title:"得可vr",
			}
		},
		mounted(){
			window.addEventListener('scroll',this.handleScroll);
			this.musicStatus = true;
		},
		methods:{
			userClick(u){
				console.log('点击了头部');
				window.location.href = 'tel://'+store.state.projectUserPhone;
			},

			musicBtnClick(){
				console.log('点击了音乐');
				//改变按钮状态
				this.musicStatus = !this.musicStatus;
			},
			handleScroll(){
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				var offsetTop = document.querySelector('.person-nav').offsetTop;
				// document.querySelector('person-nav').style.top = '0px';
			},
			destroyed () {//离开该页面需要移除这个监听的事件
			  window.removeEventListener('scroll', this.handleScroll)
			},
		}

}
</script>


<style scoped>
	.person-nav {
		z-index: 5;
		position: fixed;
		/*background-color: rgba(0,0,0,0.4);*/
		width: 100%;
		margin:0px;
		top: 0px;
		padding-top: 0px; 
		height: 50px;
	}
	#logo{
		line-height: 35px;
		position: absolute;
		display: inline;
		margin:0px;
		height: 100%;
		top: 8.5px;
		left: 15px;
		bottom: 0px;
		right: 0px;
		padding-left: 0px;
	}


	#logo #logo_img{
		/*background-color: #eeeeee;*/
		float: left;
		margin: 0px;
		margin-top: 1px;
		padding: 0px;
		height: 35px;
		width: 35px;
		/*border-style:solid;
		border-width: 1px;
		border-color: #eeeeee;
		border-radius: 16.5px;*/
	}
	#logo #logo_title{
		margin-left: 10px;
		height: 100%;
	}

	.sound{
		right: 15px;
		top: 8.5px;
		height: 35px;
		width: 35px;
		display: inline;
		float: right;
		position: relative;

		/*-webkit-animation: spin 3s linear infinite;*/
        animation: spin 3s linear infinite;

	}

	.silence{
		right: 15px;
		top: 8.5px;
		height: 35px;
		width: 35px;
		display: inline;
		float: right;
		position: relative;
	}

	/*@-webkit-keyframes spin {
        0%   {
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(-360deg);
            -ms-transform: rotate(-360deg);
            transform: rotate(-360deg);
        }
    }*/
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


	.sound #sound_img{
		height: 35px;
		width: 35px;
	}

	.silence #sound_img{
		height: 35px;
		width: 35px;
	}

	/*抖动*/
	  /*活动摇摆动画*/
@-webkit-keyframes swing {
  10% {
    transform: rotate(15deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  30% {
    transform: rotate(5deg);
  }
  40% {
    transform: rotate(-5deg);
  }
  50%,100% {
    transform: rotate(0deg);
  }
}
@-moz-keyframes swing {
  10% {
    transform: rotate(15deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  30% {
    transform: rotate(5deg);
  }
  40% {
    transform: rotate(-5deg);
  }
  50%,100% {
    transform: rotate(0deg);
  }
}
@-o-keyframes swing {
  10% {
    transform: rotate(15deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  30% {
    transform: rotate(5deg);
  }
  40% {
    transform: rotate(-5deg);
  }
  50%,100% {
    transform: rotate(0deg);
  }
}
@keyframes swing {
  10% {
    transform: rotate(15deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  30% {
    transform: rotate(5deg);
  }
  40% {
    transform: rotate(-5deg);
  }
  50%,100% {
    transform: rotate(0deg);
  }
}

#logo img {
  -webkit-transform-origin: bottom center;
  -moz-transform-origin: bottom center;
  -o-transform-origin: bottom center;
  transform-origin: bottom center;
  animation: swing 6s .15s linear infinite;
  -moz-animation: swing 6s .15s linear infinite; /* Firefox */
  -webkit-animation: swing 6s .15s linear infinite; /* Safari and Chrome */
  -o-animation: swing 6s .15s linear infinite; /* Opera */
  width:100%;
  height:100%;
}

</style>