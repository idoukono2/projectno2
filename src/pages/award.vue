<template>
    <div class="abgview">
        <div>
            <img class="awardlogologoDiv" src="@/assets/images/logo.png"/>
        </div>
        <div>
            <img class="awardTitileDiv" src="https://resources.xycoder.com/kobelco/images/title_g3.png"/>
        </div>
        <img class="middleImage" src="https://resources.xycoder.com/kobelco/images/victory.png"/>
        <img class="awardBottomImage" src="https://resources.xycoder.com/kobelco/images/result.png"/>
        <shadowButton class="awardbtnClass" @click="alertShow">领 奖</shadowButton>

        <div style="font-family: 'fzlthtFont','Source Han Sans CN','SimHei';overflow: auto;margin-left: 10%;width: 80%;color: white;height: 40px;line-height: 20px;font-size: 13px;position: fixed;bottom: 15px;">
            <img style="float: left;width: 16px;height: 16px;margin-top: 2px;"
                 src="https://resources.xycoder.com/kobelco/images/remind.png">
            &nbsp;请凭借此页面到接待台领取奖品，兑奖按钮需要由工作人员当面操作，用户个人操作无效。
        </div>

    </div>
</template>

<script type="text/javascript">
    import wx from 'weixin-js-sdk';
    import Vue from "vue";
    import toolitem from '@/components/Tool-item';
    import store from '@/store/index.js';


    Vue.component("toolitem", toolitem);
wx.ready(function() {
                    wx.hideOptionMenu();
                })

	wx.hideMenuItems({
		menuList: ["menuItem:share:timeline", "menuItem:copyUrl", "menuItem:share:appMessage", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
	});
    (function(){
		window.alert = function(name){
		var iframe = document.createElement("IFRAME");
		iframe.style.display="none";
		iframe.setAttribute("src", 'data:text/plain');
		document.documentElement.appendChild(iframe);
		window.frames[0].window.alert(name);
		iframe.parentNode.removeChild(iframe);
		}
		})();
    export default {
        name: "toolBar",
        data() {
            return {}
        },
        mounted() {

            wx.ready(function() {
                    wx.hideOptionMenu();
                })
            document.body.addEventListener('touchmove', function(e){
                e.preventDefault();
                e.stopPropagation();
            }, { passive: false });
            console.log("到领奖页")
            store.state.isFirstlaunch = false
            console.log("是否首次")
            console.log(store.state.isFirstlaunch)
        },
        computed: {

        },

        methods: {
            itemClick(success) {
                // 去答题页
                let ths = this
                ths.$router.push({path: "/main"});
            },
            getaward() {
                let url = store.state.baseUrl + 'problem/getAward'
                console.log(url)
                let params = {'userId': localStorage.getItem('user_id'), 'isFirst': '0'};
                this.$http.post(url, params, {emulateJSON: true}).then((res) => {
                    console.log(res)
                    if (res.body.success == true) {
                        console.log("领奖成功")
                    } else {
                        alert(res.body.message)
                    }
                }, (err) => {
                    console.log("兑奖失败:" + err);
                });
            },
            alertShow() {
                alert('兑奖按钮需要由工作人员当面操作，用户个人操作无效,\n每位用户只能兑奖一次哦！')
                this.getaward()

            }
        }
    }

</script>

<style type="text/css" scoped>
    @font-face {
        font-family: fzlthtFont;
        src: url('../assets/style/FZLTHJW.ttf');
    }

    .abgview {
        width: 100%;
        height: 100%;
        background-color: #01b6af;
        position: absolute;
    }

    .awardlogologoDiv {
        margin-left: 8%;
        margin-top: 8%;
        width: 85px;
        height: 8%;
    }

    .awardTitileDiv {
        margin-left: 15%;
        margin-top: 8%;
        width: 70%;
        display: block;
    }

    .middleImage {
        padding-top: 15%;
        display: block;
        margin: auto;
        width: 100%;
    }

    .awardbtnClass {
        font-family: "fzlthtFont",'Source Han Sans CN','SimHei';
        position: fixed;
        margin-left: 20%;
        width: 60%;
        height: 7vh;
        line-height: 7vh;
        bottom: 72px;
        background-image: url("https://resources.xycoder.com/kobelco/images/button1.png");
        background-size: 100% 100%;
        text-align: center;
        border-radius: 10px;
        font-size: 15px;
        color: white;
        border: none;
        background-color: transparent;
        text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
        -webkit-text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
        -moz-text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
        *filter: Glow(color=#000, strength=1);
    }

    .awardBottomImage {
        position: fixed;
        bottom: 0px;
        width: 100%;
    }
</style>