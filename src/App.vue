<template>
  <div>
      <!-- <Navigation v-show="navAndTabbarShow"></Navigation> -->
         <router-view ></router-view>
    <!-- <XYTarbar v-show="navAndTabbarShow"></XYTarbar>
    <XYSplash v-if="$store.state.coverSplash"></XYSplash>
    <transition name="alerttransition">
      <XYAlertView v-if="stateAlert"></XYAlertView>
    </transition> -->
  </div>
</template>


<script>
  import store from '@/store/index.js';
  export default {
    name: 'App',
    data(){
      return{
        splash:true,
      }
    },
    computed:{
      navAndTabbarShow(){
        return store.state.navAndTabbarShow;
      },
      stateAlert(){
        return store.state.stateAlert;
      }
    },
    components:{

    },
    created(){
      var _self = this;
      // console.log("app刚初始化");
    },
  }
</script>


<style>
  body{
    margin:0px;
  }

  .alerttransition-enter-active, .alerttransition-leave-active {
  transition: opacity .5s;
  }
  .alerttransition-enter, .alerttransition-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }


  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .main{
      height: 400px;
      margin-left: 180px;
      margin-right: 25px;
  }

  .nav{
    position: fixed;
      width: 108px;
      left: 40px;
  }
  .nav ul{
  list-style: none;
   margin: 0;
      padding: 0;
  }
  .nav ul li{
    width: 108px;
    height: 48px;
    line-height: 48px;
  border:1px solid #dadada;
  text-align: center;
  }
  .nav ul li a{
    text-decoration: none;
  }

  XYSplash{
    /*float: left;
    position: absolute;
    display: flex;
    z-index: 999;
    margin-left: 0px;
    margin-top: 0px;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;*/
  }
</style>
