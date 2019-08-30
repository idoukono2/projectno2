import wx from 'weixin-js-sdk';
import store from '@/store/index.js'


export default{
	getQueryString:function(name) {
	  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	  var r = window.location.search.substr(1).match(reg);
	  if (r != null) {
	    return unescape(r[2]);
	  }
	  return null;
	},

	platform:function (){
	  var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
	        if (ua.match(/MicroMessenger/i) == "micromessenger") {
	                //在微信中打开
	          return 'wechat';
	        }
	        if (ua.match(/WeiBo/i) == "weibo") {
	                //在新浪微博客户端打开
	          return 'weibo';
	        }
	        if (ua.match(/QQ/i) == "qq") {
	                //在QQ空间打开
	          return 'qq';
	        }
	},
  hiddenButton:function(){
    wx.hideAllNonBaseMenuItem();
  },


	shareSdk:function(appId,timestamp,nonceStr,signature,url){
		    wx.config({
          debug: false,
          appId: appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
          timestamp:timestamp, // 必填，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature,// 必填，签名，见附录1
          //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
          jsApiList: [
            'updateAppMessageShareData','updateTimelineShareData'
          ]
        });


         //处理验证失败的信息
        wx.error(function (res) {
          // alert('验证失败返回的信息:'+res);
          console.log('验证失败返回的信息:'+res);
        });

        //处理验证成功的信息
        wx.ready(function () {
        //              alert(window.location.href.split('#')[0]);
          //分享到朋友圈
 //          projectShareTitle:null,
	// projectShareIcon:null,
	// projectShareDetail:null,
	// projectShareLinkurl:null,
    			var realUrl = url + '#/' +localStorage.getItem('project_id');
    			// alert(realUrl);
    			var realTitle = store.state.projectShareTitle;
    			var realdes = store.state.projectShareDetail;
    			var realIcon = store.state.projectShareIcon;
          //微信朋友/qq
              wx.updateAppMessageShareData({
                title: realTitle, // 分享标题
                desc:realdes,
                link: realUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: realIcon, // 分享图标
                success: function (res) {
                  // 用户确认分享后执行的回调函数
                  console.log("分享朋友/qq成功");
                },
                cancel: function (res) {
                  // 用户取消分享后执行的回调函数
                  console.log("取消分享到朋友/qq返回的信息为:"+ res);
                },
                // trigger:function(res){
                //   console.log(res);
                //   alert(res);
                // }
              });
              //分享给朋友圈、qq空间
              wx.updateTimelineShareData({
                title: realTitle, // 分享标题
                link: realUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: realIcon, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function (res) {
                  // 用户确认分享后执行的回调函数
                  console.log("分享给朋友圈/qq空间成功返回的信息为:"+res);
                },
                cancel: function (res) {
                  // 用户取消分享后执行的回调函数
                  console.log("取消分享给朋友圈/qq空间返回的信息为:"+res);
                }
              });
        });
	},

  hiddenAllHotspotExcept:function(classname1,classname2){
    var krpano = store.state.krpano;
    var hotspots = (classname2 && classname2 != null && classname2.length >0)?(classname1+","+classname2):classname1;
    if (krpano && krpano != null) {
      krpano.call("hiddenHotspot("+hotspots+")");
    }
    // console.log("获取到需要显示的热点类型"+hotspots);
  }
}

