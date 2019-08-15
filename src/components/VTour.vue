<template>
	<div id="pano"></div>
</template>

<script type="text/javascript">
	import bus from '@/js/method';
	import store from '@/store/index.js';
	export default{
		name:"XYPanoView",
		data(){
			return{
				krpano:null,
				// autoRoam:store.state.autoRoam,
			}
		},
		computed: {
			autoRoam(){
				return store.state.autoRoam;
			},
			gyroscope(){
				return store.state.gyroscope;
			},
			projectXml(){
				return store.state.projectXml;
			}
		},
		watch:{
			gyroscope:{
				immediate:true,
			 	handler:function(e){
			 		// console.log("自动漫游");
			 		if (this.krpano) {
			 			this.krpano.call("switch(plugin[gyro].enabled)");
			 		}
			 	}
			},
			autoRoam:{
				immediate:true,
			 	handler:function(e){
			 		// console.log("自动漫游");
			 		if (this.krpano) {
			 			this.krpano.set("autorotate.enabled",this.autoRoam);
			 		}
			 	}
			},
			projectXml:{
				immediate:true,
			 	handler:function(e){
			 		var _self = this;
			 		// console.log(_self.krpano);
		 			if (e != null && _self.krpano != null) {
		 				// console.log("xml文件变化刷新全景");
						var xml = store.state.projectXml;
			  			_self.krpano.call("loadxml(" + xml + ");custom_loadscene(scene_01);skin_setup_littleplanetintro();");
						_self.krpano.set("autorotate.enabled",store.state.autoRoam);//自动巡游初始化
						_self.krpano.set("plugin[gyro].enabled",store.state.gyroscope);//陀螺仪初始化
		 			}
			 	}
			}
		},
		mounted(){
			var _self = this;
			var krpanoReady = function (krpano) {
				//打开krpano debug模式
				// krpano.call("showlog()");
				_self.krpano = krpano;
				store.state.krpano = krpano;
				var xml = store.state.projectXml;
	  			krpano.call("loadxml(" + xml + ");custom_loadscene(scene_01);");

				_self.krpano.set("plugin[gyro].enabled",store.state.gyroscope);//陀螺仪初始化
				_self.krpano.set("autorotate.enabled",store.state.autoRoam);//自动巡游初始化

				if (!store.state.panoViewIsComplete) {
				  		 _self.krpano.call("skin_setup_littleplanetintro();");
				  	}
			}

			var config = {swf:"./static/pano/pano.swf", xml:"./static/pano/pano.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true,onready:krpanoReady};
			var xml = store.state.projectXml;
			embedpano(config);
			store.state.panoViewIsComplete = true;
		}

	}
</script>

<style type="text/css">
	#pano{
		/*display: none;*/
		position: relative;
		z-index: 0;
		width: 100%;
		height: 100%;
		background-color: #ffffff;
	}
</style>