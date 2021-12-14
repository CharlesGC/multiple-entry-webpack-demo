/*
 * @Descripttion: 
 * @version: 
 * @Author: Charles Guo
 * @Date: 2021-12-13 23:14:08
 * @LastEditors: Charles Guo
 * @LastEditTime: 2021-12-14 00:49:32
 */
import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    modules: {
        app
    }
})