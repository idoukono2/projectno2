var krpanoplugin = function(){
	// import store from '@/store/index.js';

	var local = this;   
 
    var krpano = null;  
    var plugin = null;

    local.unloadplugin = function(){
        plugin = null;
        krpano = null;
    }

	local.registerplugin = function(krpanointerface, pluginpath, pluginobject){
		krpano = krpanointerface;
        plugin = pluginobject;

        plugin.init = init;
		plugin.hiddenAllHotspotExcept = hiddenAllHotspotExcept;
        plugin.littleplanetended = littleplanetended;
        // plugin.registerattribute("onloadnumok", "");

	};

	function init(){
		// progress = 0;
		// console.log(index);
		// console.log("动作插件初始化成功");
	};


	function hiddenAllHotspotExcept(typename){
		console.log(typename);
		// krpano.call("hiddenHotspot()");
	};

	function littleplanetended(){
		// console.log("小行星效果结束");
		typeof window.emb.littleplanetended == 'function'&& window.emb.littleplanetended(true);
	};
};

export default{
	test:function(){
		console.log("测试方法");
	}
}