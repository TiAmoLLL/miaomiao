<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name : 'Scroller',
    props:{
        handleToScroll:{
            type:Function,
            default:function(){}
        },
        handleToTouchEnd:{
            type:Function,
            default:function(){}
        }
    },
    mounted(){
        var scroll = new BScroll(this.$refs.wrapper ,{
            tap : true,
            probeType: 1
        });
        this.scroll = scroll;
        scroll.on('scroll',(pos)=>{
            this.handleToScroll(pos);
        });
        scroll.on('touchEnd',(pos)=>{
            // e.preventDefault();  //preventDefault()的方法，阻止事件的默认行为
            this.handleToTouchEnd(pos);
        });
    }
}
</script>

<style scoped>
.wrapper{height: 100%;  }
</style>
