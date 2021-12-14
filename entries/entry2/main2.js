/*
 * @Descripttion: 
 * @version: 
 * @Author: Charles Guo
 * @Date: 2021-12-13 23:14:23
 * @LastEditors: Charles Guo
 * @LastEditTime: 2021-12-14 14:27:01
 */
import Vue from 'vue'
import store from './store'

import App from './App2.vue'

new Vue({
    store,
    render:(h) => h(App)
}).$mount('#app')