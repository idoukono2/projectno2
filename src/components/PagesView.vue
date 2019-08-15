<template>
	<div id="pagesView">
		<ul id="advantagelist" >
			<li id="advantage" v-for="(item,itemindex) in advantageList">
				<pagesViewitem :item="item"></pagesViewitem>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import pagesViewitem from '@/components/Pages-Item';
	import store from '@/store/index.js';
	// import '@/js/scroll.js';

	Vue.component('pagesViewitem',pagesViewitem);
	export default{
		name:'pagesView',
		data(){
			return {
				contentWidth:{
					width:'300%',
				},
				index:0,
			}
		},
		props:['advantageList'],
		methods:{
			scroll:function(e){
				// console.log(e);
				var toindex =  e + this.index;
				if (toindex >=0 && toindex <this.advantageList.length) {
					// console.log(toindex);
					 $('html, body').animate({
	                        scrollLeft: (toindex*$('#advantage').width()).toString() + "px"
	                    }, 500);
					 store.state.positionSelectIndex = toindex;
					 this.index = toindex;
				}

			},
			scrollTo:function(e){
				var toindex = e;
				// console.log("调用了滑动方法");
				if (toindex >=0 && toindex <this.advantageList.length) {
					$('html, body').animate({
	                        scrollLeft: (toindex*$('#advantage').width()).toString() + "px"
	                    }, 500);
					 this.index = toindex;
				}
			}
		},
		mounted(){


			var _self = this;

			// _self.scrollTo(store.state.positionSelectIndex); 

			var startX = 0;
			var startY = 0;
			var moveEndX = 0;
			var moveEndY = 0;
			$("#pagesView").on("touchstart", function(e) {
		　　　　e.preventDefault();
		　　　　startX = e.originalEvent.changedTouches[0].pageX;
		　　　　startY = e.originalEvent.changedTouches[0].pageY;
		　　});
		　　$("#pagesView").on("touchend", function(e) {
		　　　　e.preventDefault();
		　　　　moveEndX = e.originalEvent.changedTouches[0].pageX;
		　　　　moveEndY = e.originalEvent.changedTouches[0].pageY;
		　　　  var X = moveEndX - startX;
		　　　　var Y = moveEndY - startY;

		　　　　if ( X > 0 ) {
		// 　　　　　　alert("left 2 right");
					_self.scroll(-1);
		　　　　}
		　　　　else if ( X < 0 ) {
		// 　　　　　　alert("right 2 left");
			   	  _self.scroll(1);
		　　　　}
		　　　　else if ( Y > 0) {
		// 　　　　　　alert("top 2 bottom");
					console.log("top 2 bottom");
		　　　　}
		　　　　else if ( Y < 0 ) {
		// 　　　　　　alert("bottom 2 top");
					console.log("bottom 2 top");
		　　　　}
		　　　　else{
		// 　　　　　　alert("just touch");
					console.log("just touch");
		　　　　}
		　　　});
		},
		computed:{
			positionIndex(){
				return store.state.positionSelectIndex;
			},
		},
		watch:{
			positionIndex:{
				immediate:true,
			 	handler:function(e){
					var _self = this;
					_self.scrollTo(e);
			 	},
			 },
			advantageList:{
				immediate:true,
				handler:function(e){
				if (e.length >0) {
					var count = e.length *100;
					var width = count.toString() +"%";
					var height = count.toString() + "%";
					var styleElement = document.getElementById('pagesView');
					styleElement.style.width = width;
					// console.log(this.positionIndex);
					// this.scrollTo(this.positionIndex);
					// styleElement.style.height = height;
					}
				}
			}
		}
	}

</script>

<style type="text/css" scoped>
	#pagesView{
		position: absolute;
		padding: 0px;
		margin: 0px;
		/*width: calc(100%);*/
		height: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	#advantagelist{
		display: flex;
		/*justify-content:space-around;*/
		/*list-style: none;*/
		height: 100%;
		padding: 0;
		margin:0;
	}
	

	#advantage{
		padding: 0px;
		margin: 0px;
		width: 100%;
		height: 100%;
		display: block;
		/*float: left;*/
		left: 0px;
		top: 0px;
		bottom: 0;
		right: 0;
		/*flex: 1;*/
		list-style-type: none;
		/*line-height: 100%;*/
		/*list-style: none;*/
	}
	pagesViewitem{
		display: block;
		/*float: left;*/
	}
</style>