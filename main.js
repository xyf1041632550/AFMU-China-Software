// 
import messages from './locale/index'

let i18nConfig = {
  locale: uni.getLocale(),
  messages
}

import Vue from 'vue'
import App from './App'


//baseRequest
import { Base } from './uitls/request/signrqe.js'
Vue.prototype.base=new Base();


//弹窗
import { Mint} from './uitls/tools/mint.js'
Vue.prototype.mint=Mint;

//tools
import TimeTool from './uitls/tools/timeTool.js';
import ArrayTool from './uitls/tools/arrayTool.js';
Vue.prototype.TimeTool = TimeTool;
Vue.prototype.ArrayTool = ArrayTool;

//vuex
import {Global} from './store/index.js'
Vue.prototype.$Global = Global;

import defaultBox from "@/m-com/default-box/default-box.vue"
Vue.component("defaultBox", defaultBox);

import lang from "@/m-com/lang.vue"
Vue.component("lang", lang);
	
//跳转
Vue.prototype.onNav=function(url){
	uni.navigateTo({url:url})
}


import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false
App.mpType = 'app'





const app = new Vue({
  i18n,
  ...App
})


app.$mount()
