function detailResponse(data) {
	// body...
	var realdata = data.data;
	if (!realdata.success) {
		alert(realdata.message);
		return;
	}else{
		return realdata.data;
	}
}

function testname(argument){
	console.log("1234");
}

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}
function onBridgeReady() {
	WeixinJSBridge.call('hideOptionMenu');
}

if (typeof WeixinJSBridge == "undefined") {
	if (document.addEventListener) {
		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	} else if (document.attachEvent) {
		document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	}
  } else {
	onBridgeReady();
  }

import Vue from 'vue';
export default new Vue;


