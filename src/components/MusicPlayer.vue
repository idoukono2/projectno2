<template>
	<div class="music-player" style="display: none;">
		<audio id="music"
	       controls="controls"
	       preload="auto"
	       loop
	       autoplay="autoplay"
	       :src="bg_music">
		</audio>
	</div>
</template>

<script type="text/javascript">
	import store from '@/store/index.js';

	export default{
		name:"xy-music-player",
		data(){
			return{
				isReady:false,
				audioElement:null,
			}
		},
		computed:{
			bg_music(){
				return store.state.bg_music;
			}
		},
		mounted(){
			this.isReady = true;
		    	// var audio = document.getElementById('music'); 
		    	// this.audioElement = audio;
		    	// // console.log(this.audioElement); 
		    	// if (this.musicstatus) {
		    	// 	// audio.play();
		    	// }
		},
		props:{
			musicstatus:{
				type:Boolean,
			}
		},
		watch:{
			bg_music:{
				immediate:true,
				handler:function(e){
					if (e == '') {return;}
					// console.log(e);
					var audio = document.getElementById('music'); 
					// console.log(audio);
					if (e != null) {
						audio.play();
						document.addEventListener("WeixinJSBridgeReady", function () {

						       audio.play();
						}, false);
					}
				}
			},
			musicstatus:{
				immediate:true,
				handler:function(e){
					if (this.isReady) {
						var audio = document.getElementById('music'); 
						// console.log(audio);
						if (e) {
							audio.play();
							document.addEventListener("WeixinJSBridgeReady", function () {
						       audio.play();
							}, false);
						}else{
							audio.pause()
						}
						// !e?audio.pause():audio.play();
					}
				}
			}
		}
	}
</script>

<style type="text/css"></style>