<template>
	<div class="delaybtn">
		<button class="delaybtn_btn" @click="btnclick" :style="{'background-image':url(bgimage)}">{title}</button>
        <div class="delaybtn_shandow"></div>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:"delaybtn",
		data(){
			return{
                title:'',
                bgimage:''
			}
		},
		props:{
            title:String,
			bgimage:String,
		},
		watch:{
			title:{
				immediate:true,
				handler:function(e){
                    this.title = e
					// console.log('item:'+e.is_selected);
					// if (this.textcolor && this.textcolor != null) {
					// 	 $(".buttonlistitem_title").css("color","#"+e);
					// }
				}
			},
			bgimage:{
				immediate:true,
				handler:function(e){
                    this.bgimage = e
					// console.log('color:'+e);
					// $("#buttonlistitem_title").css("color","#"+e);
				}
			},
        },
        methods:{
            btnclick:function(){
                console.log('点解了按钮')
            }
        }
	}
</script>

<style type="text/css" scoped>
	.delaybtn_btn{
        font-family: 'fzlthtFont','Source Han Sans CN','SimHei';
		position: fixed;
		margin-left: 20%;
		width: 60%;
		height: 7vh;
		line-height: 7vh;
		bottom: calc((21% - 14vh) / 3 * 2 + 7vh);
		/* background-image: url("https://resources.xycoder.com/kobelco/images/button1.png"); */
		background-size:100% 100%;
		text-align: center;
		border-radius: 10px;
		font-size: 15px;
		color: white;
		border: none;
		background-color: transparent;
		text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-webkit-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		-moz-text-shadow:#000 1px 0 0,#000 0 1px 0,#000 -1px 0 0,#000 0 -1px 0;
		*filter: Glow(color=#000, strength=1);
    }
    .delaybtn_shandow{

    }
</style>