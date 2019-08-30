<template>
    <!-- 此组件支持自定义按钮文字和自定义按钮图片 -->
    <button :style="{backgroundColor:btnBgc,color:btnColor,width:width,height:height,fontSize:fontSize,boxShadow:boxShadow}" @click="handleClick" class="rytBtn">
        <label class="btnText"><slot></slot></label>
    </button>
</template>

<script>
     export default {
           name:'shadowButton',
           props:{
               btnBgc:{
                   type:String,
//                    default:'pink'
               },
               btnColor:{
                   type:String,
                   default:'#fff'
               },
               width:{
                   type:String,
                   default:'200px'
               },
               height:{
                   type:String,
                   default:'44px'
               },
               fontSize:{
                   type:String,
                   default:'16px'
               },
               boxShadow:{
                   type:String,
                   default:'1px 1px 0px 1px #2c3e50'
               }
           },
          data(){
              return{

              }

          },
          methods:{
              handleClick(){

                  this.$emit('click')

              }
          }

     }
</script>
<style type="text/css" scoped>
.rytBtn{
   position: relative;
   /* border-radius:  22px; */
}

.rytBtn::after{
    background-color: #000;
    /* border-radius: 22px; */
    content: " ";
    opacity: 0;
    position:absolute;
    top:0px;
    bottom: 0px;
    left:0px;
    right:20px;
}
  .rytBtn:active::after{
    opacity: 0.5;
    }
/*  .rytBtn .btnText{
    font-size: 18px;
    } */
</style>