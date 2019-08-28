<template>
	<div class="authorpage">
		<span>微信登录中。。。</span>
	</div>
</template>

<script type="text/javascript">
	import store from '@/store/index.js';
	import encrypt from '@/js/encrypt.js'
	export default{
		name:'author',
		data(){
			return{

			}
		},
		mounted(){
			let _self = this;

			var wx_code = encrypt.getQueryString('code');
			if (wx_code) {//调起成功返回了code
				// alert(wx_code);
				this.getUserInfoWithCode(wx_code);
			}else{//第一次认证或者认证失败
				this.AuthorUrl();
			}
		},
		computed:{

		},
		methods:{
			  getUserInfoWithCode:function(code){
			  	let ths = this;
				  let url = store.state.baseUrl + 'author2/getUserInfoIdByCode';
				  let params = {'code':code};
					console.log(code);
					// alert(code);
				  this.$http.post(url,params,{emulateJSON:true}).then((res)=>
				    {
				      var realdata = res.data;
				      if (!realdata.success) {
				        alert('获取用户信息失败,原因是:'+realdata.message);
				      }else{
				        // alert(res);
				        // alert('获取项目信息成功');
				        store.state.user = realdata.data;
				        // console.log(realdata);
				        localStorage.setItem('user_id',store.state.user.user_id);
				        ths.$router.push({path:"/main"});
				        // window.location.href = realdata.data.authorize_url;

				     }
			    },(err)=>
				    {
				      console.log(err);
							// alert('获取用户信息失败，'+err.body);
							// alert('获取用户信息失败，'+err.status);
				    });
				},

			  AuthorUrl:function(){
				  let url = store.state.baseUrl + 'author2/getAuthorUrl';
				  let params = {'project_id':localStorage.getItem('project_id')};
				  this.$http.post(url,params,{emulateJSON:true}).then((res)=>
				  {
				    var realdata = res.data;
				    if (!realdata.success) {
				      alert('获取url失败:'+realdata.message);
				    }else{
				    	// alert(realdata.data.authorize_url);
				      // console.log(realdata['authorize_url']);
				      window.location.href = realdata.data.authorize_url;
				    }
				  },(err)=>
				  {
				    console.log(err);
				    alert('获取授权地址失败，'+err.body);
				  });
				}
		}

	}
</script>

<style type="text/css" scoped>
	.authorpage{
		width: 100%;
		height:100%;
		padding:0px;
		margin: 0px;
		z-index: 8;
		/*background-color: #000000;*/
	}
	
</style>