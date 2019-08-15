var krpanoplugin = function(){
	// import store from '@/store/index.js';

	var local = this;   
 
    var krpano = null;  
    var plugin = null;
    var progress = 0;

	// console.log(5555,window)
    local.unloadplugin = function () {
        plugin = null;
        krpano = null;
    }

	local.registerplugin = function(krpanointerface, pluginpath, pluginobject){
		krpano = krpanointerface;
        plugin = pluginobject;

        plugin.init = init;

        plugin.progresschanged = progresschanged;

	}

	function init(){
		progress = 0;
		// console.log("插件初始化成功");
	}

	function progresschanged(progressG){
		progress = progressG;
		// console.log(3333,window.emb)
		typeof window.emb.changeCallback == 'function'&& window.emb.changeCallback(progress)
		// $store.state.loadingProgress = progressG;
		// console.log(99,progressG);

	}
}
