<template>
  <div id="xy-progressbar">
      <span>{{parseInt($store.state.loadingProgress)+"%"}}</span>
      <!-- <el-progress :percentage="$store.state.loadingProgress" color="#8e71c7"></el-progress> -->
      <div id="xy-progress">
        <div id="xy-progress-back">
          <div id="xy-progress-percent" :style=" 'width:'+ percentNum +'%'"></div>
        </div>
      </div>
      <span>资源加载中...</span>
  </div>
</template>

<script type="text/javascript">
  export default{
    name:"xy-progressbar",
    data(){
      return{

      }
    },
    props:{
      percentNum:Number,

    }
  }
</script>

<style type="text/css" scoped>
  el-progress{
    width: 100%;
  }
  #xy-progressbar{
    width: 100%;
    height: 60px;
    margin: 0px;
    padding: 0px;
    left: 0px;
    position: absolute;
    text-align:center
  }

  span{
    font-family: "楷体_GB2312";
    font-size: 12px;
    color: #4a4a4a;
  }

  #xy-progress{
    width: 100%;
    height: 20px;
    /*background-color: #eeeeee;*/
    position: relative;
    display: flex;
    text-align: center;
  }

  #xy-progress-back{
      height: 3px;
      width: 100%;
      /*position: absolute;*/
      background-color: #4a4a4a;
      margin: auto;
  }
  #xy-progress-percent{
    height: 100%;
    background-color:#c2996b;
  }
</style>
