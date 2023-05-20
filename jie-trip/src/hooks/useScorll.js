import {onMounted,onUnmounted,ref} from "vue"
import {throttle} from 'underscore'



//达到底部 
export function useScorll(reachBottomCallBack) {
    const clientHeight=ref(0) //页面高度
    const scrollTop=ref(0) //滚动高度
    const scrollHeight=ref(0)//总高度
    //防抖(debounce)/节流(throttle) 节流（underscore包）
    const scrollListenerHandler=throttle(()=>{
        clientHeight.value =document.documentElement.clientHeight
        scrollTop.value =document.documentElement.scrollTop
        scrollHeight.value =document.documentElement.scrollHeight
        if( clientHeight.value + scrollTop.value >= scrollHeight.value){
          if(reachBottomCallBack) {reachBottomCallBack()} 
          console.log("滚动到底部了");
        }
      },100)
      
      onMounted(()=>{
        window.addEventListener("scroll",scrollListenerHandler)
      })
      
      
      onUnmounted(()=>{
        window.removeEventListener("scroll",scrollListenerHandler)
      })
        return {
            clientHeight,
            scrollTop,
            scrollHeight
        }
    }

