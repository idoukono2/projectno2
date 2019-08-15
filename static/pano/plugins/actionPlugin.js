var krpanoplugin = function(){
	// import store from '@/store/index.js';

	var local = this;   
 
    var krpano = null;  
    var plugin = null;
    var stylenameiscontain = false;//热点名称是否包含

    var offset = 0;

    local.unloadplugin = function(){
        plugin = null;
        krpano = null;
    }

	local.registerplugin = function(krpanointerface, pluginpath, pluginobject){
		krpano = krpanointerface;
        plugin = pluginobject;

        plugin.init = init;
		plugin.stylenamecontain = stylenamecontain;
        plugin.littleplanetended = littleplanetended;
        plugin.setoffset = setoffset;
        plugin.logohotspotclick = logohotspotclick;
        
        plugin.registerattribute("value", stylenameiscontain, value_setter, value_getter);
        plugin.registerattribute("offset",offset,offset_setter,offset_getter);
        // plugin.registerattribute("onloadnumok", "");

	};

	function init(){
		// console.log("动作插件初始化成功");
	};




	function offset_setter(newvalue){
		// console.log("拿到了值："+newvalue);
        if (newvalue != offset){
            offset = newvalue;
        }
    }

    function offset_getter(){
        return getlength(0,0,offset);
    }

    function setoffset(text){
    	if (text && text.length >0) {

    		offset_setter(text);	
    	}
    }

    function getlength (fontSize,fontFamily,text) {
      return text.length *10.5;
  	};



	function value_setter(newvalue){
   		if (newvalue != stylenameiscontain){
            stylenameiscontain = newvalue;
        }
    }

    function value_getter(){
        return stylenameiscontain;
    }

	function stylenamecontain(style,standard){
		var result = style.indexOf(standard);
		if (result != -1) {
			value_setter(true);
		}else{
			value_setter(false);
		}
	}

    //点击logo
    function logohotspotclick(){
        // console.log('插件接收到了点击事件');
        typeof window.emb.logohotspotclick == 'function'&& window.emb.logohotspotclick(1);
    }

	function littleplanetended(){
		// console.log("小行星效果结束");
		typeof window.emb.littleplanetended == 'function'&& window.emb.littleplanetended(true);
	};
};


