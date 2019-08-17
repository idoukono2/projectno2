const state = {
	// baseUrl:'https://www.xycoder.com/',
    baseUrl:'http://192.168.0.107:8080/',

	user:{
		'user_id':null,
		'user_name':null,
		'user_nickname':null,
		'user_phone':null,
		'user_sex':null,
		'wx_openId':null,
	},

	krpano:null,

	projectId:null,
	projectName:null,
	projectUserPhone:null,

	tabbarIndex:0,


	hostspotClass:null,
	projectXml:'<scene name="default" title="defaultTitle" onstart="" thumburl="" lat="39.563340" lng="19.904324" heading="0.0"><view hlookat="0" vlookat="0" maxpixelzoom="1.0" fovmax="150" limitview="auto" /><preview url="https://resources.xycoder.com/panos/images/1/preview.jpg" /></scene>',

	copyrightList:null,
	realisticView:null,
	shortname:null,

	panoViewIsComplete:false,
	panoPicResourceLoadComplete:false, //全景加载完成
	loadingProgress:0,
	coverSplash:true,
	navAndTabbarShow:false,
	stateAlert:false,//是否上线弹框

	// littleplanetComplete:false,//小行星

	bg_music:'',
	pageView:1,//浏览量
	favorite:0,//点赞数
	isLiked:false,//是否点赞过

	positionSelectIndex:0,

	//分享相关
	projectShareTitle:null,
	projectShareIcon:null,
	projectShareDetail:null,
	projectShareLinkurl:null,

	isFirstlaunch:false // 是否第一次进入，true是false否
}

export default state;