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

import Vue from 'vue';
export default new Vue;


